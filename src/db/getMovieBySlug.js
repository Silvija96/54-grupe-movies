import { connection } from "../db.js";

export async function getMovieBySlug(urlSlug) {
    try {
        const sql = `SELECT * FROM movies WHERE url_slug = ?;`;
        const [results] = await connection.query(sql, [urlSlug]);

        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}