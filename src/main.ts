import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import { Request, Response } from 'express';
import { LoggingInterceptor } from './common/interceptor/request-log.interceptor';
import { HttpExceptionFilter } from './common/filter/http-exeception.filter';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './config/configuration.config';

async function bootstrap() {
	// const logger = new Logger(bootstrap.name);
	const app = await NestFactory.create(AppModule);
	const config_service = app.get(ConfigService);
	app.useGlobalInterceptors(new LoggingInterceptor());
	app.useGlobalFilters(new HttpExceptionFilter());
	app.use(helmet());
	// app.use((req: Request, res: Response, next) => {
	// 	logger.debug('===TRIGGER GLOBAL MIDDLEWARE===');
	// 	next();
	// });
	// const database_env = config_service.get<DatabaseConfig>('database');
	// logger.debug(database_env);
	await app.listen(3001);
}
bootstrap();
