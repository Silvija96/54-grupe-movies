import { connection } from "../../db.js";

export async function getAllMovies() {
    try {
        const sql = `
            SELECT movies.*, categories.name AS categoryName, categories.url_slug AS categoryUrlSlug
            FROM movies
            INNER JOIN categories ON movies.category_id = categories.id
            WHERE movies.is_published = 1 AND categories.is_published = 1
            ORDER BY id;`;
        const [results] = await connection.execute(sql);

        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function getMoviesByCategory(category) {
    try {
        const sql = `
            SELECT movies.*
            FROM movies
            INNER JOIN categories ON movies.category_id = categories.id
            WHERE 
                movies.is_published = 1 AND
                categories.is_published = 1 AND
                categories.url_slug = ?;`;
        const [results] = await connection.execute(sql, [category]);

        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function getMovieBySlug(urlSlug) {
    try {
        const sql = `
            SELECT movies.*, categories.name AS categoryName, categories.url_slug AS categoryUrlSlug
            FROM movies
            INNER JOIN categories ON movies.category_id = categories.id
            WHERE movies.url_slug = ? AND movies.is_published = 1;`;
        const [results] = await connection.execute(sql, [urlSlug]);
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}