import { connection } from "../../db.js";

export async function getAllCategories() {
    try {
        const sql = `
            SELECT *,
                ( SELECT COUNT(*) FROM movies WHERE movies.category_id = categories.id ) AS count
            FROM categories
            ORDER BY name;`;
        const [result] = await connection.execute(sql);
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getCategoriesDraft() {
    try {
        const sql = `
            SELECT *,
                ( SELECT COUNT(*) FROM movies WHERE movies.category_id = categories.id ) AS count
            FROM categories
            WHERE is_published = 0
            ORDER BY name;`;
        const [result] = await connection.execute(sql);
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getCategoriesPublished() {
    try {
        const sql = `
            SELECT *,
                ( SELECT COUNT(*) FROM movies WHERE movies.category_id = categories.id ) AS count
            FROM categories
            WHERE is_published = 1
            ORDER BY name;`;
        const [result] = await connection.execute(sql);
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getCategoryByUrlSlug(urlSlug) {
    try {
        const sql = `SELECT * FROM categories WHERE url_slug = ?;`;
        const [result] = await connection.execute(sql, [urlSlug]);
        return result.length ? result[0] : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}