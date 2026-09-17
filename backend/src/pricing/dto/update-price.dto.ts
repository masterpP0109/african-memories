import { PartialType } from '@nestjs/mapped-types';
import { CreatePriceDto } from './create-price.dto.js';

export class UpdatePriceDto extends PartialType(CreatePriceDto) {}
