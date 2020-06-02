import { Controller, Get, Post,Put, Delete, Body, Param} from '@nestjs/common';
import GlobalUsersEntity from '../../db/models/globalUsers.entity';
import { GlobalUsersService } from './globalUsers.service';
import CreateGlobalUsersDto from './create-globalUsers.dto';

@Controller('globalUsers')
export class GlobalUsersController {

    constructor(private readonly globalUsersService : GlobalUsersService){}

    @Get()
    getAll(): Promise<GlobalUsersEntity[]>{
        return this.globalUsersService.findAll();
    }

    @Get(':id')
    getById(@Param('id') id): Promise<GlobalUsersEntity>{
        return this.globalUsersService.findById(id);
    }

    @Post('create')
    async create(@Body() newGlobalUser: CreateGlobalUsersDto){
      return this.globalUsersService.create(newGlobalUser);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() globalUsers: GlobalUsersEntity): Promise<any> {
        globalUsers.id = Number(id);
        console.log('Update #' + globalUsers.id);
        return this.globalUsersService.update(globalUsers);
    }

    @Delete(':id/delete')
    async deleteById(@Param('id') id): Promise<any>{
        return this.globalUsersService.delete(id);
    }
}