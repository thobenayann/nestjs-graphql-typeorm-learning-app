import { ArticleCreateInput, ArticleCreateOutput } from './article-create.dto';
import { InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ArticleUpdateInput extends ArticleCreateInput {}

@ObjectType()
export class ArticleUpdateOutput extends ArticleCreateOutput {}
