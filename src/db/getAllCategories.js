import { connection } from "../db.js";

export async function getAllCategories() {
    try {
        const sql = `
            SELECT *,
                ( SELECT COUNT(*) FROM movies WHERE movies.category = categories.url_slug ) as count
            FROM categories;`;
        const [result] = await connection.query(sql);
        return result;
    } catch (error) {
        return [];
    }
}