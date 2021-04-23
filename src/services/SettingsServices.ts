import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsServices {
  chat: boolean;
  username: string;
}

class SettingsServices {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, username }: ISettingsServices) {
    const userExists = await this.settingsRepository.findOne({
      username,
    });

    if (userExists) {
      throw new Error("User already exists");
    }
    const settings = this.settingsRepository.create({
      chat,
      username,
    });

    await this.settingsRepository.save(settings);
    return settings;
  }
}

export { SettingsServices };
