
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
    @ApiProperty({
        description: "Todo Title Header",
        example: "This is test Title todo"
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        description: "This is description text field to write daily todo title",
        example: "This is description text filed to write daily today details on this title"
    })
    @IsString()
    @IsNotEmpty()
    description: String

   
}