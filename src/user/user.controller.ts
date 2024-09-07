import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Post('register')
    async register(@Body() body: { email: string; name: string; password: string }) {
        const { email, name, password } = body;
       return this.userService.handleRegister(email, name, password);
    }

    @UseGuards(AuthGuard)
    @Get('profile/:id')
    async getProfile(@Param('id') id: string) {
        return this.userService.handleProfileGet(parseInt(id, 10));
    }

    @UseGuards(AuthGuard)
    @Put('image-usage')
    async incrementImageUsage(@Body('id') id: number) {
        return this.userService.handleImage(id);
    }
}
