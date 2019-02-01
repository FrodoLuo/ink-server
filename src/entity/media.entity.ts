import { ManyToOne, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @UpdateDateColumn()
    UpdateDateColumn: Date;

    @Column()
    extension: string;

    @Column()
    size: number;

    @Column()
    path: string;

    @ManyToOne(type => User)
    user: User;
}