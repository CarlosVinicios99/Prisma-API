import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { UnauthorizedError } from 'src/common/errors/types/unauthorized-error';

@Injectable()
export class UsersService {

  constructor(
    private readonly usersRepository: UsersRepository
  ){}


  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create(createUserDto)
  }

  async findAll() {
    throw new UnauthorizedError('Não autorizado')
    return await this.usersRepository.findAll()

  }

  async findOne(id: number) {
    return await this.usersRepository.findOne(id)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto)
  }

  async remove(id: number) {
    return await this.usersRepository.remove(id)
  }
}
