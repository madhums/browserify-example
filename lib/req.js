'use strict';

import request from 'superagent';

function get (url, cb) {
  return request
    .get(url)
    .end((err, res) => {
      if (err) return cb(err);
      cb(err, res.body);
    });
}

function post (url, data, cb) {
  return request
    .post(url)
    .send(data)
    .end((err, res) => {
      if (err) return cb(err);
      cb(err, res.body);
    });
}

function put (url, data, cb) {
  return request
    .put(url)
    .send(data)
    .end((err, res) => {
      if (err) return cb(err);
      cb(err, res.body);
    });
}

function del (url, cb) {
  return request
    .del(url)
    .end((err, res) => {
      if (err) return cb(err);
      cb(err, res.body);
    });
}

export default {
  get,
  post,
  put,
  del
};
