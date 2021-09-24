import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../user/user.entity';
import { UserInformation } from '../user/interfaces/user-information.interface';

@Entity()
@Unique(['categoryName'])
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column()
  categoryName: string;

  @Column()
  isIncome: boolean;

  @ManyToOne(
    type => User,
    user => user.registeredCategories,
    { eager: false },
  )
  author: UserInformation;
}
