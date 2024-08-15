import { ErrorCode } from "../../model/ErrorCode";
import { PersonRepository } from "../../repository/PersonRepository";

export async function getPersonsService(): Promise<any[] | ErrorCode> {
    const repository = PersonRepository.getInstance();

    return await repository.getAll();
}