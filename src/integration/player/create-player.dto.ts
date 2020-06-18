import {IsString, IsInt, IsOptional} from "class-validator";

export default class CreatePlayerDto {
  readonly name: string;
  readonly score: number;
}