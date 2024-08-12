import { ResultSetHeader } from "mysql2";
import KSUID from "ksuid";

import { MySql } from "../database/mysql";
import { ErrorCode } from "../model/ErrorCode";
import { CreatePersonDto } from "../model/dto/person/CreatePersonDto";
import { PersonEntity } from "../model/entity/PersonEntity";
import { PersonDto } from "../model/dto/person/PersonDto";

export class PersonRepository {
    private static instance: PersonRepository;
    private db: MySql;

    private constructor() {
        this.db = MySql.getInstance();
        this.createTable();
    }

    public static getInstance(): PersonRepository {
        if (!PersonRepository.instance)
            PersonRepository.instance = new PersonRepository();

        return PersonRepository.instance;
    }

    private async createTable() {
        const response = await this.db.query(
            `CREATE TABLE IF NOT EXISTS person (
                id VARCHAR(27) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL
        )`);

        if (response instanceof Error) {
            console.log('Erro ao criar tabela: ', response.message);
        }
    }

    public async create(person: CreatePersonDto): Promise<PersonEntity | ErrorCode> {
        const uuid: string = KSUID.randomSync().string;
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`INSERT INTO person (id, name, email) VALUES (?, ?, ?)`, 
            [uuid, person.name, person.email]);

        if (response instanceof ErrorCode)
            return response;

        return new PersonEntity(uuid, person.name, person.email);
    }

    public async getByID(id: string): Promise<PersonEntity | ErrorCode> {
        const response = <PersonEntity[] | ErrorCode>await this.db.query(`SELECT * FROM person WHERE id = ?`, [id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.length == 0)
            return new ErrorCode(404, 'Pessoa não encontrada');

        return response[0];
    }

    public async getAll(): Promise<PersonEntity[] | ErrorCode> {
        const response = <PersonEntity[] | ErrorCode>await this.db.query(`SELECT * FROM person`);

        return response;
    }

    public async update(person: PersonDto): Promise<PersonEntity | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`UPDATE person SET name = ?, email = ? WHERE id = ?`, 
            [person.name, person.email, person.id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(404, 'Pessoa não encontrada');

        const personEntity = <PersonEntity[] | ErrorCode>await this.db.query(`SELECT * FROM person WHERE id = ?`, [person.id]);

        if (personEntity instanceof ErrorCode)
            return personEntity;

        return personEntity[0];
    }

    public async delete(id: string): Promise<string | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`DELETE FROM person WHERE id = ?`, [id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(400, 'Pessoa não encontrada');

        return id;
    }
}