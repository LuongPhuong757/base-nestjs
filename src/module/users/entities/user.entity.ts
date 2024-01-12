import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import mongoose, { HydratedDocument, Model } from 'mongoose';
import { FlashCardDocument } from 'src/module/flash-cards/entities/flash-card.entity';
import { BaseEntity } from 'src/module/shared/base/base.entity';
import { Address, AddressSchema } from './address.entity';
import { Exclude, Expose } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

export enum GENDER {
	Male = 'MALE',
	Female = 'FEMALE',
	Other = 'OTHER',
}
@Schema({
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
	toJSON: {
		getters: true,
	},
})
@Exclude()
export class User extends BaseEntity {
	@Prop({
		required: true,
		minlength: 2,
		maxlength: 60,
		get: (first_name: string) => {
			if (!first_name) {
				return;
			}
			const last_three_digits = first_name.slice(first_name.length - 4);
			return `****-***-${last_three_digits}`;
		},
	})
	first_name: string;

	@Prop({
		required: true,
		set: (last_name: string) => {
			return last_name.trim();
		},
	})
	@Expose()
	last_name: string;

	// @Prop({
	//     required: true,
	//     unique: true,
	//     match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
	// })
	// email: string;

	// @Prop({
	//     match: /^([+]\d{2})?\d{10}$/,
	// })
	// phone_number: string;

	// @Prop({
	//     required: true,
	//     unique: true,
	// })
	// username: string;

	// @Prop({
	//     required: true,
	//     select: false,
	// })
	// password: string;

	// @Prop({
	//     default:
	//         'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
	// })
	// avatar: string;

	// @Prop()
	// date_of_birth: Date;

	// @Prop({
	//     enum: GENDER,
	// })
	// gender: string;

	// @Prop({ default: 0 })
	// point: number;

	// // @Prop({
	// // 	type: mongoose.Schema.Types.ObjectId,
	// // 	ref: UserRole.name,
	// // })
	// // role: UserRole;

	// @Prop()
	// headline: string;

	// @Prop()
	// friendly_id: number;
	@Prop({
		type: AddressSchema,
	})
	address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
// UserSchema.pre('insertMany', (next: NextFunction) => {
//     console.log('insert data');
//     return next();
// })
export const UserSchemaFactory = (
	flash_card_model: Model<FlashCardDocument>,
) => {
	const user_schema = UserSchema;
	// user_schema.pre('findOneAndDelete', async function (next: NextFunction) {
	//     const user = await this.model.findOne(this.getFilter())
	//     await Promise.all([
	//         flash_card_model.deleteMany({
	//             user: user._id,
	//         })
	//             .exec()
	//     ])
	//     return next();
	// })

	user_schema.pre('insertMany', (next: NextFunction) => {
		console.log('insert data');
		return next();
	});

	user_schema.virtual('default_address').get(function (this: UserDocument) {
		//
		console.log(this, '======================');
		return this.first_name + 'this.last_name';
	});

	return user_schema;
};

export const UsersModel = mongoose.model<UserDocument>('UserModel', UserSchema);
