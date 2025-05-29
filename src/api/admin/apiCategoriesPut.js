import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function apiCategoriesPut(req, res) {
    const [err, msg] = IsValid.requiredFields(req.body, [
        { field: 'name', validation: IsValid.nonEmptyString },
        { field: 'url', validation: IsValid.urlSlug },
        { field: 'description', validation: IsValid.nonEmptyString },
        { field: 'status', validation: IsValid.includesInList, options: ['draft', 'publish'] },
    ]);

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


    const { name, url, description, status } = req.body;

    // Tikriname, ar egzistuoja irasas, kuri keltiname redaguoti
    try {
        const sql = 'SELECT * FROM categories WHERE id = ?;';
        const [result] = await connection.query(sql, [id]);

        if (result.length !== 1) {
            return res.json({
                status: 'error',
                msg: 'Tokios filmu kategorijos nera.',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            msg: 'Serverio klaida, pabandykite kategorija sukurti veliau',
        });
    }

    // Tikriname, ar egzistuoja kitas jau esantis irasas, kurio pavadinimas sutampa su norimu redaguoti naujuoju pavadinimu
    try {
        const sql = 'SELECT * FROM categories WHERE name = ? AND id != ?;';
        const [result] = await connection.query(sql, [name, id]);

        if (result.length !== 0) {
            return res.json({
                status: 'error',
                msg: 'Jau egzistuoja kategorija su tokiu paciu pavadinimu.',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            msg: 'Serverio klaida, pabandykite kategorija sukurti veliau',
        });
    }

    // Tikriname, ar egzistuoja kitas jau esantis irasas, kurio nuoroda sutampa su norima redaguoti naujaja nuoroda
    try {
        const sql = 'SELECT * FROM categories WHERE url_slug = ? AND id != ?;';
        const [result] = await connection.query(sql, [url, id]);

        if (result.length !== 0) {
            return res.json({
                status: 'error',
                msg: 'Jau egzistuoja kategorija su tokia pacia nuoroda.',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            msg: 'Serverio klaida, pabandykite kategorija sukurti veliau',
        });
    }

    // Norimo iraso redagavimas
    try {
        const sql = `
            UPDATE categories SET name = ?, url_slug = ?, description = ?, is_published = ?
            WHERE id = ?;`;
        const [result] = await connection.query(sql, [name, url, description, status === 'publish' ? 1 : 0, id]);

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
            msg: 'Atnaujinta filmu kategorija',
        });
}