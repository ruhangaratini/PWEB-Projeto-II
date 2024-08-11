import { ResultSetHeader } from "mysql2";
import { MySql } from "../database/mysql";
import { ErrorCode } from "../model/ErrorCode";
import { CategoryEntity } from "../model/entity/CategoryEntity";
import KSUID from "ksuid";
import { CreateCategoryDto } from "../model/dto/category/CreateCategory";
import { CategoryDto } from "../model/dto/category/CategoryDto";

export class CategoryRepository {
    private static instance: CategoryRepository;
    private db: MySql;

    private constructor() {
        this.db = MySql.getInstance();
        this.createTable();
    }

    public static getInstance(): CategoryRepository {
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

    public async getByID(id: string): Promise<CategoryEntity | ErrorCode> {
        const response = <CategoryEntity[] | ErrorCode>await this.db.query(`SELECT * FROM category WHERE id = ?`, [id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.length == 0)
            return new ErrorCode(404, 'Categoria não encontrada');

        return new CategoryEntity(response[0].id, response[0].name);
    }

    public async getByName(name: string): Promise<CategoryEntity | ErrorCode> {
        const response = <CategoryEntity[] | ErrorCode>await this.db.query(`SELECT * FROM category WHERE name = ?`, [name]);

        if (response instanceof ErrorCode)
            return response;

        if (response.length == 0)
            return new ErrorCode(404, 'Categoria não encontrada');

        return new CategoryEntity(response[0].id, response[0].name);
    }

    public async getAll(): Promise<CategoryEntity[] | ErrorCode> {
        const response = <CategoryEntity[] | ErrorCode>await this.db.query(`SELECT * FROM category`);

        return response;
    }

    public async update(category: CategoryDto): Promise<CategoryEntity | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`UPDATE category SET name = ? WHERE id = ?`, [category.name, category.id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(400, 'Categoria não encontrada');

        const categoryEntity = <CategoryEntity[] | ErrorCode>await this.db.query(`SELECT * FROM category WHERE id = ?`, [category.id]);

        if (categoryEntity instanceof ErrorCode)
            return categoryEntity;

        return categoryEntity[0];
    }

    public async delete(id: string): Promise<string | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`DELETE FROM category WHERE id = ?`, [id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(400, 'Categoria não encontrada');

        return id;
    }
}