import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { TitleFormatPipe } from '../common/pipes/title-format.pipe';
import { PublishedYearValidationPipe } from '../common/pipes/published-year-validation.pipe';
import { LibrarianGuard } from '../common/guards/librarian/librarian.guard';
import { DuplicateBookFilter } from '../common/filters/duplicate-book.filter';
import { ResponseEnvelopeInterceptor } from '../common/interceptor/response-envelope.interceptor';

@Controller('books')
@UseInterceptors(ResponseEnvelopeInterceptor)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(LibrarianGuard)
  @UseFilters(DuplicateBookFilter)
  @Post()
  create(
    @Body() createBookDto: CreateBookDto,
    @Body('title', TitleFormatPipe) title: string,
    @Body('publishedYear', PublishedYearValidationPipe) publishedYear: number,
  ) {
    return this.booksService.create({ ...createBookDto, title, publishedYear });
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @UseGuards(LibrarianGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Body('title', TitleFormatPipe) title: string,
    @Body('publishedYear', PublishedYearValidationPipe) publishedYear: number,
  ) {
    return this.booksService.update(+id, {...updateBookDto,title, publishedYear});
  }

  @UseGuards(LibrarianGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
