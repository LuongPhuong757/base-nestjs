import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VersionMiddleware } from './common/middleware/version.middleware';
// import { ThrottlerModule } from '@nestjs/throttler'
import { ThrottlerModule } from '@nestjs/throttler';
import { CustomThrottlerGuard } from './common/guard/throttler.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database_config } from './config/configuration.config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './module/users/users.module';

@Module({
	imports: [
		UsersModule,
		ThrottlerModule.forRoot([
			{
				ttl: 10000,
				limit: 3,
			},
		]),
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			load: [database_config], // <== Ở đây
			cache: true, // <== Ở đây
			expandVariables: true, // <== Ở đây
			validationSchema: Joi.object({
				NODE_ENV: Joi.string()
					.valid('development', 'production', 'test', 'provision', 'staging')
					.default('development'),
				PORT: Joi.number().default(3000),
			}),
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: 'mongodb://root:example@localhost:27018/',
				dbName: 'flash_card',
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: 'APP_GUARD',
			useClass: CustomThrottlerGuard,
		},
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(VersionMiddleware).forRoutes('*');
	}
}
