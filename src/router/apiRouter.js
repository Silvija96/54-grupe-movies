import express from 'express';
import { uploadMovieThumbnailImage } from '../middleware/uploadThumbnail.js';
import { apiRegister } from '../api/public/apiRegister.js';
import { apiLogin } from '../api/public/apiLogin.js';
import { apiLogout } from '../api/public/apiLogout.js';
import { apiCategoriesPost } from '../api/admin/apiCategoriesPost.js';
import { isAdminAPI } from '../middleware/isAdminAPI.js';
import { apiCategoriesPut } from '../api/admin/apiCategoriesPut.js';
import { apiCategoriesDelete } from '../api/admin/apiCategoriesDelete.js';
import { apiMoviesPost } from '../api/admin/apiMoviesPost.js';
import { apiMoviesDelete } from '../api/admin/apiMoviesDelete.js';
import { apiMoviesPut } from '../api/admin/apiMoviesPut.js';
import { apiUpload } from '../api/admin/apiUpload.js';

export const apiRouter = express.Router();

apiRouter.post('/api/register', apiRegister);
apiRouter.post('/api/login', apiLogin);
apiRouter.get('/api/logout', apiLogout);

apiRouter.post('/api/admin/categories', isAdminAPI, apiCategoriesPost);
apiRouter.put('/api/admin/categories/:id', isAdminAPI, apiCategoriesPut);
apiRouter.delete('/api/admin/categories/:id', isAdminAPI, apiCategoriesDelete);

apiRouter.post('/api/admin/movies', isAdminAPI, apiMoviesPost);
apiRouter.put('/api/admin/movies/:id', isAdminAPI, apiMoviesPut);
apiRouter.delete('/api/admin/movies/:id', isAdminAPI, apiMoviesDelete);

apiRouter.post('/api/admin/upload', isAdminAPI, uploadMovieThumbnailImage.single('thumbnail'), apiUpload);