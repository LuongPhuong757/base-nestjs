import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
// import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly auth_service: AuthService) {}

	@Post('sign-up')
	async signUp(@Body() sign_up_dto: SignUpDto) {
		return await this.auth_service.signUp(sign_up_dto);
	}
}
