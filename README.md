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

## Change default view orientation

You can change default view orientation to better present the view you want visitors to see at first.

Edit the [rotation](https://aframe.io/docs/0.3.0/components/rotation.html) attribute in `a-sky` tag to specify the orientation of the photo.

```
<a-sky src="#img" rotation="0 0 0"></a-sky>
```

The 3 values in `rotation` are the roll (x), pitch (y), and yaw (z).
My suggestion is DO NOT edit the first value (roll), it will change the default horizontal, which makes navigation weired.

## Enhancement

The scaffold is fully based on [aframe](https://aframe.io/), the web framework for builing VR experience. 
You can refer aframe to move your 360 photo to the new level.

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
