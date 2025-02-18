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
    /**
     * The ID of user.
     */
    @PrimaryGeneratedColumn()
    id: string;
  
    /**
     * The name of the user.
     */
    @Column()
    name: string;

    /**
     * The email of the user.
     */
    @Column()
    email: string;
  
    /**
     * The password of the user.
     */
    @Column()
    password: string;
  
    /**
     * The role of the user.
     */
    @Column({enum: UserRole, default: UserRole.CLIENT})
    role: UserRole;

    /**
     * The date the user was created.
     */
    @CreateDateColumn()
    created_at: Date;
  
    /**
     * The date the user was last updated.
     */
    @UpdateDateColumn()
    updated_at: Date;
  }
