import { Controller, Body , Post, UseGuards } from '@nestjs/common';
import { DetectionService } from './detection.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('detection')
export class DetectionController {
    constructor(private detectionService: DetectionService) {}

    @UseGuards(AuthGuard)
    @Post('face')
    async detectFaces(@Body('input') url:string) {
        return this.detectionService.detectFaces(url)
    }

    @UseGuards(AuthGuard)
    @Post('description')
    async analyzeImage(@Body('input') url:string) {
        return this.detectionService.analyzeImage(url)
    }
}
