import { Body, Controller, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';

import { AuthIdentifier, ResourceId, Token, UserCredentials, UserRegistration } from '@dreams/shared/models';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(
        private readonly authService: AuthService,
        ) {}

    @Post('register')
    async register(@Body() credentials: UserRegistration): Promise<ResourceId> {
        try {
            await this.authService.registerUser(credentials.username, credentials.password);
            return {
                id: await String(this.authService.createUser(credentials.username, credentials.account)),
            };
        } catch (e) {
            this.logger.error(e);
            throw new HttpException('Username invalid', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('login')
    async login(@Body() credentials: UserCredentials): Promise<AuthIdentifier> {
        try {
            const identifier = await this.authService.generateToken(credentials.username, credentials.password);
            return identifier;
        } catch (e) {
            this.logger.error(e);
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }
}
