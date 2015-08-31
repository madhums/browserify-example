'use strict';

import Handlebars from 'handlebars';

/**
 * Render
 *
 * options = {
 *   template: 'handlebars template',
 *   selector: 'dom query selector',
 *   data: {}
 * }
 */

function render (selector, template, data) {
  data = data || {};
  let parsed = Handlebars.compile(template);
  document.querySelector(selector).innerHTML = parsed(data);
}

export default render;
