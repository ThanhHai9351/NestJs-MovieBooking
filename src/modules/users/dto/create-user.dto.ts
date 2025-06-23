import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'English name must be a string' })
  english_name?: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

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
