import { SetMetadata } from "@nestjs/common"
import { Role } from "src/auth/dto/create-auth.dto"


export const Roles = (...role: Role[]) => SetMetadata("role", role)