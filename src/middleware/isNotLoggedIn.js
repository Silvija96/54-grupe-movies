import { Page401 } from "../pages/public/Page401.js";

export async function isNotLoggedIn(req, res, next) {
    if (!req.user.isLoggedIn) {
        return next();
    }

    return res.send(await (new Page401(req)).render());
}