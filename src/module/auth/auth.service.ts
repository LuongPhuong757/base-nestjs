import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/sign-up.dto';
// import { UsersService } from '@modules/users/users.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	private SALT_ROUND = 11;
	constructor(private readonly users_service: UsersService) {}

	async signUp(sign_up_dto: SignUpDto) {
		try {
			const existed_user = await this.users_service.findOneByCondition({
				email: sign_up_dto.email,
			});
			if (existed_user) {
				throw new ConflictException('Email already existed!!');
			}
			const hashed_password = await bcrypt.hash(
				sign_up_dto.password,
				this.SALT_ROUND,
			);
			const user = await this.users_service.create({
				...sign_up_dto,
				username: `${sign_up_dto.email.split('@')[0]}${Math.floor(
					10 + Math.random() * (999 - 10),
				)}`, // Random username
				password: hashed_password,
			});
			return user;
		} catch (error) {
			throw error;
		}
	}
}
