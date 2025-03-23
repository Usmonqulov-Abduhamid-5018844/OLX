import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateCommentDto {
    @ApiProperty({example: "Message"})
    @IsNotEmpty()
    message: string

    @ApiProperty({example: "productId"})
    @IsNotEmpty()
    productId: string
}
