import { connection } from "../../db.js";

export async function apiLogout(req, res) {
    if (req.cookies.loginToken) {
        try {
            const sql = 'DELETE FROM tokens WHERE text = ?;';
            const [result] = await connection.execute(sql, [req.cookies.loginToken]);

            if (result.affectedRows !== 1) {
                // TODO
                console.log('Nepavyko istrinti cookie token - reiketu pabandyti tai padaryti dar karta veliau...');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const cookie = [
        'loginToken=',
        'domain=localhost',
        'path=/',
        'max-age=-1',
        'Same-Site=Lax',
        'Secure',
        'HttpOnly',
    ];

    return res
        .set('Set-Cookie', cookie.join('; '))
        .json({
            status: 'success',
            msg: 'Jus buvote sekmingai atjungti nuo sistemos',
        });
}