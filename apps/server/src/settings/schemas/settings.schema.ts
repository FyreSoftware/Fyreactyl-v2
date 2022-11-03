import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  EggSettings, NodeSettings, PackageSettings,
} from '../interfaces/settings.interface';

export type SettingsDocument = Settings & Document;

@Schema()
export class Settings {
  @Prop({ type: String })
  public id: string;

  @Prop({ type: String, default: 'Fyreactyl' })
  public name: string;

  @Prop({ type: Array, default: [] })
  public eggs: EggSettings[];

  @Prop({
    type: Array,
    default: [{
      id: 0, name: 'Default', memory: 1024, disk: 1024, cpu: 50, servers: 1, buyable: false, price: 0,
    }],
  })
  public packages: PackageSettings[];

  @Prop({ type: Array, default: [] })
  public nodes: NodeSettings[];
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
