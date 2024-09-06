import { TypeOrmModuleOptions } from "@nestjs/typeorm";
require("dotenv").config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres', 
    host: process.env.DB_HOST ,
    port: parseInt(process.env.DB_PORT, 10) ,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    logging: true,
    synchronize: true,
  }