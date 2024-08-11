import { BookEntity } from "../../model/entity/BookEntity";
import { ErrorCode } from "../../model/ErrorCode";
import { BookRepository } from "../../repository/BookRepository";

export async function getBookByIDService(bookID: string): Promise<BookEntity | ErrorCode> {
    const repository = BookRepository.getInstance();

    return await repository.getByID(bookID);
}