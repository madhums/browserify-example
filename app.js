'use strict';

/**
 * App
 */

import page from 'page';
import posts from './views/posts';
import home from './views/home';

// Home

page('/', home);

// Posts

page('/posts', posts.list);
page('/posts/:id', posts.load, posts.show);
page('/posts/:id/edit', posts.load, posts.edit);

page('*', function () {
  document.querySelector('.content').textContent = 'Not found';
});

page();
