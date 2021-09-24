import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['itemName'])
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  itemId: number;

  @Column()
  itemName: string;

  // 消耗品かどうか
  @Column()
  isExpendables: boolean;

  // 消耗品の場合、消耗し切るまでの日数
  @Column()
  depletionPeriod: number;

  // 固定費かどうか
  @Column()
  isFixedCost: boolean;

  // 固定費の場合の金額
  @Column()
  fixedCost: number;
}
