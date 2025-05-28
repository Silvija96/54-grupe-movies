export const adminSidebarData = [
    {
        type: 'ul',
        list: [
            { href: '/', text: 'Dashboard' },
        ],
    },
    {
        type: 'h6',
        text: 'Categories',
    },
    {
        type: 'ul',
        list: [
            { href: '/categories/new', text: 'Add new' },
            { href: '/categories', text: 'All categories' },
            { href: '/categories/published', text: 'Published categories' },
            { href: '/categories/draft', text: 'Draft categories' },
        ],
    },
    {
        type: 'h6',
        text: 'Movies',
    },
    {
        type: 'ul',
        list: [
            { href: '/movies/new', text: 'Add new' },
            { href: '/movies', text: 'All movies' },
            { href: '/movies/published', text: 'Published movies' },
            { href: '/movies/draft', text: 'Draft movies' },
        ],
    },
    {
        type: 'hr',
    },
    {
        type: 'ul',
        list: [
            { href: '/settings', text: 'Settings' },
        ],
    },
];