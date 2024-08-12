import { PersonEntity } from "../../model/entity/PersonEntity";
import { ErrorCode } from "../../model/ErrorCode";
import { PersonRepository } from "../../repository/PersonRepository";

export async function getPersonsService(): Promise<PersonEntity[] | ErrorCode> {
    const repository = PersonRepository.getInstance();

    return await repository.getAll();
}