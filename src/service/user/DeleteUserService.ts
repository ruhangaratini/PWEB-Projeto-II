import { ErrorCode } from "../../model/ErrorCode";
import { UserRepository } from "../../repository/UserRepository";

export async function deleteUserService(userID: string): Promise<string | ErrorCode> {
    const repository = UserRepository.getInstance();

    return await repository.delete(userID);
}