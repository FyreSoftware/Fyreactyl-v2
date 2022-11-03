import {
  Body,
  Controller, Delete, Get, Param, Post, Query, Req, Res, Patch,
} from '@nestjs/common';
import { PterodactylService } from '../pterodactyl/pterodactyl.service';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private pteroService: PterodactylService, private settingsService: SettingsService) {}

  @Get('/eggs/:id/environment')
  eggEnvironment(@Query() query, @Param() param) {
    return this.pteroService.getEggEnvironment(param.id, query.nest);
  }

  @Get('/')
  getSettings() {
    return this.settingsService.getSettings();
  }

  @Post('/name')
  async updateCompanyName(@Req() req, @Res() res) {
    const settings = await this.settingsService.getSettings();
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: true, message: 'Invalid json body' });
    }
    settings.name = name;
    await settings.markModified('name');
    settings.save();
    return res.status(200).json({ error: false, message: 'Changed name successfully.' });
  }

  @Post('/eggs')
  async newEggs(@Req() req, @Res() res) {
    const settings = await this.settingsService.getSettings();
    const { id, nest, name } = req.body;
    if (!id || !nest || !name) {
      return res.status(400).json({ error: true, message: 'Invalid json body' });
    }
    if (settings.eggs.filter((eg) => eg.id === id).length > 0) {
      return res.status(400).json({ error: true, message: 'Egg already exists in the database' });
    }
    settings.eggs.length ? settings.eggs.push({
      id,
      nestId: nest,
      name,
    }) : settings.eggs = [{ id, nestId: nest, name }];
    await settings.markModified('eggs');
    await settings.save();
    return res.status(200).json({ error: false, message: 'Added egg successfully.' });
  }

  @Delete('/eggs')
  async deleteEgg(@Req() req, @Res() res) {
    const settings = await this.settingsService.getSettings();
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: true, message: 'Invalid json body' });
    }
    if (settings.eggs.filter((eg) => eg.id.toString() === id.toString()).length < 0) {
      return res.status(400).json({ error: true, message: 'Egg doesn\'t exist in the database' });
    }
    settings.eggs = settings.eggs.filter((eg) => eg.id.toString() === id.toString());
    await settings.markModified('eggs');
    await settings.save();
    return res.status(200).json({ error: false, message: 'Removed egg successfully.' });
  }

  @Post('/nodes')
  async addNode(@Req() req, @Res() res) {
    const settings = await this.settingsService.getSettings();
    const { id, name } = req.body;
    if (!id || !name) {
      return res.status(400).json({ error: true, message: 'Invalid json body' });
    }
    if (settings.nodes && settings.nodes.filter((n) => n.id === id).length > 0) {
      return res.status(400).json({ error: true, message: 'Node already exists in the database' });
    }
    settings.nodes && settings.nodes.length ? settings.nodes.push({
      id,
      name,
    }) : settings.nodes = [{ id, name }];
    await settings.markModified('nodes');
    await settings.save();
    return res.status(200).json({ error: false, message: 'Added node successfully.' });
  }

  @Post('/packages')
  async addPackage(@Req() req, @Res() res) {
    const settings = await this.settingsService.getSettings();
    const {
      name, memory, cpu, disk, servers, price, buyable,
    } = req.body;
    if (!memory || !cpu || !disk || !servers || !price || buyable === undefined || !name) {
      return res.status(400).json({ error: true, message: 'Invalid json body' });
    }
    settings.packages && settings.packages.length ? settings.packages.push({
      id: settings.packages[settings.packages.length - 1].id + 1,
      name,
      memory,
      cpu,
      disk,
      servers,
      price,
      buyable,
    }) : settings.packages = [{
      id: 1,
      name,
      memory,
      cpu,
      disk,
      servers,
      price,
      buyable,
    }];
    await settings.markModified('packages');
    await settings.save();
    return res.status(200).json({ error: false, message: 'Added package successfully.', data: settings.packages });
  }

  @Patch('/packages')
  async editPackage(@Req() req, @Res() res) {
    const settings = await this.settingsService.getSettings();
    const { id } = req.query;
    const {
      name, memory, cpu, disk, servers, price, buyable,
    } = req.body;
    if (!memory && !cpu && !disk && !servers && !price && !buyable && !name) {
      return res.status(400).json({ error: true, message: 'Invalid json body' });
    }
    if (settings.packages.filter((p) => p.id.toString() === id.toString()).length < 0) {
      return res.status(400).json({ error: true, message: 'Package doesn\'t exist in the database' });
    }
    const newPackage = settings.packages.find((p) => p.id.toString() === id.toString());
    const oldPackages = settings.packages.filter((p) => p.id.toString() === id.toString());
    oldPackages.push({ ...newPackage, ...req.body });
    settings.packages = oldPackages;
    await settings.markModified('packages');
    await settings.save();
    return res.status(200).json({ error: false, message: 'Updated package successfully.' });
  }

  @Delete('/packages')
  async deletePackage(@Req() req, @Res() res) {
    const settings = await this.settingsService.getSettings();
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: true, message: 'Invalid json body' });
    }
    console.log(id);
    if (settings.packages.filter((p) => p.id.toString() === id.toString()).length < 0) {
      return res.status(400).json({ error: true, message: 'Package doesn\'t exist in the database' });
    }
    settings.packages = settings.packages.length === 1 ? [] : settings.packages.filter((p) => p.id === parseInt(id));
    await settings.markModified('packages');
    await settings.save();
    return res.status(200).json({ error: false, message: 'Removed package successfully.' });
  }

  @Delete('/nodes')
  async deleteNode(@Req() req, @Res() res) {
    const settings = await this.settingsService.getSettings();
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: true, message: 'Invalid json body' });
    }
    if (settings.nodes.filter((eg) => eg.id === id).length < 0) {
      return res.status(400).json({ error: true, message: 'Node doesn\'t exist in the database' });
    }
    settings.nodes = settings.nodes.filter((n) => n.id === id);
    await settings.markModified('nodes');
    await settings.save();
    return res.status(200).json({ error: false, message: 'Removed node successfully.' });
  }
}
