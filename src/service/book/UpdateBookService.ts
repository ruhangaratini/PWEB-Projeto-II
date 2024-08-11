import { BookDto } from "../../model/dto/book/BookDto";
import { BookEntity } from "../../model/entity/BookEntity";
import { ErrorCode } from "../../model/ErrorCode";
import { BookRepository } from "../../repository/BookRepository";
import { CategoryRepository } from "../../repository/CategoryRepository";

export async function updateBookService(book: BookDto): Promise<BookEntity | ErrorCode> {
    const repository = BookRepository.getInstance();
    const categoryRepository = CategoryRepository.getInstance();

    const checkCategory = await categoryRepository.getByID(book.categoryID);

    if(checkCategory instanceof ErrorCode)
        return new ErrorCode(400, `Categoria inválida: ${book.categoryID}`);

    return await repository.update(book);
}