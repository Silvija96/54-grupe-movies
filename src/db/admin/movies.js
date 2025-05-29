import { connection } from "../../db.js";

export async function getAllMovies() {
    try {
        const sql = `
            SELECT *
            FROM movies
            ORDER BY id;`;
        const [results] = await connection.query(sql);

        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function getAllMoviesDraft() {
    try {
        const sql = `
            SELECT *
            FROM movies
            WHERE is_published = 0
            ORDER BY id;`;
        const [results] = await connection.query(sql);

        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function getAllMoviesPublished() {
    try {
        const sql = `
            SELECT movies.*, categories.name AS categoryName, categories.url_slug AS categoryUrlSlug
            FROM movies
            INNER JOIN categories ON movies.category_id = categories.id
            WHERE movies.is_published = 1
            ORDER BY id;`;
        const [results] = await connection.query(sql);

        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}