import { ErrorCode } from "../../model/ErrorCode";
import { BookRepository } from "../../repository/BookRepository";

export async function getBooksService(): Promise<any[] | ErrorCode> {
    const repository = BookRepository.getInstance();

    return await repository.getAll();
}