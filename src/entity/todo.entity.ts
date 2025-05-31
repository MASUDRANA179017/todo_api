import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    tittle: string;

    @Column()
    description: string

    @ManyToOne(() => User, (user) => user.id)
    owner: User;

    @CreateDateColumn()
    createdAt: Date

}