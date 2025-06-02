import express from 'express';

import { PageDashboard } from '../pages/admin/PageDashboard.js';
import { PageAdminCategories } from '../pages/admin/PageCategoriesAll.js';
import { PageAdminMovies } from '../pages/admin/PageMoviesAll.js';
import { PageAdminCategoryNew } from '../pages/admin/PageCategoryNew.js';
import { PageAdminMovieNew } from '../pages/admin/PageMovieNew.js';
import { PageAdminMovieInner } from '../pages/admin/PageMovieInner.js';
import { PageAdminCategoriesDraft } from '../pages/admin/PageCategoriesDraft.js';
import { PageAdminCategoriesPublished } from '../pages/admin/PageCategoriesPublished.js';
import { PageAdminMoviesPublished } from '../pages/admin/PageMoviesPublished.js';
import { PageAdminMoviesDraft } from '../pages/admin/PageMoviesDraft.js';
import { PageAdminCategoryEdit } from '../pages/admin/PageCategoryEdit.js';

export const adminRouter = express.Router();

adminRouter.get('/', async (req, res) => res.send(await (new PageDashboard(req)).render()));

adminRouter.get('/categories', async (req, res) => res.send(await (new PageAdminCategories(req)).render()));
adminRouter.get('/categories/new', async (req, res) => res.send(await (new PageAdminCategoryNew(req)).render()));
adminRouter.get('/categories/published', async (req, res) => res.send(await (new PageAdminCategoriesPublished(req)).render()));
adminRouter.get('/categories/draft', async (req, res) => res.send(await (new PageAdminCategoriesDraft(req)).render()));
// adminRouter.get('/categories/:urlSlug', async (req, res) => res.send(await (new PageAdminCategoryEdit(req)).render()));
adminRouter.get('/categories/:urlSlug/edit', async (req, res) => res.send(await (new PageAdminCategoryEdit(req)).render()));

adminRouter.get('/movies', async (req, res) => res.send(await (new PageAdminMovies(req)).render()));
adminRouter.get('/movies/new', async (req, res) => res.send(await (new PageAdminMovieNew(req)).render()));
adminRouter.get('/movies/published', async (req, res) => res.send(await (new PageAdminMoviesPublished(req)).render()));
adminRouter.get('/movies/draft', async (req, res) => res.send(await (new PageAdminMoviesDraft(req)).render()));
// adminRouter.get('/movies/:urlSlug', async (req, res) => res.send(await (new PageAdminMovieInner(req)).render()));
// adminRouter.get('/movies/:urlSlug/edit', async (req, res) => res.send(await (new PageAdminMovieInner(req)).render()));