import { Delete } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTodoDto {
    @ApiProperty({
        description: "Todo Tittle Header",
        example: "This is test Tittle todo"
    })
    @IsString()
    @IsNotEmpty()
    tittle: string

    @ApiProperty({
        description: "This is description text field to write daily todo tittle",
        example: "This is description text filed to write daily today details on this tittle"
    })
    @IsString()
    @IsNotEmpty()
    description: String

   
}