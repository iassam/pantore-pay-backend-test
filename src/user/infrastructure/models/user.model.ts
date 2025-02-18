import { UserRole } from "../../shared/enums";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity("users")
  export class UserModel {
    @PrimaryGeneratedColumn()
    id: string;
  
    @Column()
    name: string;

    @Column()
    email: string;
  
    @Column()
    password: string;
  
    @Column({enum: UserRole, default: UserRole.CLIENT})
    role: UserRole;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  