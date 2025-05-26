import { Page401 } from "../pages/public/Page401.js";

export async function isAdmin(req, res, next) {
    if (req.user.role === 'admin') {
        return next();
    }

    return res.send(await (new Page401(req)).render());
}