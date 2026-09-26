import type {
    SQLiteDatabase,
} from 'expo-sqlite';

export async function initializeDatabase(db: SQLiteDatabase) {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS menu_products (
            id_product INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            image TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL NOT NULL
        );
    `);
}