import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Post('register')
    async register(@Body() body: { email: string; name: string; password: string }) {
        const { email, name, password } = body;
       return this.userService.handleRegister(email, name, password);
    }

    @Post('login')
    async login(@Body() body: { email: string;password: string }) {
        const { email, password } = body;
        return this.userService.handleLogin(email, password);
    }
    @Get('profile/:id')
    async getProfile(@Param('id') id: string) {
        return this.userService.handleProfileGet(parseInt(id, 10));
    }

    @Put('image-usage')
    async incrementImageUsage(@Body('id') id: number) {
        return this.userService.handleImage(id);
    }
}
