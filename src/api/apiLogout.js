export function apiLogout(req, res) {
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