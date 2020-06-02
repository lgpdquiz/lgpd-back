import { IsString, IsInt, IsNumber } from 'class-validator';

export default class CreateGlobalUsersDto{
    @IsNumber()
    readonly playersSumTotalAges: number;

    @IsNumber()
    readonly playersSumTotalScore: number;

    @IsNumber()
    readonly numberOfAuthoPlayers: number;
}