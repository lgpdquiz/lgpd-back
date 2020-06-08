import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GlobalUsersService } from './globalUsers.service';
import { GlobalUsersController } from './globalUsers.controller';
import GlobalUsersEntity from '../../db/models/globalUsers.entity';

@Module({
  
    imports: [TypeOrmModule.forFeature([GlobalUsersEntity])],
    providers: [GlobalUsersService],
    controllers: [GlobalUsersController]
  })
  export class GlobalUsersModule {}
