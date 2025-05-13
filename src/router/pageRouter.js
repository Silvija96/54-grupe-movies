import express from 'express';
import { PageHome } from '../pages/PageHome.js';
import { Page404 } from '../pages/Page404.js';
import { PageMovies } from '../pages/PageMovies.js';
import { PageCategories } from '../pages/PageCategories.js';
import { PageMovieInner } from '../pages/PageMovieInner.js';
import { PageRegister } from '../pages/PageRegister.js';
import { PageLogin } from '../pages/PageLogin.js';

export const pageRouter = express.Router();

pageRouter.get('/', (req, res) => res.send(new PageHome(req).render()));
pageRouter.get('/movies', (req, res) => res.send(new PageMovies(req).render()));
pageRouter.get('/movies/:movieTitle', (req, res) => res.send(new PageMovieInner(req).render()));
pageRouter.get('/movies-by-category', (req, res) => res.send(new PageCategories(req).render()));
pageRouter.get('/movies-by-category/:categoryName', (req, res) => res.send(new PageMovies(req).render()));

pageRouter.get('/register', (req, res) => res.send(new PageRegister(req).render()));
pageRouter.get('/login', (req, res) => res.send(new PageLogin(req).render()));

pageRouter.get('*error', (req, res) => res.send(new Page404(req).render()));