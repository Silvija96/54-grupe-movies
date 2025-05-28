import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function apiRegister(req, res) {
    const [err, msg] = IsValid.requiredFields(req.body, [
        { field: 'email', validation: IsValid.email },
        { field: 'password', validation: IsValid.password },
    ]);

    if (err) {
        return res.json({
            status: 'error',
            msg: msg,
        });
    }

    const { email, password } = req.body;

    try {
        const sql = 'SELECT * FROM users WHERE email = ?;';
        const [result] = await connection.query(sql, [email]);

        if (result.length > 0) {
            return res.json({
                status: 'error',
                msg: 'Toks email jau uzimtas :P',
            });
        }
    } catch (error) {
        console.log(error);
    }

    try {
        const sql = 'INSERT INTO users (email, password) VALUES (?, ?);';
        const [result] = await connection.query(sql, [email, password]);
        console.log(result);
    } catch (error) {
        console.log(error);
    }

    return res.json({
        status: 'success',
        msg: 'Sekminga registracija',
    });
}