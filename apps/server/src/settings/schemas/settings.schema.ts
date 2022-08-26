import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EggSettings } from '../interfaces/settings.interface';

export type SettingsDocument = Settings & Document;

@Schema()
export class Settings {
  @Prop({ type: String })
  public id: string;

  @Prop({ type: Array })
  public eggs: EggSettings[];
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
