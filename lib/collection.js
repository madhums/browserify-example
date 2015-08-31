'use strict';

// import assign from 'object-assign';
import base from './base';
import req from './req';

class Collection {

  constructor (Model, url, models) {
    this.Model = Model;
    this.resourceUrl = url ? url : '';
    this.models = models ? models : [];
    this.limit = 20;
    return this;
  }

  url () {
    return base.url + this.resourceUrl;
  }

  // toJson () {
  //   return this.models.map(model => model.fields);
  // }

  // add (model) {
  //   this.models.unshift(model);
  //   return this;
  // }

  // get size () {
  //   return this.models.length;
  // }

  fetch (cb) {
    this.fetching = true;
    return req.get(this.url(), this.fetched(cb));
  }

  fetched (cb) {
    delete this.fetching;
    return (err, collection) => {
      this.models = collection.map(model => {
        return new this.Model(model);
      }.bind(this));
      return cb.apply(this, [err, collection]);
    }.bind(this);
  }
}

export default Collection;
