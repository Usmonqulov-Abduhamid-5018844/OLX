import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { sentOtp, UpdateAuthDto, verify } from './dto/update-auth.dto';
import { PrismaService } from 'src/prizma/prizma.service';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { totp } from 'otplib';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
totp.options = {step: 60}
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mail: MailService,
    private jwt: JwtService,
  ) {}

  async register(data: CreateAuthDto) {
    try {
      let { email, password } = data;
      let user = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (user) {
        throw new ConflictException('Olredy exiets');
      }
      let hash = bcrypt.hashSync(password, 10);
      data.password = hash;
      let otp = totp.generate(`Secret${data.phone}`);

      await this.prisma.user.create({ data });
      await this.mail.sendMail(
        email,
        `Verify Activirvt Accaunt`,
        `Otp: ${otp}`,
      );
      return { Message: 'Activirvt email sent otp' };
    } catch (error) {
      throw new NotAcceptableException(error);
    }
  }

  async login(data: UpdateAuthDto) {
    try {
      let { email, password, api } = data;
      let user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new NotFoundException('Malunot topilmadi');
      }
      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnprocessableEntityException("Password Noto'g'ri");
      }
      if (!user.IsActive) {
        throw new UnauthorizedException('is not email verifiy');
      }
      let sesion = await this.prisma.session.findFirst({
        where: { userId: user.id, api },
      });
      if (!sesion) {
        await this.prisma.session.create({
          data: { userId: user.id, api: api },
        });
      }
      let accsesToken = await this.AccsesToket({ id: user.id, role: user.role });
      let refreshToken = await this.RefreshToken({ id: user.id, role: user.role });
      return { accsesToken, refreshToken };
    } catch (error) {
      throw new NotAcceptableException(error);
    }
  }

  async verify(data: verify) {
    let { email, otp } = data;
    try {
      let user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new NotFoundException('Not fount');
      }
      if (!totp.check(otp,`Secret${user.phone}`)) {
        throw new BadGatewayException('wrong otp');
      }
      await this.prisma.user.update({
        where: { email: email },
        data: { IsActive: true },
      });
      return { Message: 'your accaunt activ✅ 🎉' };
    } catch (error) {
      throw new NotAcceptableException(error);
    }
  }
  async sendOtp(data: sentOtp) {
    try {
      let user = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (!user) {
        throw new NotFoundException('Not fount');
      }
      return { otp: totp.generate(`Secret${user.phone}`) };
    } catch (error) {
      throw new NotAcceptableException(error);
    }
  }
  async refreshTokent(req: Request) {
    let id = req['user'].id;
    let user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Not fount');
    }
    return { accsesToken: this.AccsesToket({ id: user.id, role: user.role }) };
  }

  async AccsesToket(pelod: { id: string; role: string }) {
    let key = process.env.accseskey;

    return this.jwt.sign(pelod, { secret: key, expiresIn: '3h' })
  }
  async RefreshToken(pelod: { id: string; role: string }) {
    let key = process.env.refreshkey;

    return this.jwt.sign(pelod, { secret: key, expiresIn: '5d' })
  }
}
