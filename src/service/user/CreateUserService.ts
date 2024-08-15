import { CreateUserDto } from "../../model/dto/user/CreateUserDto";
import { UserEntity } from "../../model/entity/UserEntity";
import { ErrorCode } from "../../model/ErrorCode";
import { PersonRepository } from "../../repository/PersonRepository";
import { UserRepository } from "../../repository/UserRepository";

export async function createUserService(user: CreateUserDto): Promise<UserEntity | ErrorCode> {
    const repository = UserRepository.getInstance();
    const personRepository = PersonRepository.getInstance();

    const checkPerson = await personRepository.getByID(user.personID);

    if(checkPerson instanceof ErrorCode)
        return new ErrorCode(400, `Pessoa inválida: ${user.personID}`);

    return await repository.create(user);
}