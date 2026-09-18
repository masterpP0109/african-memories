import { IsOptional, IsString, MaxLength } from "class-validator";

export class ListActivitiesDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;
}
