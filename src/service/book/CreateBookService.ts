import { CreateBookDto } from "../../model/dto/book/CreateBookDto";
import { BookEntity } from "../../model/entity/BookEntity";
import { ErrorCode } from "../../model/ErrorCode";
import { BookRepository } from "../../repository/BookRepository";
import { CategoryRepository } from "../../repository/CategoryRepository";

export async function createBookService(book: CreateBookDto): Promise<BookEntity | ErrorCode> {
    const repository = BookRepository.getInstance();
    const categoryRepository = CategoryRepository.getInstance();

    const checkCategory = await categoryRepository.getByID(book.categoryID);

    if(checkCategory instanceof ErrorCode)
        return new ErrorCode(400, `Categoria inválida: ${book.categoryID}`);

    return await repository.create(book);
}