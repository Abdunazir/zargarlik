import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './model/comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private readonly commentRepo: typeof Comment,
  ) {}

  async create(createCompanyDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentRepo.create(createCompanyDto);
    return comment;
  }

  async findAll(): Promise<Comment[]> {
    const comment = await this.commentRepo.findAll({
      include: { all: true },
    });
    return comment;
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return comment;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepo.update(updateCompanyDto, {
      where: { id },
      returning: true,
    });
    return comment[1][0].dataValues;
  }

  async remove(id: number): Promise<number> {
    const comment = await this.commentRepo.destroy({
      where: { id },
    })[0];
    return comment;
  }
}
