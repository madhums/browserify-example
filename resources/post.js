'use strict';

import Model from '../lib/model';
import Collection from '../lib/collection';

const resourceUrl = '/posts';

class Post extends Model {
  constructor (fields) {
    super(fields, resourceUrl);
  }
}

class Posts extends Collection {
  constructor (models) {
    super(Post, resourceUrl, models);
  }
}

export default {
  Post,
  Posts
};
