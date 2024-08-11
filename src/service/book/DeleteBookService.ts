import { ErrorCode } from "../../model/ErrorCode";
import { BookRepository } from "../../repository/BookRepository";

export async function deleteBookService(bookID: string): Promise<string | ErrorCode> {
    const repository = BookRepository.getInstance();

    return await repository.delete(bookID);
}