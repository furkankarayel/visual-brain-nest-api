import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
require("dotenv").config();

const PAT = process.env.PAT;

@Injectable()
export class DetectionService {
    constructor(private readonly userService: UserService) {}
    async detectFaces(url_input: string): Promise<any> {
        const USER_ID = 'clarifai';
        const APP_ID = 'main';
        const MODEL_ID = 'face-detection';
    
        const stub = ClarifaiStub.grpc();
    
        const metadata = new grpc.Metadata();
        metadata.set('authorization', 'Key ' + PAT);
    
        return new Promise((resolve, reject) => {
          stub.PostModelOutputs(
            {
              user_app_id: {
                user_id: USER_ID,
                app_id: APP_ID,
              },
              model_id: MODEL_ID,
              inputs: [
                {
                  data: {
                    image: {
                      url: url_input,
                      allow_duplicate_url: true,
                    },
                  },
                },
              ],
            },
            metadata,
            (err, response) => {
              if (err) {
                reject(new HttpException('Failed to fetch face detection API', HttpStatus.INTERNAL_SERVER_ERROR));
              } else if (response.status.code !== 10000) {
                reject(new HttpException(`Clarifai API error: ${response.status.description}`, HttpStatus.BAD_REQUEST));
              } else {
                //await this.userService.
                resolve(response);
              }
            },
          );
        });
      }

      async analyzeImage(url_input: string): Promise<any> {
        const USER_ID = 'salesforce';
        const APP_ID = 'blip';
        const MODEL_ID = "general-english-image-caption-blip";

        const stub = ClarifaiStub.grpc();
    
        const metadata = new grpc.Metadata();
        metadata.set('authorization', 'Key ' + PAT);
    
  
        return new Promise((resolve, reject) => {
          stub.PostModelOutputs(
            {
              user_app_id: {
                user_id: USER_ID,
                app_id: APP_ID,
              },
              model_id: MODEL_ID,
              inputs: [
                {
                  data: {
                    image: {
                      url: url_input,
                      allow_duplicate_url: true,
                    },
                  },
                },
              ],
            },
            metadata,
            (err, response) => {
              if (err) {
                reject(new HttpException('Failed to fetch face detection API', HttpStatus.INTERNAL_SERVER_ERROR));
              } else if (response.status.code !== 10000) {
                reject(new HttpException(`Clarifai API error: ${response.status.description}`, HttpStatus.BAD_REQUEST));
              } else {
                resolve(response);
              }
            },
          );
        });
      }
    

}
