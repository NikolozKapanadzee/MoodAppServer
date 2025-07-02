import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MoodsService } from './moods.service';
import { CreateMoodDto } from './dto/create-mood.dto';
import { UpdateMoodDto } from './dto/update-mood.dto';
import { IsAuthGuard } from 'src/auth/guards/isAuth.guard';

@Controller('moods')
@UseGuards(IsAuthGuard)
export class MoodsController {
  constructor(private readonly moodsService: MoodsService) {}

  @Post()
  create(@Body() createMoodDto: CreateMoodDto, @Req() req) {
    return this.moodsService.create(createMoodDto, req);
  }

  @Get()
  findAll() {
    return this.moodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moodsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoodDto: UpdateMoodDto) {
    return this.moodsService.update(id, updateMoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moodsService.remove(id);
  }
}
