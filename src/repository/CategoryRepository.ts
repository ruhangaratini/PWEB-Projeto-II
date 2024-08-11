import { ResultSetHeader, RowDataPacket } from "mysql2";
import { MySql } from "../database/mysql";
import { ErrorCode } from "../model/ErrorCode";
import { CategoryEntity } from "../model/entity/CategoryEntity";
import KSUID from "ksuid";
import { CreateCategoryDto } from "../model/dto/category/CreateCategory";

export class CategoryRepository {
    private static instance: CategoryRepository;
    private db: MySql;

    private constructor() {
        this.db = MySql.getInstance();
        this.createTable();
    }

    public static getInstace(): CategoryRepository {
        if (!CategoryRepository.instance)
            CategoryRepository.instance = new CategoryRepository();

        return CategoryRepository.instance;
    }

    private async createTable() {
        const response = await this.db.query(
            `CREATE TABLE IF NOT EXISTS category (
                id VARCHAR(27) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
        )`);

        if (response instanceof Error) {
            console.log('Erro ao criar tabela: ', response.message);
        }
    }

    public async create(category: CreateCategoryDto): Promise<CategoryEntity | ErrorCode> {
        const uuid: string = KSUID.randomSync().string;
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`INSERT INTO category (id, name) VALUES (?, ?)`, [uuid, category.name]);

        if (response instanceof ErrorCode)
            return response;

        return new CategoryEntity(uuid, category.name);
    }

    public async searchByID(id: string): Promise<CategoryEntity | ErrorCode> {
        const response = <RowDataPacket[] | ErrorCode>await this.db.query(`SELECT * FROM category WHERE id = ?`, [id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.length == 0)
            return new ErrorCode(404, 'Categoria não encontrada');

        return new CategoryEntity(response[0].id, response[0].name);
    }
}