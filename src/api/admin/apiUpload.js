export async function apiUpload(req, res) {
    if (!req.newFileName) {
        return res.status(500).json({
            status: 'error',
            msg: 'Serverio klaida, pabandykite nuotrauka ikelti veliau',
        });
    }

    return res.status(200).json({
        status: 'success',
        msg: '/img/movie-thumbnails/' + req.newFileName,
    });
}