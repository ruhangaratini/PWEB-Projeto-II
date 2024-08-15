import { ErrorCode } from "../../model/ErrorCode";
import { PersonRepository } from "../../repository/PersonRepository";
import { UserRepository } from "../../repository/UserRepository";

export async function deletePersonService(personID: string): Promise<string | ErrorCode> {
    const repository = PersonRepository.getInstance();
    const userRepository = UserRepository.getInstance();

    const usersWithPerson = await userRepository.getByPersonID(personID);

    if(usersWithPerson instanceof ErrorCode)
        return usersWithPerson;

    if(usersWithPerson.length > 0)
        return new ErrorCode(400, `Não é possível deletar pessoa pois está em uso por ${usersWithPerson.length} usuários`);

    return await repository.delete(personID);
}