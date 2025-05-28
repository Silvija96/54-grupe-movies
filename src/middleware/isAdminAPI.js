export function isAdminAPI(req, res, next) {
    if (req.user.role === 'admin') {
        return next();
    }

    return res
        .status(401)
        .json({
            status: 'error',
            msg: 'Unauthorized'
        });
}