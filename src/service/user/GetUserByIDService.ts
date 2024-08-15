import { UserEntity } from "../../model/entity/UserEntity";
import { ErrorCode } from "../../model/ErrorCode";
import { UserRepository } from "../../repository/UserRepository";

export async function getUserByIDService(personID: string): Promise<UserEntity | ErrorCode> {
    const repository = UserRepository.getInstance();

    return await repository.getByID(personID);
}