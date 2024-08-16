import { ResultSetHeader, RowDataPacket } from "mysql2";
import KSUID from "ksuid";

import { MySql } from "../database/mysql";
import { ErrorCode } from "../model/ErrorCode";
import { CreateUserDto } from "../model/dto/user/CreateUserDto";
import { UserEntity } from "../model/entity/UserEntity";
import { UserDto } from "../model/dto/user/UserDto";

export class UserRepository {
    private static instance: UserRepository;
    private db: MySql;

    private constructor() {
        this.db = MySql.getInstance();
        this.createTable();
    }

    public static getInstance(): UserRepository {
        if (!UserRepository.instance)
            UserRepository.instance = new UserRepository();

        return UserRepository.instance;
    }

    private async createTable() {
        const response = await this.db.query(
            `CREATE TABLE IF NOT EXISTS user (
                id VARCHAR(27) NOT NULL PRIMARY KEY,
                personID VARCHAR(27) NOT NULL,
                password VARCHAR(255) NOT NULL,
                FOREIGN KEY (personID) REFERENCES person(id)
        )`);

        if (response instanceof Error) {
            console.log('Erro ao criar tabela: ', response.message);
        }
    }

    public async create(user: CreateUserDto): Promise<UserEntity | ErrorCode> {
        const uuid: string = KSUID.randomSync().string;
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`INSERT INTO user (id, personID, password) VALUES (?, ?, ?)`,
            [uuid, user.personID, user.password]);

        if (response instanceof ErrorCode)
            return response;

        return new UserEntity(uuid, user.personID, user.password);
    }

    public async getByID(id: string): Promise<UserEntity | ErrorCode> {
        const response = <RowDataPacket[] | ErrorCode>await this.db.query(`SELECT * FROM user WHERE id = ?`, [id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.length == 0)
            return new ErrorCode(404, 'Usuário não encontrado');

        return new UserEntity(response[0].id, response[0].personID, response[0].password);
    }

    public async getAll(): Promise<any[] | ErrorCode> {
        const response = <RowDataPacket[] | ErrorCode>await this.db.query(`SELECT * FROM user`);

        return response;
    }

    public async getByPersonID(personID: string): Promise<any[] | ErrorCode> {
        const response = <RowDataPacket[] | ErrorCode>await this.db.query(`SELECT * FROM user WHERE personID = ?`,
            [personID]);

        return response;
    }

    public async update(user: UserDto): Promise<UserEntity | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`UPDATE user SET personID = ?, password = ? WHERE id = ?`,
            [user.personID, user.password, user.id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(404, 'Usuário não encontrado');

        return await this.getByID(user.id);
    }

    public async delete(id: string): Promise<string | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`DELETE FROM user WHERE id = ?`, [id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(404, 'Usuário não encontrado');

        return id;
    }
}