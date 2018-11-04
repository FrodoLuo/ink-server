import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 255, select: false })
  password: string;

  @Column({ length: 64, nullable: true, default: null, select: false })
  token: string;
}