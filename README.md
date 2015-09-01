## Browserify example

A CRUD application using browserify using ES6.

**Modules used**

- [page.js](https://github.com/visionmedia/page.js) (for routing)
- [superagent](https://github.com/visionmedia/superagent) (for requests)

## Installation

1. Fork and clone the repo
2. Run

  ```
  npm install
  ```

## Usage

```sh
$ gulp
```

- Will watch changes to `app.js` using [browserify](http://browserify.org) and [watchify](https://github.com/substack/watchify)
- It will start serving `./index.html` using [browser-sync](http://www.browsersync.io)
- It will create the compiled files in `./dist`.
- The compiled file contain sourcemaps (`app-dev.js` and `app-dev.js.map`)
- If any files are changed, they are reloaded using browser-sync.

## Tasks

```sh
$ gulp build
```

- This will create the compiled files and put it under `./dist`.
- It includes the sourcemaps (`app.js` and `app.js.map`)
- Does the same as what watch does


```sh
$ gulp minify
```

- Will minify the files and put it in `./dist`. Also includes sourcemaps.


```sh
$ gulp psi
```

- Runs the [pagespeed insights](https://developers.google.com/speed/pagespeed/insights/) using [ngrok](https://ngrok.com)


Usage:

Clone the repo and

```sh
$ npm install
$ gulp
```

## Todo

- Add LESS/SASS support and minification
- Add S3 deploy
- Improve asset management
- Support for different environments
