import { connection } from "../db.js";
import { IsValid } from "../lib/IsValid.js";
import { randomString } from "../lib/randomString.js";

export async function apiLogin(req, res) {
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
        const sql = 'SELECT * FROM users WHERE email = ? AND password = ?;';
        const [result] = await connection.query(sql, [email, password]);

        if (result.length === 0) {
            return res.json({
                status: 'error',
                msg: 'Neteisinga email ir password kombincija, arba tokia paskyra neegzistuoja',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            msg: 'Serverio klaida, pabandykite prisijungti veliau',
        });
    }

    const cookie = [
        'loginToken=' + randomString(20),
        'domain=localhost',
        'path=/',
        'max-age=3600',
        'Same-Site=Lax',
        'Secure',
        'HttpOnly',
    ];

    return res
        .set('Set-Cookie', cookie.join('; '))
        .json({
            status: 'success',
            msg: 'Jus buvote sekmingai prijungti prie sistemos',
        });
}