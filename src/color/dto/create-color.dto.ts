import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateColorDto {
    @ApiProperty({example: "black"})
    @IsNotEmpty()
    name: string
}
