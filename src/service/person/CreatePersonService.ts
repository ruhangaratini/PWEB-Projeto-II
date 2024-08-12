import { ErrorCode } from "../../model/ErrorCode";
import { CreatePersonDto } from "../../model/dto/person/CreatePersonDto";
import { PersonEntity } from "../../model/entity/PersonEntity";
import { PersonRepository } from "../../repository/PersonRepository";

export async function createPersonService(person: CreatePersonDto): Promise<PersonEntity | ErrorCode> {
    const repository = PersonRepository.getInstance();

    return await repository.create(person);
}