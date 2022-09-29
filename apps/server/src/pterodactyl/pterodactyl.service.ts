import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '../config/config.service';

export interface PterodactylUserCreatePayload {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password?: string;
  admin?: boolean
}
function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  return specialChars.test(str);
}
export interface RequestOptions {
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE';
  data?: any;
  path: string;
}

@Injectable()
export class PterodactylService {
  constructor(private Config: ConfigService) {
  }

  // eslint-disable-next-line consistent-return
  private async request(options: RequestOptions): Promise<any> {
    const config = this.Config.getConfig();
    try {
      const data = await axios({
        method: options.method,
        baseURL: config.PTERODACTYL.DOMAIN,
        data: JSON.stringify(options.data),
        url: options.path,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.PTERODACTYL.KEY}`,
        },
      });
      return data.data;
    } catch (e) {
      console.log(e.response.data.errors);
      return {
        error: true,
        data: e.response.data.errors[0].detail,
        message: 'Something went wrong! Contact a system admin!',
      };
    }
  }

  // eslint-disable-next-line consistent-return
  async createUser(options: PterodactylUserCreatePayload) {
    const config = this.Config.getConfig();
    const specialChars = containsSpecialChars(options.username);

    const generatedUsername = Math.random().toString(36).substring(2, 15)
        + Math.random().toString(36).substring(2, 15);

    const generatedPassword = Math.random().toString(36).substring(2, 15)
        + Math.random().toString(36).substring(2, 15);

    try {
      const data = await this.request({
        method: 'POST',
        data: {
          email: options.email,
          username: specialChars ? generatedUsername : options.username,
          first_name: options.first_name,
          last_name: options.last_name,
          password: options.password ? options.password : generatedPassword,
          root_admin: options.admin ? options.admin : false,
        },
        path: '/api/application/users',
      });
      if (data?.error) return data;
      return data.attributes;
    } catch (e: any) {
      console.log(e);
    }
  }

  async getUsers() {
    const config = this.Config.getConfig();
    try {
      const data = await axios.get(`${config.PTERODACTYL.DOMAIN}/api/application/users`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.PTERODACTYL.KEY}`,
        },
      });
      return data.data;
    } catch (err: any) {
      return {
        error: true,
        message: err.message,
      };
    }
  }

  async getAllEggs() {
    const nests = await this.getAllNests();
    return nests.data.map((d) => d.attributes.relationships.eggs.data.map((e) => e.attributes));
  }

  async getEggEnvironment(id: string, nestId: string) {
    const egg = await this.request({
      method: 'GET',
      path: `/api/application/nests/${nestId}/eggs/${id}?include=variables`,
    });
    return egg.attributes.relationships.variables.data;
  }

  async getAllNests() {
    return this.request({
      method: 'GET',
      path: '/api/application/nests?include=eggs',
    });
  }

  async getAllNodes() {
    return this.request({
      method: 'GET',
      path: '/api/application/nodes',
    });
  }
}
