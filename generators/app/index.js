'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var path = require('path');
var sanitize = require('sanitize-filename');
var sharp = require('sharp');
var glob = require('glob');
var exif = null;
try {
  exif = require('exif-reader');
} catch (err) {
  console.log(chalk.green('production mode'));
}

module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.yellow('generator-360-photo') + ' generator!'
    ));

    this.log('finding photos in this folder...');

    glob('**/*.{jpg,png}', (er, files) => {
      // photos in img/ folder are generated
      var filtered = files.filter(path => {
        return !path.startsWith('img/');
      });
      var prompts = this._buildPromps(filtered);
      return this.prompt(prompts).then(props => {
        // To access props later use this.props.someAnswer;
        this.props = props;
        done();
      });
    });
  },

  _buildPromps: function (photos) {
    var questions = [];
    if (photos) { // show list when there're some photos in the folder
      questions.push({
        type: 'list',
        name: 'imgPath',
        message: 'Where\'s your photo\'s path?',
        choices: photos
      });
    } else { // let user manually input a photo path
      questions.push({
        type: 'list',
        name: 'imgPath',
        message: 'Where\'s your photo\'s path?',
        default: 'photo.jpg',
        validate: function (path) {
          var valid = false;
          try {
            fs.accessSync(path, fs.F_OK);
            valid = true;
          } catch (e) {
            // It isn't accessible
          }
          return valid || 'Please enter a valid path';
        }
      });
    }

    // title
    questions.push({
      type: 'input',
      name: 'title',
      message: 'Enter your photo\'s title',
      default: '360 photo',
      store: true
    });

    // file name
    questions.push({
      type: 'input',
      name: 'filename',
      message: 'Enter the file name',
      default: 'photo',
      store: true
    });

    // embedded
    questions.push({
      type: 'confirm',
      name: 'embedded',
      message: 'Would you embed this photo within a iframe?',
      default: true,
      store: true
    });

    // start create
    questions.push({
      type: 'confirm',
      name: 'doubleConfirm',
      message: 'Would you like to create 360 photo scaffold in this folder?',
      default: true
    });

    return questions;
  },

  writing: function () {
    if (!this.props.doubleConfirm) {
      return;
    }
    // create img folder if not exist
    var dir = 'img';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    var filename = path.basename(this.props.imgPath);
    var optimizedImgPath = [dir, filename].join('/');
    var image = sharp(this.props.imgPath);

    var embedded = '';
    var resize = 2048;
    this.log(chalk.yellow(`processing image...`));
    image.metadata().then(metadata => {
      if (exif) {
        var meta = exif(metadata.exif);
        this.log(meta);
      }
      // only resize image when in embedded mode
      if (this.props.embedded) {
        embedded = ' embedded';
        var size = metadata.width > resize ? resize : metadata.width;
        this.log(chalk.yellow(`Resize image width from ${metadata.width} to ${size}`));

        this._optimize(image, optimizedImgPath, size);
      } else {
        this.log(chalk.yellow(`Image size is ${metadata.width}x${metadata.height}`));
        this._optimize(image, optimizedImgPath, 0);
      }
      this.log(chalk.yellow(`Image is optimized and copied to ${optimizedImgPath}`));
    });

    this.fs.copyTpl(
      this.templatePath('_photo.html'),
      this.destinationPath(sanitize(this.props.filename).replace(' ', '-') + '.html'), {
        imgPath: optimizedImgPath,
        title: this.props.title,
        embedded: embedded
      }
    );
  },

  /**
   * wrap sharp apis.
   * http://sharp.dimens.io/en/stable/api/
   *
   * @params src {string} image source path
   * @params dst {string} image destination path
   * @params resizing {number} target width after resize
   */
  _optimize: function (src, dst, resizing = 0) {
    if (resizing === 0) {
      src
        .quality(90)
        .trellisQuantisation()
        .overshootDeringing()
        .optimizeScans()
        .toFile(dst);
    } else {
      src
        .resize(resizing)
        .quality(90)
        .trellisQuantisation()
        .overshootDeringing()
        .optimizeScans()
        .toFile(dst);
    }
  },

  install: function () {
    // this.installDependencies();
  },

  end: function () {
    if (this.props.doubleConfirm) {
      this.log(chalk.yellow('All done, see you later.'));
    } else {
      this.log(chalk.yellow('No change is made. See you later.'));
    }
  }
});
