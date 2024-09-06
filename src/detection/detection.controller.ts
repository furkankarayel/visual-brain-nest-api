import { Controller, Body , Post } from '@nestjs/common';
import { DetectionService } from './detection.service';

@Controller('detection')
export class DetectionController {
    constructor(private detectionService: DetectionService) {}

    @Post('face')
    async detectFaces(@Body('input') url:string) {
        return this.detectionService.detectFaces(url)
    }

    @Post('description')
    async analyzeImage(@Body('input') url:string) {
        return this.detectionService.analyzeImage(url)
    }
}
