import {
  ArticlesPagination,
  ArticlesPaginationArgs,
} from './dto/articles-pagination.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from './dto/article-create.dto';
import { ArticleDeleteOutput } from './dto/article-delete.dto';
import {
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from './dto/article-update.dto';
import { Article } from './models/article.model';
import { SortDirection } from 'src/pagination/dto/pagination.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async articleCreate(input: ArticleCreateInput): Promise<ArticleCreateOutput> {
    const newArticle = this.articleRepository.create(input);
    const article = await this.articleRepository.save(newArticle);
    return { article };
  }

  async articleUpdate(
    articleId: Article['id'],
    input: ArticleUpdateInput,
  ): Promise<ArticleUpdateOutput> {
    const article = await this.articleRepository.findOneOrFail({
      where: { id: articleId },
    });
    article.title = input.title;
    article.description = input.description;
    article.image = input.image;

    await article.save();
    return { article };
  }

  async articleDelete(articleId: Article['id']): Promise<ArticleDeleteOutput> {
    const article = await this.articleRepository.findOneOrFail({
      where: { id: articleId },
    });

    await article.remove();
    return { articleId };
  }

  async articlesPagination(
    args: ArticlesPaginationArgs,
  ): Promise<ArticlesPagination> {
    const queryBuilder = this.articleRepository.createQueryBuilder('article');
    queryBuilder.take(args.take);
    queryBuilder.skip(args.skip);
    if (args.sortBy) {
      if (args.sortBy.createAt !== null) {
        queryBuilder.addOrderBy(
          'article.createdAt',
          args.sortBy.createAt === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.title !== null) {
        queryBuilder.addOrderBy(
          'article.createdAt',
          args.sortBy.title === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
    }
    const [nodes, totalCount] = await queryBuilder.getManyAndCount();
    // const [nodes, totalCount] = await this.articleRepository.findAndCount({
    //   skip: args.skip,
    //   take: args.take,
    //   order: {
    //     createdAt: args.sortBy?.createAt === SortDirection.ASC ? 'ASC' : 'DESC',
    //   },
    // });
    return { nodes, totalCount };
  }
}
