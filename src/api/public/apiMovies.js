import { connection } from "../../db.js";
import { getAllCategories } from "../../db/public/categories.js";
import { IsValid } from "../../lib/IsValid.js";

export async function apiPublicMoviesGet(req, res) {
    const availableCategoryIds = (await getAllCategories()).map(c => '' + c.id);

    const [err, msg] = IsValid.requiredFields(
        req.query,
        [],
        [
            { field: 'text', validation: IsValid.nonEmptyString },
            { field: 'genre', validation: IsValid.includesInList, options: availableCategoryIds },
            { field: 'duration', validation: IsValid.includesInList, options: ['0', '1', '2', '3', '4'] },
            { field: 'thumbnail', validation: IsValid.includesInList, options: ['true', 'false'] },
        ],
    );

    if (err) {
        return res.json({
            status: 'error',
            msg: msg,
        });
    }

    const text = req.query.text;
    const genre = +req.query.genre;
    const duration = +req.query.duration;
    const thumbnail = req.query.thumbnail === 'true' ? true : false;

    const sqlParts = [];
    const sqlData = [];

    if (text) {
        sqlParts.push(`(title LIKE CONCAT("%", ?, "%") OR description LIKE CONCAT("%", ?, "%"))`);
        sqlData.push(text, text);
    }

    if (genre) {
        sqlParts.push('category_id = ?');
        sqlData.push(genre);
    }

    if (duration) {
        sqlParts.push('duration >= ?');
        sqlData.push((duration - 1) * 60);

        if (duration !== 4) {
            sqlParts.push('duration <= ?');
            sqlData.push(duration * 60 - 1);
        }
    }

    if (thumbnail) {
        sqlParts.push('thumbnail != ""');
    }

    try {
        const sql = `
            SELECT *
            FROM movies 
            ${sqlParts.length ? 'WHERE ' + sqlParts.join(' AND ') : ''};`;
        const [result] = await connection.execute(sql, sqlData);

        return res.json({
            status: 'success',
            content: result,
        });
    } catch (error) {
        console.log(error);

        return res.json({
            status: 'error',
            msg: 'Serverio klaida, nepavyko gauti filmu duomenu',
        });
    }
}