import { BaseRepositoryInterface } from 'src/repositories/base/base.interface.repository';
import { User } from '../entities/user.entity';

export type UserRepositoryInterface = BaseRepositoryInterface<User>;
