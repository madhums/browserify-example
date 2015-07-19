
Gulp + browserify + browser-sync + ES6 + babel + pagespeed insights + (hello) React

```sh
$ gulp
```

- Will watch changes to `app.js` using [browserify](http://browserify.org) and [watchify](https://github.com/substack/watchify)
- It will start serving `./index.html` using [browser-sync](http://www.browsersync.io)
- It will create the compiled files in `./dist`.
- The compiled file contain sourcemaps (`app-dev.js` and `app-dev.js.map`)
- If any files are changed, they are reloaded using browser-sync.


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


Why did I make it?

> I wasn't very happy with the starter boilerplates available, so I made one myself. The most useful is the gulp file. Every time I start a new project I spend half a day setting things up. Hope this helps anyone else.

What is hakata?

> Last year I was in Estonia and I learnt this word which means "to start" :P


Further plans:

- Add LESS/SASS support and minification
- Add S3 deploy
- Improve asset management
- Support for different environments
