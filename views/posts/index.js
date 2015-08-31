'use strict';

import page from 'page';
import render from '../../lib/render';
import { Post, Posts } from '../../resources/post';

import listing from './list.html';
import detail from './detail.html';
import form from './form.html';

function load (ctx, next) {
  let post = new Post(ctx.params);
  ctx.post = post;
  post.fetch(next);
}

function list () {
  let posts = new Posts();
  posts.fetch((err, models) => {
    render('.content', listing, models);
  });
}

function show (ctx) {
  render('.content', detail, ctx.post.fields);
  let link = document.querySelector('.remove-post');
  link.addEventListener('click', remove.bind(ctx));
}

function edit (ctx) {
  render('.content', form, ctx.post.fields);
  let postForm = document.querySelector('.add-edit-post');
  postForm.addEventListener('submit', update.bind(ctx));
}

function update (e) {
  e.preventDefault();
  this.post.update(err => {
    if (err) return alert(err);
    page.redirect(this.post.resource);
  })
}

function remove (e) {
  e.preventDefault();
  if (!confirm('Are you sure?')) return;
  this.post.remove(err => {
    if (err) return alert(err);
    page.redirect('/posts');
  });
}

export default {
  load,
  list,
  show,
  edit
};
