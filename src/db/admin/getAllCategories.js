import { connection } from "../../db.js";

export async function getAllCategories() {
    try {
        const sql = `
            SELECT *,
                ( SELECT COUNT(*) FROM movies WHERE movies.category_id = categories.id ) AS count
            FROM categories
            ORDER BY name;`;
        const [result] = await connection.query(sql);
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
        const [result] = await connection.query(sql);
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
        const [result] = await connection.query(sql);
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}