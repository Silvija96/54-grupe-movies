import { genre } from "./genre.js";

export const moviesData = [
    {
        thumbnail: 'the-matrix.jpg',
        title: 'The Matrix',
        slug: 'the-matrix',
        description: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
        durationInMinutes: 2 * 60 + 16,
        category: genre.action,
    },
    {
        thumbnail: 'blade-runner.jpg',
        title: 'Blade Runner 2049',
        slug: 'blade-runner-2049',
        description: 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who\'s been missing for thirty years.',
        durationInMinutes: 2 * 60 + 44,
        category: genre.action,
    },
    {
        thumbnail: 'toy-story.jpg',
        title: 'Toy Story',
        slug: 'toy-story',
        description: 'A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy\'s bedroom.',
        durationInMinutes: 60 + 21,
        category: genre.animation,
    },
    {
        thumbnail: 'nemo.jpg',
        title: 'Finding Nemo',
        slug: 'finding-nemo',
        description: 'After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.',
        durationInMinutes: 60 + 40,
        category: genre.animation,
    },
];