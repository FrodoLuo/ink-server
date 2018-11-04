import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn, Timestamp } from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @UpdateDateColumn()
  updateDate: Timestamp;

  @Column({length: 255})
  mdUrl: string;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @Column()
  tags: string;

  @Column()
  brief: string;
}