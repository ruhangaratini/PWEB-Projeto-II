import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { CreateBookDto } from "../model/dto/book/CreateBookDto";
import { BookEntity } from "../model/entity/BookEntity";
import { BaseErrorResponseDto } from "../model/dto/BaseErrorResponseDto";
import { BaseResponseDto } from "../model/dto/BaseResponseDto";
import { createBookService } from "../service/book/CreateBookService";
import { ErrorCode } from "../model/ErrorCode";
import { getBookByIDService } from "../service/book/GetBookByIDService";
import { getBooksService } from "../service/book/GetBooksService";
import { BookDto } from "../model/dto/book/BookDto";
import { updateBookService } from "../service/book/UpdateBookService";
import { deleteBookService } from "../service/book/DeleteBookService";

@Route('book')
@Tags('Book')
export class BookController extends Controller {

    @Post()
    public async registerBook(
        @Body() dto: CreateBookDto,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<201, BaseResponseDto<BookEntity>>
    ): Promise<void> {
        const response = await createBookService(dto);

        if(response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(201, new BaseResponseDto('Livro registrado com sucesso!', response));
    }

    @Get('{bookID}')
    public async getBookByID(
        @Path() bookID: string,
        @Res() notFound: TsoaResponse<404, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<BookEntity>>
    ): Promise<void> {
        const response = await getBookByIDService(bookID);

        if(response instanceof ErrorCode) {
            notFound(404, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Livro encontrado!', response));
    }

    @Get()
    public async getBooks(
        @Res() fail: TsoaResponse<500, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<BookEntity[]>>
    ): Promise<void> {
        const response = await getBooksService();

        if(response instanceof ErrorCode) {
            fail(500, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Listando Livros!', response));
    }

    @Put()
    public async updateBook(
        @Body() dto: BookDto,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<BookEntity>>
    ): Promise<void> {
        const response = await updateBookService(dto);

        if(response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Livro atualizado com sucesso!', response));
    }

    @Delete('{bookID}')
    public async deleteBook(
        @Path() bookID: string,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<202, BaseResponseDto<string>>
    ): Promise<void> {
        const response = await deleteBookService(bookID);

        if(response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(202, new BaseResponseDto('Livro deletado com sucesso!', response));
    }
}