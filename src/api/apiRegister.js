import { usersData } from "../data/users.js";
import { IsValid } from "../lib/IsValid.js";

export function apiRegister(req, res) {
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
        if (user.email === req.body.email) {
            userExists = true;
            break;
        }
    }

    if (userExists) {
        return res.json({
            status: 'error',
            msg: 'Toks vartotojas jau egzistuoja',
        });
    }

    usersData.push({
        id: usersData.length + 1,
        ...req.body,
        createdAt: new Date(),
    });

    return res.json({
        status: 'success',
        msg: 'Sekminga registracija',
    });
}