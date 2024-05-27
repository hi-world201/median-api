import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) { }
  async create(createArticleDto: CreateArticleDto) {
    return new ArticleEntity(await this.prisma.article.create({
      data: createArticleDto
    }));
  }

  async findAll() {
    const articles = await this.prisma.article.findMany({
      where: {
        published: true,
      }
    });

    return articles.map((article) => new ArticleEntity(article));
  }

  async findDrafts() {
    const articles = await this.prisma.article.findMany({
      where: {
        published: false,
      }
    });

    return articles.map((article) => new ArticleEntity(article));
  }

  async findOne(id: number) {
    return new ArticleEntity(await this.prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
      },
    }));
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return new ArticleEntity(await this.prisma.article.update({
      where: { id },
      data: updateArticleDto
    }));
  }

  async remove(id: number) {
    return new ArticleEntity(await this.prisma.article.delete({ where: { id } }));
  }
}
