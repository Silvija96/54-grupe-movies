import express from 'express';
import { PageHome } from '../pages/public/PageHome.js';
import { Page404 } from '../pages/public/Page404.js';
import { PageMovies } from '../pages/public/PageMovies.js';
import { PageCategories } from '../pages/public/PageCategories.js';
import { PageMovieInner } from '../pages/public/PageMovieInner.js';
import { PageCategoryInner } from '../pages/public/PageCategoryInner.js';
import { adminRouter } from './adminRouter.js';
import { authRouter } from './authRouter.js';
import { isAdmin } from '../middleware/isAdmin.js';

export const pageRouter = express.Router();

pageRouter.get('/', async (req, res) => res.send(await (new PageHome(req)).render()));
pageRouter.get('/movies', async (req, res) => res.send(await (new PageMovies(req)).render()));
pageRouter.get('/movies/:movieTitle', async (req, res) => res.send(await (new PageMovieInner(req)).render()));
pageRouter.get('/movies-by-category', async (req, res) => res.send(await (new PageCategories(req)).render()));
pageRouter.get('/movies-by-category/:categoryName', async (req, res) => res.send(await (new PageCategoryInner(req)).render()));

pageRouter.use('/', authRouter);
pageRouter.use('/admin', isAdmin, adminRouter);

pageRouter.get('*error', async (req, res) => res.send(await (new Page404(req)).render()));