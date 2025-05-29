import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function apiCategoriesDelete(req, res) {
    const id = +req.params.id;
    const [err, msg] = IsValid.id(id);

    if (err) {
        return res.json({
            status: 'error',
            msg: msg,
        });
    }

    try {
        const sql = 'DELETE FROM categories WHERE id = ?;';
        const [result] = await connection.query(sql, [id]);

        if (result.affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'Filmu kategorijos istrinti nepavyko.',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            msg: 'Serverio klaida, pabandykite kategorija istrinti veliau',
        });
    }

    return res
        .json({
            status: 'success',
            msg: 'Filmu kategorija istrinta sekmingai',
        });
}