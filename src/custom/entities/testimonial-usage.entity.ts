import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { TestimonialEntity } from '../../testimonial/entities/testimonial.entity';

@Entity({ name: 'testimonial_usage' })
export class TestimonialUsageEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  websiteUrl!: string;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => TestimonialEntity, (testimonial) => testimonial.testimonialUsages)
  @JoinColumn({ name: 'testimonial_id' })
  testimonial!: TestimonialEntity;
}
