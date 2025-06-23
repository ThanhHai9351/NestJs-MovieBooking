import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDateString, IsBoolean, IsNumber, MinLength } from 'class-validator';
import { IsEmail, IsString } from 'class-validator';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'English name must be a string' })
  english_name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;

  @IsOptional()
  @IsString({ message: 'Avatar URL must be a string' })
  avatar_url?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Point must be a number' })
  point?: number;

  @IsOptional()
  @IsBoolean({ message: 'Is active must be a boolean' })
  is_active?: boolean;

  @IsOptional()
  @IsString({ message: 'Active code must be a string' })
  active_code?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Expired code must be a date string' })
  expired_code?: Date;

  @IsOptional()
  @IsDateString({}, { message: 'Latest login must be a date string' })
  latest_login?: Date;
}
