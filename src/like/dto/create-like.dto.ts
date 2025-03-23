import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateLikeDto {

    @ApiProperty({example: "productId"})
    @IsNotEmpty()
    productId: string

}
