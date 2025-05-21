import { connection } from "../db.js";

export async function getAllMovies() {
    try {
        const sql = 'SELECT * FROM movies;';
        const [results] = await connection.query(sql);

        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}