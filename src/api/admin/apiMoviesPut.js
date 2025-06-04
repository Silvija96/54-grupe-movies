import { connection } from "../../db.js";
import { getAllCategories } from "../../db/admin/categories.js";
import { IsValid } from "../../lib/IsValid.js";

export async function apiMoviesPut(req, res) {
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

    const id = +req.params.id;
    const [errId, msgId] = IsValid.id(id);

    if (errId) {
        return res.json({
            status: 'error',
            msg: msgId,
        });
    }

    const { name, url, description, status, hours, minutes, category } = req.body;
    const duration = (hours ?? 0) * 60 + (minutes ?? 0);
    const statusIndex = status === 'publish' ? 1 : 0;

    // Tikriname, ar egzistuoja irasas, kuri keltiname redaguoti
    try {
        const sql = 'SELECT * FROM movies WHERE id = ?;';
        const [result] = await connection.query(sql, [id]);

        if (result.length !== 1) {
            return res.json({
                status: 'error',
                msg: 'Tokio filmo nera.',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            msg: 'Serverio klaida, pabandykite filma atnaujinti veliau',
        });
    }


    // Tikriname, ar egzistuoja kitas jau esantis irasas, kurio nuoroda sutampa su norima redaguoti naujaja nuoroda
    try {
        const sql = 'SELECT * FROM movies WHERE url_slug = ? AND id != ?;';
        const [result] = await connection.query(sql, [url, id]);

        if (result.length !== 0) {
            return res.json({
                status: 'error',
                msg: 'Jau egzistuoja filmas su tokia pacia nuoroda.',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            msg: 'Serverio klaida, pabandykite filma atnaujinti veliau',
        });
    }

    // Norimo iraso redagavimas
    try {
        const sql = `
            UPDATE movies
            SET title = ?, url_slug = ?, thumbnail = ?, description = ?, duration = ?, category_id = ?, is_published = ?
            WHERE id = ?;`;
        const [result] = await connection.query(sql, [name, url, '', description, duration, category, statusIndex, id]);

        if (result.affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'Serverio klaida, pabandykite kategorija sukurti veliau',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            msg: 'Serverio klaida, pabandykite kategorija sukurti veliau',
        });
    }

    return res
        .json({
            status: 'success',
            msg: 'Atnaujintas filmas',
        });
}