import express from 'express';
import { PageHome } from '../pages/PageHome.js';
import { Page404 } from '../pages/Page404.js';
import { PageMovies } from '../pages/PageMovies.js';
import { PageCategories } from '../pages/PageCategories.js';
import { PageMovieInner } from '../pages/PageMovieInner.js';
import { PageRegister } from '../pages/PageRegister.js';
import { PageLogin } from '../pages/PageLogin.js';
import { PageLogout } from '../pages/PageLogout.js';
import { PageCategoryInner } from '../pages/PageCategoryInner.js';
import { PageDashboard } from '../pages/PageDashboard.js';

export const pageRouter = express.Router();

pageRouter.get('/', async (req, res) => res.send(await (new PageHome(req)).render()));
pageRouter.get('/movies', async (req, res) => res.send(await (new PageMovies(req)).render()));
pageRouter.get('/movies/:movieTitle', async (req, res) => res.send(await (new PageMovieInner(req)).render()));
pageRouter.get('/movies-by-category', async (req, res) => res.send(await (new PageCategories(req)).render()));
pageRouter.get('/movies-by-category/:categoryName', async (req, res) => res.send(await (new PageCategoryInner(req)).render()));

pageRouter.get('/register', async (req, res) => res.send(await (new PageRegister(req)).render()));
pageRouter.get('/login', async (req, res) => res.send(await (new PageLogin(req)).render()));
pageRouter.get('/logout', async (req, res) => res.send(await (new PageLogout(req)).render()));

pageRouter.get('/dashboard', async (req, res) => res.send(await (new PageDashboard(req)).render()));

pageRouter.get('*error', async (req, res) => res.send(await (new Page404(req)).render()));