
# Simple React TypeScript Starter

This project demonstrates a simple TypeScript based React project with a Gulp build.

The gulpfile is intentionally simple.
However, it uses modern tooling and can be used as the basis for a real project.
The build generates a browserified client file which is separate from the vendor file.
The vendor file currently includes react and react-dom.
This separation speeds up the build process and can result in fewer client downloads when new builds are released.
The gulp build process also works with gulp.watch.

# Usage

You'll need a few frameworks and utilities to be installed globally before starting.

## Prerequisites

You'll need the following prior to setup:

* [Node.js](https://nodejs.org/)
* [TypeScript](http://www.typescriptlang.org/)
* [Gulp](http://gulpjs.com/)

TypeScript and Gulp can be installed using npm.

```
> npm install -g typescript
> npm install -g gulp
```

## Setup

### Install Node modules

This will get all the packages required for development and run time,
as defined in the `package.json` file.

```
> npm install
```

## Build

To run a full build, just run gulp with no arguments.

```
> gulp
```

## Development

Run watch and keep the console open.

```
> gulp watch
```

Gulp will automatically rebuild when a source file changes.

## Running

Start a local [Express](https://expressjs.com/) server using `npm` or `node`.

```
> npm start
```

Then open a browser and navigate to http://localhost:3000 to view.

## Reloading

You can also run the server with automatic reloading using [BrowserSync](https://www.browsersync.io/).

```
> gulp serve
```

This combines features of running a node Express server and using gulp watch.

## Related

A more complete starter project can be found at [react-tsx-starter](https://github.com/toddlucas/react-tsx-starter).

## License

[MIT](https://github.com/toddlucas/react-tsx-lite/blob/master/LICENSE)
