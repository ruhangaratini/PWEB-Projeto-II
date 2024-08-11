import { ErrorCode } from "../../model/ErrorCode";
import { CategoryRepository } from "../../repository/CategoryRepository";

export async function deleteCategoryService(categoryID: string): Promise<string | ErrorCode> {
    const repository = CategoryRepository.getInstance();

    return await repository.delete(categoryID);
}