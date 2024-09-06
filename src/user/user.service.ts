import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Login } from './entities/login.entity';

@Injectable()
export class UserService {
      constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Login)
        private loginRepository: Repository<Login>,
        private dataSource: DataSource,
      ) {}

      async handleRegister(email: string, name: string, password: string): Promise<User> {
        if (!email || !name || !password) {
          throw new Error('Invalid form submission. All fields are required.');
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const queryRunner = this.dataSource.createQueryRunner();
    
        await queryRunner.startTransaction();
    
        try {
          const login = new Login();
          login.email = email;
          login.hash = hashedPassword;
    
          const savedLogin = await queryRunner.manager.save(Login, login);

          const user = new User();
          user.email = savedLogin.email;
          user.name = name;
          user.join_date = new Date();
    
          const newUser = await queryRunner.manager.save(User, user);
    
          await queryRunner.commitTransaction();
    
          return newUser;
        } catch (error) {
          await queryRunner.rollbackTransaction();
          console.error('Error during user registration:', error.message, error.stack);
    
          throw new Error('An error occurred while registering the user. Please try again later.');
        } finally {
          await queryRunner.release();
        }
      }

      async handleLogin(email: string, password: string): Promise<User | string> {
        if (!email || !password) {
          throw new Error('Incorrect form submission. All fields are required.');
        }
    
        try {
          const loginDetails = await this.loginRepository.findOne({ where: { email } });
    
          if (!loginDetails) {
            throw new Error('Wrong credentials'); // Email not found
          }
    
          const isPasswordValid = await bcrypt.compare(password, loginDetails.hash);
    
          if (!isPasswordValid) {
            throw new Error('Wrong credentials'); // Incorrect password
          }
    
          const user = await this.usersRepository.findOne({ where: { email } });
    
          if (!user) {
            throw new Error('Not able to get user');
          }
    
          return user;
        } catch (error) {
          console.error('Error during login:', error.message);
          throw new Error(error.message); // You can customize this to return more user-friendly messages
        }
      }

      async handleProfileGet(id: number): Promise<User | string> {
        try {
          const user = await this.usersRepository.findOne({
            where: { id },
            select: ['name', 'email', 'entries', 'join_date'],
          });
    
          if (!user) {
            throw new Error('User not found');
          }
    
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      }

      async handleImage(id: number): Promise<number> {
        try {
          const user = await this.usersRepository.findOne({ where: { id } });
          
          if (!user) {
            throw new Error('User not found');
          }
    
          user.entries += 1;
    
          const updatedUser = await this.usersRepository.save(user);
    
          return updatedUser.entries;
        } catch (error) {
          throw new Error('Failed to update entries');
        }
      }
    
    }
    
  
