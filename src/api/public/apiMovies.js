import { getAllCategories } from "../../db/public/categories.js";
import { IsValid } from "../../lib/IsValid.js";

export async function apiPublicMoviesGet(req, res) {
    const availableCategoryIds = (await getAllCategories()).map(c => '' + c.id);

    const [err, msg] = IsValid.requiredFields(
        req.query,
        [],
        [
            { field: 'text', validation: IsValid.nonEmptyString },
            { field: 'genre', validation: IsValid.includesInList, options: availableCategoryIds },
            { field: 'duration', validation: IsValid.includesInList, options: ['0', '1', '2', '3', '4'] },
            { field: 'thumbnail', validation: IsValid.includesInList, options: ['true', 'false'] },
        ],
    );

    if (err) {
        return res.json({
            status: 'error',
            msg: msg,
        });
    }

    return res.json({
        status: 'success',
        content: [],
    });
}