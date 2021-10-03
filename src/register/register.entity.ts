import { Item } from '../item/item.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Register extends BaseEntity {
  @PrimaryGeneratedColumn()
  registrationId: number;

  @Column()
  paymentDate: Date;

  @Column()
  paymentAmount: number;

  @Column({
    nullable: true,
  })
  depletionDay: Date;

  @ManyToOne(
    type => Item,
    item => item.registeredOnes,
    { eager: false },
  )
  item: Item;
}
