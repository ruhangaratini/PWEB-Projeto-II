import { CategoryDto } from "../../model/dto/CategoryDto";
import { ErrorDto } from "../../model/dto/ErrorDto";
import { CategoryEntity } from "../../model/entity/CategoryEntity";
import { CategoryRepository } from "../../repository/CategoryRepository";

export async function createCategory(category: CategoryDto): Promise<CategoryEntity | ErrorDto> {
    const repository = CategoryRepository.getInstace();
    return await repository.create(category);
}