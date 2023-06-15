import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { HttpException } from '../../exception/httpExceptions';
import { logger } from '../../utils/logger';
import { TestimonialDTO } from '../dto/testimonial.dto';
import { TestimonialEntity } from '../entities/testimonial.entity';

class TestimonialService extends BaseService<TestimonialEntity> {
  constructor() {
    super(TestimonialEntity);
  }

  public async getAllTestimonials(): Promise<TestimonialEntity[] | null> {
    logger.info(`${TestimonialService.name} - getAllTestimonials`);
    return await (await this.useRepository).find();
  }

  public async findTestimonialById(tId: string): Promise<TestimonialEntity | null> {
    logger.info(`${TestimonialService.name} - findTestimonialById`);
    const data = (await this.useRepository).findOneBy({ id: tId });
    if (!data) throw new HttpException(409, "testimonial doesn't exist");
    return data;
  }

  public async createTestimonial(testimonialData: TestimonialDTO): Promise<TestimonialEntity | null> {
    logger.info(`${TestimonialService.name} - createTestimonial`);
    const data = await (await this.useRepository).create(testimonialData);
    return (await this.useRepository).save(data);
  }

  public async updateTestimonial(tId: string, testimonialData: TestimonialDTO): Promise<UpdateResult | null> {
    logger.info(`${TestimonialService.name} - updateTestimonial`);
    const data = (await this.useRepository).findOneBy({ id: tId });
    if (!data) throw new HttpException(409, "Testimonial doesn't exist");

    return (await this.useRepository).update(tId, { ...testimonialData });
  }

  public async deleteTestimonial(tId: string): Promise<DeleteResult | null> {
    logger.info(`${TestimonialService.name} - deleteTestimonial`);
    const data = (await this.useRepository).findOne({ where: { id: tId } });
    if (!data) throw new HttpException(409, "Testimonial doesn't exist");
    return (await this.useRepository).delete({ id: tId });
  }
}

export default TestimonialService;
