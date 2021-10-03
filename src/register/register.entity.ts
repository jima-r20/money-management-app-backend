import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Register extends BaseEntity {
  @PrimaryGeneratedColumn()
  resistrationId: number;

  @Column()
  paymentDate: Date;

  @Column()
  paymentAmount: number;

  @Column()
  depletionDay: Date;
}
