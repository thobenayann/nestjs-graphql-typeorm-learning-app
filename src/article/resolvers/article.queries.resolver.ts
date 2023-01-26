import {
  ArticlesPagination,
  ArticlesPaginationArgs,
} from './../dto/articles-pagination.dto';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Article } from '../models/article.model';
import { ArticleService } from '../article.service';

@Resolver(Article)
export class ArticleQueriesResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => ArticlesPagination)
  async articlesPagination(@Args() args: ArticlesPaginationArgs) {
    return this.articleService.articlesPagination(args);
  }
}
