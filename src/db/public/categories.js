import { connection } from "../../db.js";

export async function getAllCategories() {
    try {
        const sql = `
            SELECT *,
                ( 
                    SELECT COUNT(*)
                    FROM movies
                    WHERE movies.category_id = categories.id AND movies.is_published = 1
                ) AS count
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

// Dedicated for home page
export async function getFeaturedCategories() {
    try {
        const sql = `
            SELECT *,
                ( 
                    SELECT COUNT(*)
                    FROM movies
                    WHERE movies.category_id = categories.id AND movies.is_published = 1
                ) AS count
            FROM categories
            WHERE is_published = 1
            ORDER BY count DESC
            LIMIT 3;`;
        const [result] = await connection.query(sql);
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}