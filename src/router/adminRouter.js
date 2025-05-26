import express from 'express';

import { PageDashboard } from '../pages/admin/PageDashboard.js';
import { PageAdminCategories } from '../pages/admin/PageCategories.js';
import { PageAdminMovies } from '../pages/admin/PageMovies.js';
import { PageAdminNewCategory } from '../pages/admin/PageNewCategory.js';
import { PageAdminNewMovie } from '../pages/admin/PageNewMovie.js';
import { PageAdminMovieInner } from '../pages/admin/PageMovieInner.js';

export const adminRouter = express.Router();

adminRouter.get('/', async (req, res) => res.send(await (new PageDashboard(req)).render()));

adminRouter.get('/categories', async (req, res) => res.send(await (new PageAdminCategories(req)).render()));
adminRouter.get('/categories/new', async (req, res) => res.send(await (new PageAdminNewCategory(req)).render()));
adminRouter.get('/categories/published', async (req, res) => res.send(await (new PageAdminNewCategory(req)).render()));
adminRouter.get('/categories/draft', async (req, res) => res.send(await (new PageAdminNewCategory(req)).render()));
adminRouter.get('/categories/:urlSlug', async (req, res) => res.send(await (new PageAdminNewCategory(req)).render()));
adminRouter.get('/categories/:urlSlug/edit', async (req, res) => res.send(await (new PageAdminNewCategory(req)).render()));

adminRouter.get('/movies', async (req, res) => res.send(await (new PageAdminMovies(req)).render()));
adminRouter.get('/movies/new', async (req, res) => res.send(await (new PageAdminNewMovie(req)).render()));
adminRouter.get('/movies/published', async (req, res) => res.send(await (new PageAdminNewMovie(req)).render()));
adminRouter.get('/movies/draft', async (req, res) => res.send(await (new PageAdminNewMovie(req)).render()));
adminRouter.get('/movies/:urlSlug', async (req, res) => res.send(await (new PageAdminMovieInner(req)).render()));
adminRouter.get('/movies/:urlSlug/edit', async (req, res) => res.send(await (new PageAdminMovieInner(req)).render()));