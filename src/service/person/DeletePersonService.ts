import { ErrorCode } from "../../model/ErrorCode";
import { PersonRepository } from "../../repository/PersonRepository";

export async function deletePersonService(personID: string): Promise<string | ErrorCode> {
    const repository = PersonRepository.getInstance();

    return await repository.delete(personID);
}