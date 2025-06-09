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
        sqlParts.push(`(movies.title LIKE CONCAT("%", ?, "%") OR movies.description LIKE CONCAT("%", ?, "%"))`);
        sqlData.push(text, text);
    }

    if (genre) {
        sqlParts.push('movies.category_id = ?');
        sqlData.push(genre);
    }

    if (duration) {
        sqlParts.push('movies.duration >= ?');
        sqlData.push((duration - 1) * 60);

        if (duration !== 4) {
            sqlParts.push('movies.duration <= ?');
            sqlData.push(duration * 60 - 1);
        }
    }

    if (thumbnail) {
        sqlParts.push('movies.thumbnail != ""');
    }

    try {
        const sql = `
            SELECT movies.*, categories.name AS categoryName, categories.url_slug AS categoryUrlSlug
            FROM movies
            INNER JOIN categories ON movies.category_id = categories.id
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