import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Mood {
  @Prop({
    type: String,
    required: true,
  })
  mood: string;

  @Prop({
    type: String,
    required: true,
  })
  moodLabel: string;

  @Prop({
    type: Number,
    required: true,
  })
  sleep: number;

  @Prop({
    type: String,
    required: true,
  })
  dayNote: string;

  @Prop({ type: [String], required: true })
  feelings: string[];

  @Prop({
    type: String,
    ref: 'user',
    required: true,
  })
  author: string;
}

export const MoodSchema = SchemaFactory.createForClass(Mood);
