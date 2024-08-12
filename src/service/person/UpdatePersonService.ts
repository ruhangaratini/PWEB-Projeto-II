import { PersonDto } from "../../model/dto/person/PersonDto";
import { PersonEntity } from "../../model/entity/PersonEntity";
import { ErrorCode } from "../../model/ErrorCode";
import { PersonRepository } from "../../repository/PersonRepository";

export async function updatePersonService(person: PersonDto): Promise<PersonEntity | ErrorCode> {
    const repository = PersonRepository.getInstance();

    return await repository.update(person);
}