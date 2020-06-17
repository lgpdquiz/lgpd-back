import {Controller, Get, Post,Put, Delete, Body, Param} from '@nestjs/common';
import PlayerEntity from '../../db/models/players.entity';
import CreatePlayerDto from './create-player.dto';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
    constructor(private playerService : PlayersService){}

    @Get()
    getAll(): Promise<PlayerEntity[]>{
        return this.playerService.findAll();
    }

    @Get(':id')
    getById(@Param('id') id): Promise<PlayerEntity>{
        return this.playerService.findById(id);
    }

    @Post('create')
    async create(@Body() newPlayer: PlayerEntity){
      return this.playerService.create(newPlayer);
    }


    @Put(':id/update')
    async update(@Param('id') id, @Body() player: PlayerEntity): Promise<any> {
        player.id = Number(id);
        console.log('Update #' + player.id);
        return this.playerService.update(player);
    }

    @Delete(':id/delete')
    async deleteById(@Param('id') id): Promise<any>{
        return this.playerService.delete(id);
    }
}
