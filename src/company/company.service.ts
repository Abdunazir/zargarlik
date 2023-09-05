import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './model/company.company';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company) private readonly companyRepo: typeof Company,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = await this.companyRepo.create(createCompanyDto);
    return company;
  }

  async findAll(): Promise<Company[]> {
    const company = await this.companyRepo.findAll({
      include: { all: true },
    });
    return company;
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return company;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.companyRepo.update(updateCompanyDto, {
      where: { id },
      returning: true,
    });
    return company[1][0].dataValues;
  }

  async remove(id: number): Promise<number> {
    const company = await this.companyRepo.destroy({
      where: { id },
    })[0];
    return company;
  }
}
