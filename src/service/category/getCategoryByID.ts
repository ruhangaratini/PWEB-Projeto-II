import { ErrorCode } from "../../model/ErrorCode";
import { CategoryEntity } from "../../model/entity/CategoryEntity";
import { CategoryRepository } from "../../repository/CategoryRepository";

export async function getCategoryByID(categoryID: string): Promise<CategoryEntity | ErrorCode> {
    const repository = CategoryRepository.getInstace();

    return await repository.searchByID(categoryID);
}