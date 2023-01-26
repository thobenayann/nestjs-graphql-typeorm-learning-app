import { ArticleQueriesResolver } from './resolvers/article.queries.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ArticleService } from './article.service';
import { Article } from './models/article.model';
import { ArticleMutationsResolver } from './resolvers/article.mutations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticleService, ArticleMutationsResolver, ArticleQueriesResolver],
})
export class ArticleModule {}
