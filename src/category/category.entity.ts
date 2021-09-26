import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../user/user.entity';
import { UserInformation } from '../user/interfaces/user-information.interface';
import { Item } from '../item/item.entity';

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

  @OneToMany(
    type => Item,
    item => item.category,
  )
  registeredItems: Item[];
}
