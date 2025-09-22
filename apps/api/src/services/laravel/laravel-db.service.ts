import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class LaravelDbService implements OnModuleDestroy {
  private connection: mysql.Connection;

  async connect() {
    if (!this.connection) {
      this.connection = await mysql.createConnection({
        host: '195.35.43.10',
        user: 'root', 
        password: 'Ibdm3p1dqdp0d1s1701@',
        database: 'empresariossa_api',
        port: 3306,
        connectTimeout: 10000
      });
    }
    return this.connection;
  }

  async getUsers(limit = 100) {
    const conn = await this.connect();
    // Fix: usar template literal invece di parametri prepared per LIMIT
    const [rows] = await conn.execute(
      `SELECT id, name, email, type, companie_name, cell_phone, cpf, is_active, created_at FROM users WHERE deleted_at IS NULL LIMIT ${parseInt(limit.toString())}`
    );
    return rows;
  }

  async getPointsRanking() {
    const conn = await this.connect();
    const [rows] = await conn.execute(`
      SELECT 
        u.id, u.name, u.companie_name,
        COALESCE(SUM(p.points), 0) as total_points,
        COUNT(p.id) as transactions_count
      FROM users u 
      LEFT JOIN points p ON u.id = p.users_id AND p.deleted_at IS NULL
      WHERE u.deleted_at IS NULL 
      GROUP BY u.id, u.name, u.companie_name
      ORDER BY total_points DESC 
      LIMIT 50
    `);
    return rows;
  }

  async getUserPoints(userId: number) {
    const conn = await this.connect();
    const [rows] = await conn.execute(
      'SELECT * FROM points WHERE users_id = ? AND deleted_at IS NULL ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  onModuleDestroy() {
    if (this.connection) {
      this.connection.end();
    }
  }
}
