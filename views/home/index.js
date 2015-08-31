'use strict';

import render from '../../lib/render';
import template from './home.html';

function home () {
  render('.content', template, {});
}

export default home;
