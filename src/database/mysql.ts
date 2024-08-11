import mysql, { Pool } from 'mysql2/promise';
import { ErrorCode } from '../model/ErrorCode';

export class MySql {
    private static instance: MySql;
    private pool: Pool;
    private config = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'ruhan',
        database: 'banco'
    };

    private constructor() {
        this.pool = mysql.createPool(this.config);
    }

    public static getInstance(): MySql {
        if (!MySql.instance)
            MySql.instance = new MySql();

        return MySql.instance;
    }

    public async query(query: string, values?: any[]): Promise<mysql.QueryResult | ErrorCode> {
        try {
            return (await this.pool.query(query, values))[0];
        } catch (error: any) {
            console.error('Query: ', query);
            return new ErrorCode(500, 'Ocorreu um erro ao se conectar ao banco');
        }
    }
}