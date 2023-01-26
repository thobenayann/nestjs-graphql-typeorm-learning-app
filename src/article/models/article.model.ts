import { ID, ObjectType, Field } from '@nestjs/graphql';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Article extends BaseEntity {
  @Field(() => ID) // make available this field on graphql
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  image: string;
}
