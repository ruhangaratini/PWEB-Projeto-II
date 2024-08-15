import { ErrorCode } from "../../model/ErrorCode";
import { CategoryRepository } from "../../repository/CategoryRepository";

export async function getCategoriesService(): Promise<any[] | ErrorCode> {
    const repository = CategoryRepository.getInstance();

    return await repository.getAll();
}