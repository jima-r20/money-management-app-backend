import { UserInformation } from '../user/interfaces/user-information.interface';
import { User } from '..//user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

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
