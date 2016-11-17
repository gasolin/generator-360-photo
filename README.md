# generator-360-photo [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Create a web based 360 photo scaffold with aframe, you can host it on github pages or any static web hosting


## Installation

First, install [Yeoman](http://yeoman.io) and generator-360-photo using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-360-photo
```

Create a folder with your panorama image. (Currently generator-360-photo only support jpg or png with equirectangular porjection, you can get the image from 360 cameras or apps like google streetview)

Enter the folder then generate your project:

```bash
yo 360-photo
```

360-photo generator will detect your image and generate the scaffold for web hosting this 360 photo.

## License

MIT © [gasolin](www.gasolin.idv.tw)


[npm-image]: https://badge.fury.io/js/generator-360-photo.svg
[npm-url]: https://npmjs.org/package/generator-360-photo
[travis-image]: https://travis-ci.org/gasolin/generator-360-photo.svg?branch=master
[travis-url]: https://travis-ci.org/gasolin/generator-360-photo
[daviddm-image]: https://david-dm.org/gasolin/generator-360-photo.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/gasolin/generator-360-photo
[coveralls-image]: https://coveralls.io/repos/gasolin/generator-360-photo/badge.svg
[coveralls-url]: https://coveralls.io/r/gasolin/generator-360-photo
