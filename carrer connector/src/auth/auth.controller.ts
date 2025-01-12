import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { report } from 'process';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    async register(@Body() createUserDto:CreateUserDto){
        return  this.authService.register(createUserDto)
        
    }

@Post('login')
async login(@Body() body: { email: string; password: string }) {
  return this.authService.login(body.email, body.password);
}

}
