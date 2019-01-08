import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn} from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @UpdateDateColumn()
  updateDate: Date;

  @Column({length: 255})
  mdUrl: string;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @Column()
  tags: string;

  @Column({length: 1024})
  brief: string;

  @Column({default: false})
  deleted: boolean;
}
