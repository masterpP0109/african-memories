import {
  IsString,
  IsOptional,
  IsEnum,
  Matches,
  MaxLength,
} from 'class-validator';

export enum ActivityStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export class CreateActivityDto {
  @IsString()
  @MaxLength(200)
  name!: string;

  @IsString()
  @Matches(/^[a-z0-9-]+$/, { message: 'slug must be lowercase alphanumeric with hyphens' })
  slug!: string;

  @IsString()
  @MaxLength(100)
  category!: string;

  @IsEnum(ActivityStatus)
  @IsOptional()
  status?: ActivityStatus = ActivityStatus.DRAFT;
}
