import { ErrorCode } from "../../model/ErrorCode";
import { CategoryEntity } from "../../model/entity/CategoryEntity";
import { CategoryRepository } from "../../repository/CategoryRepository";

export async function getCategoryByIDService(categoryID: string): Promise<CategoryEntity | ErrorCode> {
    const repository = CategoryRepository.getInstance();

    return await repository.getByID(categoryID);
}