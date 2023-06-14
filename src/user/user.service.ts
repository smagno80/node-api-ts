import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../config/base.service';
import { logger } from '../utils/logger';
import { UserEntity } from './entities/user.entity';
import { UserDTO } from './dto/user.dto';

class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  /**
   * getAllUsers
   */
  public async getAllUsers(): Promise<UserEntity[] | undefined> {
    logger.info(`${UserService.name} - getAllUsers`);
    const users = await (await this.useRepository).find();
    return users;
  }

  /**
   * getUserById
   */
  public async getUserById(uId: string): Promise<UserEntity | null | undefined> {
    logger.info(`${UserService.name} - getUserById with id ${uId}`);
    const user = await (await this.useRepository).findOneBy({ id: uId });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  /**
   * createUser
   */
  public async createUser(userBody: UserDTO): Promise<UserEntity | undefined> {
    console.log('🚀 ~ file: user.service.ts:35 ~ UserService ~ createUser ~ userBody', userBody);
    logger.info(`${UserService.name} - createUser`);
    const newUser = await (await this.useRepository).create(userBody);
    return (await this.useRepository).save(newUser);
  }

  /**
   * updateUserById
   */
  public async updateUserById(id: string, updateUserBody: any): Promise<UpdateResult | null | undefined> {
    console.log('🚀 ~ file: user.service.ts:48 ~ UserService ~ updateUserById ~ updateUserBody', updateUserBody);
    logger.info(`${UserService.name} - updateUserById with id ${id}`);
    const findUser = await (await this.useRepository).findOneBy({ id });
    if (!findUser) {
      throw new Error('User not found');
    }
    return await (await this.useRepository).update(id, { ...updateUserBody });
  }

  /**
   * deleteUserById
   */
  public async deleteUserById(id: string): Promise<DeleteResult | null | undefined> {
    logger.info(`${UserService.name} - deleteUserById with id ${id}`);
    const findUser = await (await this.useRepository).findOneBy({ id });
    if (!findUser) {
      throw new Error('User not found');
    }
    return await (await this.useRepository).delete({ id });
  }
}

export default UserService;
