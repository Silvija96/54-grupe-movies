import { connection } from "../../db.js";
import { getAllCategories } from "../../db/admin/categories.js";
import { IsValid } from "../../lib/IsValid.js";

export async function apiMoviesPost(req, res) {
    const availableCategoryIds = (await getAllCategories()).map(item => item.id);

    const [err, msg] = IsValid.requiredFields(
        req.body,
        [
            { field: 'name', validation: IsValid.nonEmptyString },
            { field: 'url', validation: IsValid.urlSlug },
            { field: 'status', validation: IsValid.includesInList, options: ['draft', 'publish'] },
        ],
        [
            { field: 'description', validation: IsValid.nonEmptyString },
            { field: 'hours', validation: IsValid.positiveInteger },
            { field: 'minutes', validation: IsValid.positiveInteger },
            { field: 'category', validation: IsValid.includesInList, options: availableCategoryIds },
            { field: 'image', validation: IsValid.nonEmptyString },
        ],
    );

    if (err) {
        return res.json({
            status: 'error',
            msg: msg,
        });
    }

    const { name, url, description, status, hours, minutes, category, image } = req.body;
    const duration = (hours ?? 0) * 60 + (minutes ?? 0);
    const statusIndex = status === 'publish' ? 1 : 0;
    const imageFileName = image.slice(22);

    try {
        const sql = 'SELECT * FROM movies WHERE title = ? OR url_slug = ?;';
        const [result] = await connection.query(sql, [name, url]);

        if (result.length > 0) {
            return res.json({
                status: 'error',
                msg: 'Toks filmas jau egzistuoja.',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            msg: 'Serverio klaida, pabandykite filma sukurti veliau',
        });
    }

    try {
        const sql = `
            INSERT INTO movies 
                (title, url_slug, thumbnail, description, duration, category_id, is_published)
            VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const [result] = await connection.query(sql, [name, url, imageFileName, description, duration, category, statusIndex]);

        if (result.affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'Serverio klaida, pabandykite filma sukurti veliau',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            msg: 'Serverio klaida, pabandykite filma sukurti veliau',
        });
    }

    return res
        .json({
            status: 'success',
            msg: 'Sukurtas naujas filmas',
        });
}