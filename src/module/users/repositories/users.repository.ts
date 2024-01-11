import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from 'src/repositories/base/base.abstract.repository';
import { UserRepositoryInterface } from '../interfaces/user.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository
	extends BaseRepositoryAbstract<User>
	implements UserRepositoryInterface
{
	constructor(
		@InjectModel(User.name)
		private readonly users_repository: Model<User>,
	) {
		super(users_repository);
	}
}
