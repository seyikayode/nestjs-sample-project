import { Artiste } from 'src/artistes/artiste.entity';
import { User } from 'src/users/user.entity';
import { EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { v4 as uuid4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { Playlist } from 'src/playlists/playlist.entity';

export const seedData = async (manager: EntityManager): Promise<void> => {
  //1
  // Add your seeding logic here using the manager
  // For example:

  await seedUser();
  await seedArtist();
  await seedPlaylists();

  async function seedUser() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuid4();

    await manager.getRepository(User).save(user);
  }

  async function seedArtist() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuid4();

    const artiste = new Artiste();
    artiste.user = user;
    await manager.getRepository(User).save(user);
    await manager.getRepository(Artiste).save(artiste);
  }

  async function seedPlaylists() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuid4();

    const playlist = new Playlist();
    playlist.name = faker.music.genre();
    playlist.user = user;

    await manager.getRepository(User).save(user);
    await manager.getRepository(Playlist).save(playlist);
  }
};