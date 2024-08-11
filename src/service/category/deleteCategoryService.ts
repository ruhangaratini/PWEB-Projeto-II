import { ErrorCode } from "../../model/ErrorCode";
import { BookRepository } from "../../repository/BookRepository";
import { CategoryRepository } from "../../repository/CategoryRepository";

export async function deleteCategoryService(categoryID: string): Promise<string | ErrorCode> {
    const repository = CategoryRepository.getInstance();
    const bookRepository = BookRepository.getInstance();

    const booksWithCategory = await bookRepository.getByCategory(categoryID);

    if(booksWithCategory instanceof ErrorCode)
        return booksWithCategory;

    if(booksWithCategory.length > 0)
        return new ErrorCode(400, `Não é possível deletar categoria pois está em uso por ${booksWithCategory.length} livros `);

    return await repository.delete(categoryID);
}