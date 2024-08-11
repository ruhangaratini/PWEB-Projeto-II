import { CreateCategoryDto } from "../../model/dto/category/CreateCategory";
import { ErrorCode } from "../../model/ErrorCode";
import { CategoryEntity } from "../../model/entity/CategoryEntity";
import { CategoryRepository } from "../../repository/CategoryRepository";

export async function createCategory(category: CreateCategoryDto): Promise<CategoryEntity | ErrorCode> {
    const repository = CategoryRepository.getInstace();

    return await repository.create(category);
}