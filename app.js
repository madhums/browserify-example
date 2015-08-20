'use strict';

/**
 * App
 */

import React from 'react';
import Hello from './components/Hello/Hello';

let hello = new Hello('there!');

React.render(
  <h1>{ hello.say() }</h1>,
  document.getElementById('app')
);
