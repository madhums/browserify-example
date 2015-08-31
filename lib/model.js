'use strict';

// import assign from 'object-assign';
import base from './base';
import req from './req';

const baseUrl = base.url;

class Model {

  constructor (fields, url) {
    this.fields = fields || {};
    this.resourceUrl = url ? url : '';
    this.primaryKey = 'id';
    return this;
  }

  url () {
    return baseUrl + this.resourceUrl;
  }

  // isNew () {
  //   return !!this.fields._id;
  // }

  get (field) {
    return this.fields[field];
  }

  set (field, value) {
    this.fields[field] = value;
    return this;
  }

  get resource () {
    return this.resourceUrl + '/' + this.fields[this.primaryKey];
  }

  fetch (cb) {
    this.fetching = true;
    return req.get(baseUrl + this.resource, this.fetched(cb));
  }

  save (cb) {
    this.fetching = true;
    return req.post(this.url(), this.fields, this.fetched(cb));
  }

  update (cb) {
    this.fetching = true;
    return req.put(baseUrl + this.resource, this.fields, this.fetched(cb));
  }

  remove (cb) {
    this.fetching = true;
    return req.del(baseUrl + this.resource, this.fetched(cb));
  }

  fetched (cb) {
    delete this.fetching;
    return (err, model) => {
      this.fields = model;
      return cb.apply(this, [err, model]);
    }.bind(this);
  }
}

export default Model;
