import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SettingsDocument } from './schemas/settings.schema';

@Injectable()
export class SettingsService {
  constructor(@InjectModel('Settings') private settingsModel: Model<SettingsDocument>) {}

  async getSettings() {
    const settings = await this.settingsModel.find().exec();
    if (!settings.length || !settings) return this.settingsModel.create({ id: '0' });
    return settings[0];
  }
}
