import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {}

  async create(createBookDto: CreateBookDto) {
    const existingBook = await this.bookRepository.findOneBy({
      title: createBookDto.title,
    });
    if (existingBook) {
      throw new ConflictException('Book already exists');
    }

    const book = this.bookRepository.create({
      ...createBookDto
    });
    return this.bookRepository.save(book)
  }

  findAll() {
    return this.bookRepository.find({});
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOne({
      where: {id: +id},
    });

    if (!book) {
      throw new NotFoundException(`Book with id #${id} does not exists`)
    }

    return book
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.preload({
      id: +id,
      ...updateBookDto
    });

    if (!book) {
      throw new NotFoundException(`Book with id #${id} does not exist`)
    }

    return this.bookRepository.save(book)
  }

  async remove(id: string) {
    const book = await this.findOne(id);
    return this.bookRepository.remove(book);
  }
}
