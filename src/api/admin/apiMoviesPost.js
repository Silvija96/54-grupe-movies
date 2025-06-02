import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function apiMoviesPost(req, res) {
    const [err, msg] = IsValid.requiredFields(
        req.body,
        [
            { field: 'name', validation: IsValid.nonEmptyString },
            { field: 'url', validation: IsValid.urlSlug },
            { field: 'status', validation: IsValid.includesInList, options: ['draft', 'publish'] },
        ],
        [
            { field: 'description', validation: IsValid.nonEmptyString },
            { field: 'hours', validation: IsValid.nonEmptyString },
            { field: 'minutes', validation: IsValid.nonEmptyString },
            { field: 'category', validation: IsValid.nonEmptyString },
            { field: 'image', validation: IsValid.nonEmptyString },
        ],
    );

    if (err) {
        return res.json({
            status: 'error',
            msg: msg,
        });
    }

    const { name, url, description, status } = req.body;

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

    // try {
    //     const sql = 'INSERT INTO categories (name, url_slug, description, is_published) VALUES (?, ?, ?, ?);';
    //     const [result] = await connection.query(sql, [name, url, description, status === 'publish' ? 1 : 0]);

    //     if (result.affectedRows !== 1) {
    //         return res.json({
    //             status: 'error',
    //             msg: 'Serverio klaida, pabandykite kategorija sukurti veliau',
    //         });
    //     }
    // } catch (error) {
    //     console.log(error);
    //     return res.json({
    //         status: 'error',
    //         msg: 'Serverio klaida, pabandykite kategorija sukurti veliau',
    //     });
    // }

    return res
        .json({
            status: 'success',
            msg: 'Sukurtas naujas filmas',
        });
}