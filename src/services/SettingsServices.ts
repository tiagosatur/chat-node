import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepositories";

interface ISettingsServices {
  chat: boolean;
  username: string;
}

class SettingsServices {
  async create({ chat, username }: ISettingsServices) {
    const settingsRepository = getCustomRepository(SettingsRepository);
    const userExists = await settingsRepository.findOne({
      username,
    });

    if (userExists) {
      throw new Error("User already exists");
    }
    const settings = settingsRepository.create({
      chat,
      username,
    });

    await settingsRepository.save(settings);
    return settings;
  }
}

export { SettingsServices };
