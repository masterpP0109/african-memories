import {
  IsString,
  IsOptional,
  IsEnum,
  IsUrl,
  Matches,
  MaxLength,
} from "class-validator";

export enum ActivityStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export class CreateActivityDto {
  @IsString()
  @MaxLength(200)
  name!: string;

  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message: "slug must be lowercase alphanumeric with hyphens",
  })
  slug!: string;

  @IsString()
  @MaxLength(100)
  category!: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  @MaxLength(2048)
  image?: string;

  @IsEnum(ActivityStatus)
  @IsOptional()
  status?: ActivityStatus;
}
