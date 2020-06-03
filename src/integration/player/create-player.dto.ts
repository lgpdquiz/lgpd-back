import {IsString, IsInt, IsOptional} from "class-validator";

export default class CreatePlayerDto {
  readonly nome: string;
  readonly idade: number;
}