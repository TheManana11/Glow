import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAnalysisDto {
  @ApiProperty({ example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." })
  @IsString()
  @IsNotEmpty()
  image_url: string;
}
