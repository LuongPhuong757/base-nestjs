import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsStrongPassword,
	MaxLength,
	ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class CreateUserDto {
	@IsNotEmpty({ message: 'error' }) // Bắt buộc phải gửi lên
	@MaxLength(50) // Tối đa 50 ký tự
	first_name: string;

	@IsNotEmpty()
	@MaxLength(50)
	last_name: string;

	@IsOptional()
	@MaxLength(50)
	username: string;

	@IsOptional()
	@MaxLength(50)
	password: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => CreateAddressDto)
	address?: CreateAddressDto;
}
