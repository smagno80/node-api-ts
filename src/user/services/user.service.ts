import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { HttpException } from '../../exception/httpExceptions';
import { createHashValue } from '../../utils/hash';
import { logger } from '../../utils/logger';
import { UserDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  /**
   * getAllUsers
   */
  public async getAllUsers(): Promise<UserEntity[] | undefined> {
    try {
      logger.info(`${UserService.name} - getAllUsers`);
      const users = await (await this.useRepository).find();
      return users;
    } catch (error) {
      console.log('🚀 ~ file: user.service.ts:24 ~ UserService ~ getAllUsers ~ error:', error);
    }
  }

  /**
   * getUserById
   */
  public async getUserById(uId: string): Promise<UserEntity | null | undefined> {
    try {
      logger.info(`${UserService.name} - getUserById with id ${uId}`);
      const user = await (await this.useRepository).findOneBy({ id: uId });
      return user;
    } catch (error) {
      console.log('🚀 ~ file: user.service.ts:36 ~ UserService ~ getUserById ~ error:', error);
    }
  }

  /**
   * createUser
   */
  public async createUser(userBody: UserDTO): Promise<UserEntity | null | undefined> {
    try {
      logger.info(`${UserService.name} - createUser`);
      const { password } = userBody;
      const hashedPsw = await createHashValue(password);
      const newUser = await (await this.useRepository).create({ ...userBody, password: hashedPsw });
      return (await this.useRepository).save(newUser);
    } catch (error) {
      console.log('🚀 ~ file: user.service.ts:52 ~ UserService ~ createUser ~ error:', error);
    }
  }

  /**
   * updateUserById
   */
  public async updateUserById(id: string, updateUserBody: any): Promise<UpdateResult | null | undefined> {
    try {
      logger.info(`${UserService.name} - updateUserById with id ${id}`);
      const findUser = await (await this.useRepository).findOneBy({ id });
      if (!findUser) throw new HttpException(409, "user doesn't exist");
      return await (await this.useRepository).update(id, { ...updateUserBody });
    } catch (error) {
      console.log('🚀 ~ file: user.service.ts:70 ~ UserService ~ updateUserById ~ error:', error);
    }
  }

  /**
   * deleteUserById
   */
  public async deleteUserById(id: string): Promise<DeleteResult | null | undefined> {
    try {
      logger.info(`${UserService.name} - deleteUserById with id ${id}`);
      const findUser = await (await this.useRepository).findOneBy({ id });
      if (!findUser) throw new HttpException(409, "user doesn't exist");
      return await (await this.useRepository).delete({ id });
    } catch (error) {
      console.log('🚀 ~ file: user.service.ts:89 ~ UserService ~ deleteUserById ~ error:', error);
    }
  }
}

export default UserService;
