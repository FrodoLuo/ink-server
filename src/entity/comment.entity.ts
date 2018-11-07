import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, Timestamp } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column({ length: 512 })
  content: string;

  @UpdateDateColumn()
  updateDate: Timestamp;

  @Column({ default: false })
  deleted: boolean;
}