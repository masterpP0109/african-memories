import { IsDateString, IsInt, IsOptional, IsUUID, Min, Matches, MaxLength, registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

function IsAfterProperty(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAfterProperty',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value instanceof Date && relatedValue instanceof Date
            ? value > relatedValue
            : false;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${args.property} must be after ${relatedPropertyName}`;
        },
      },
    });
  };
}

export class CreateAvailabilityDto {
  @IsUUID()
  activityId!: string;

  @IsDateString()
  startsAt!: string;

  @IsDateString()
  @IsAfterProperty('startsAt', { message: 'endsAt must be after startsAt' })
  endsAt!: string;

  @IsInt()
  @Min(1)
  capacity!: number;

  @IsInt()
  @Min(0)
  remaining!: number;

  @IsOptional()
  @IsUUID()
  accommodationId?: string;
}
