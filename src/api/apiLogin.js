import { usersData } from "../data/users.js";
import { IsValid } from "../lib/IsValid.js";
import { randomString } from "../lib/randomString.js";

export function apiLogin(req, res) {
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

    let userExists = false;

    for (const user of usersData) {
        if (user.email === req.body.email && user.password === req.body.password) {
            userExists = true;
            break;
        }
    }

    if (!userExists) {
        return res.json({
            status: 'error',
            msg: 'Neteisinga el pasto ir slaptazodzio kombinacija, arba toks vartotojas neegzistuoja',
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