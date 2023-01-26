import { Resolver, Query } from '@nestjs/graphql';
import { Article } from '../models/article.model';
import { ArticleService } from '../article.service';

@Resolver(Article)
export class ArticleQueriesResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => [Article])
  async articlesList() {
    return this.articleService.articlesList();
  }
}
