import { ErrorCode } from "../../model/ErrorCode";
import { CategoryEntity } from "../../model/entity/CategoryEntity";
import { CategoryRepository } from "../../repository/CategoryRepository";

export async function getCategoriesService(): Promise<CategoryEntity[] | ErrorCode> {
    const repository = CategoryRepository.getInstance();

    return await repository.getAll();
}