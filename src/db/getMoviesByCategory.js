import { connection } from "../db.js";

export async function getMoviesByCategory(category) {
    try {
        const sql = `SELECT * FROM movies WHERE category = ?;`;
        const [results] = await connection.query(sql, [category]);

        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}