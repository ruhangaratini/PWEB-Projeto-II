import { ErrorCode } from "../../model/ErrorCode";
import { UserRepository } from "../../repository/UserRepository";

export async function deleteUserService(bookID: string): Promise<string | ErrorCode> {
    const repository = UserRepository.getInstance();

    return await repository.delete(bookID);
}