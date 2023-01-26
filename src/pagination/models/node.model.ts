import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, InterfaceType, ID } from '@nestjs/graphql';

@InterfaceType()
export abstract class Node extends BaseEntity {
  // On utilise une class "abstract" car on ne veut pas instancier Node
  // On veut uniquement que des classes puissent hériter de Node
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
