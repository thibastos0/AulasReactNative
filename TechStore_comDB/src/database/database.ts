import type {
    SQLiteDatabase,
} from 'expo-sqlite';

export async function initializeDatabase(db: SQLiteDatabase) {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS products (
            id_product INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL
        );
    `);
}