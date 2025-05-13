import { usersData } from "../data/users.js";
import { IsValid } from "../lib/IsValid.js";

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

    return res.json({
        status: 'success',
        msg: 'Jus buvote sekmingai prijungti prie sistemos',
    });
}