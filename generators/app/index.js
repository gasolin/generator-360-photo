'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-360-photo') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'imgPath',
      message: 'Where\'s your photo\'s path?',
      default: 'img/photo.jpg'
    }, {
      type: 'input',
      name: 'title',
      message: 'Enter your photo\'s title',
      default: '360 photo'
    }, {
      type: 'input',
      name: 'filename',
      message: 'Enter the file name',
      default: 'photo'
    }, {
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to create 360 photo scaffold in this folder?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      // done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_photo.html'),
      this.destinationPath(this.props.filename + '.html'), {
        imgPath: this.props.imgPath,
        title: this.props.title
      }
    );
    this.fs.copy(
      this.templatePath('img'),
      this.destinationPath('img')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
