import { BaseService } from '../../config/base.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpException } from '../../exception/httpExceptions';
import { TestimonialUsagelDTO } from '../dto/testimonial-usage.dto';
import { TestimonialUsageEntity } from '../entities/testimonial-usage.entity';
import { logger } from '../../utils/logger';

class TestimonialUsageService extends BaseService<TestimonialUsageEntity> {
  constructor() {
    super(TestimonialUsageEntity);
  }

  public async getAllUsageTestimonials(): Promise<TestimonialUsageEntity[] | undefined> {
    logger.info(`${TestimonialUsageService.name} - getAllUsageTestimonials`);
    return await (await this.useRepository).find();
  }

  public async findUsageTestimonialById(tId: string): Promise<TestimonialUsageEntity | null | undefined> {
    logger.info(`${TestimonialUsageService.name} - findUsageTestimonialById`);
    const data = (await this.useRepository).findOneBy({ id: tId });
    if (!data) throw new HttpException(409, "usageTestimonial doesn't exist");
    return data;
  }

  public async createUsageTestimonial(testimonialData: TestimonialUsagelDTO): Promise<TestimonialUsageEntity | null | undefined> {
    logger.info(`${TestimonialUsageService.name} - createUsageTestimonial`);
    const data = (await this.useRepository).create(testimonialData);
    return (await this.useRepository).save(data);
  }

  public async updateUsageTestimonial(tId: string, testimonialData: TestimonialUsagelDTO): Promise<UpdateResult | undefined> {
    logger.info(`${TestimonialUsageService.name} - updateUsageTestimonial`);
    const data = (await this.useRepository).findOneBy({ id: tId });
    if (!data) throw new HttpException(409, "usageTestimonial doesn't exist");
    return (await this.useRepository).update(tId, { ...testimonialData });
  }

  public async deleteUsageTestimonial(tId: string): Promise<DeleteResult | undefined> {
    logger.info(`${TestimonialUsageService.name} - deleteUsageTestimonial`);
    const data = (await this.useRepository).findOne({ where: { id: tId } });
    if (!data) throw new HttpException(409, "usageTestimonial doesn't exist");
    return (await this.useRepository).delete({ id: tId });
  }
}

export default TestimonialUsageService;
