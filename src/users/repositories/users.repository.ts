import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "@prisma/client";
import { UserEntity } from "../entities/user.entity";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UsersRepository {

  constructor(
    private readonly prisma: PrismaService
  ){}


  async create(createUserDto: CreateUserDto): Promise<UserEntity>{
    return await this.prisma.user.create({
      data: createUserDto
    })
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany({
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true
          }
        }
      }
    })
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        posts: true
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity>{
    return await this.prisma.user.update({
      where: {
        id
      },
      data: updateUserDto
    })
  }

  async remove(id: number): Promise<UserEntity> {
    return await this.prisma.user.delete({
      where: {
        id
      }
    })
  }

}
