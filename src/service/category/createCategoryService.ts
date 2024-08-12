import { CreateCategoryDto } from "../../model/dto/category/CreateCategoryDto";
import { ErrorCode } from "../../model/ErrorCode";
import { CategoryEntity } from "../../model/entity/CategoryEntity";
import { CategoryRepository } from "../../repository/CategoryRepository";

export async function createCategoryService(category: CreateCategoryDto): Promise<CategoryEntity | ErrorCode> {
    const repository = CategoryRepository.getInstance();

    const validateDuplication = await repository.getByName(category.name);

    if(validateDuplication instanceof CategoryEntity)
        return new ErrorCode(400, `Categoria já registrada: ${validateDuplication.name}`);

    return await repository.create(category);
}