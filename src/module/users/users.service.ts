import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { User, UserSchema } from './entities/user.entity';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserRolesService } from '../user-roles/user-roles.service';
import { UserRepositoryInterface } from './interfaces/user.interface';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
	constructor(
		@Inject('UsersRepositoryInterface')
		private readonly users_repository: UsersRepository,
	) {}
	async create(createUserDto: CreateUserDto) {
		console.log(createUserDto);
		// const instance = new Model<User>
		const user = await this.users_repository.create(createUserDto);
		console.log(user);
		return user;
	}

	findAll() {
		// return this.yourModel.find()
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
