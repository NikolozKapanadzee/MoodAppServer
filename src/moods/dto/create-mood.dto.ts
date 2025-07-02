import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMoodDto {

  @IsNotEmpty()
  @IsString()
  mood: string;

  @IsNotEmpty()
  @IsString()
  moodLabel: string;

  @IsNotEmpty()
  @IsNumber()
  sleep: number;

  @IsNotEmpty()
  @IsString()
  dayNote: string;

  @IsNotEmpty()
  feelings: string[];

  @IsNotEmpty()
  @IsString()
  author:string
}
