import { ErrorCode } from "../../model/ErrorCode";
import { CategoryEntity } from "../../model/entity/CategoryEntity";
import { CategoryRepository } from "../../repository/CategoryRepository";
import { CategoryDto } from "../../model/dto/category/CategoryDto";

export async function updateCategoryService(category: CategoryDto): Promise<CategoryEntity | ErrorCode> {
    const repository = CategoryRepository.getInstance();

    return await repository.update(category);
}