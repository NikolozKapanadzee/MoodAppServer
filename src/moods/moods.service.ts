import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMoodDto } from './dto/create-mood.dto';
import { UpdateMoodDto } from './dto/update-mood.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Mood } from './schemas/mood.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/users.schema';

@Injectable()
export class MoodsService {
  constructor(
    @InjectModel('mood') private MoodModel: Model<Mood>,
    @InjectModel('user') private UserModel: Model<User>,
  ) {}

  async create(
    { dayNote, feelings, mood, moodLabel, sleep }: CreateMoodDto,
    req,
  ) {
    console.log(req.userId, 'reqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');

    const newMood = await this.MoodModel.create({
      dayNote,
      feelings,
      mood,
      moodLabel,
      sleep,
      author: req.userId,
    });
    console.log(req.userId, 'fslfnksf');
    console.log(newMood);
    const newmods = await this.UserModel.findByIdAndUpdate(
      req.userId,
      {
        $push: { moods: newMood._id},
      },
      { new: true },
    );

    console.log(newmods, 'Sfsffs');
    return { message: 'created succsesfully', data: newMood };
  }

  async findAll() {
    const moods = await this.MoodModel.find();
    return moods;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');

    const mood = await this.MoodModel.findById(id);
    if (!mood) throw new BadRequestException('mood not found');

    return mood;
  }

  async update(id: string, updateMoodDto: UpdateMoodDto) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');
    const mood = await this.MoodModel.findById(id);
    if (!mood) throw new BadRequestException('mood not found');
    await this.MoodModel.findByIdAndUpdate(id, updateMoodDto);
    return 'mood updated succsesfully';
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');
    const mood = await this.MoodModel.findById(id);
    if (!mood) throw new BadRequestException('mood not found');
    await this.MoodModel.findByIdAndDelete(id);
    return 'moood deleted succsesfukly';
  }
}
