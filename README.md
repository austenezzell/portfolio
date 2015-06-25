# Uno
Cinco's Gulp based starter kit

* [Gulp](http://gulpjs.com/)
* [SCSS](http://sass-lang.com/)
* [Bootstrap](http://getbootstrap.com/)
* [Font Awesome](http://fortawesome.github.io/Font-Awesome/)
* [Gridlover](http://www.gridlover.net/)
* [Velocity](http://julian.com/research/velocity/)

## Requirements
[NodeJS](http://nodejs.org/), [Gulp](http://gulpjs.com/), and [Bower](http://bower.io/)

## Installing
1. Install NodeJS by downloading it [here](http://nodejs.org/download/)

2. Install Gulp `sudo npm install -g gulp`

3. Install all the npm dependencies you need for Gulp from within your project folder. `npm install`

4. Install Bower `sudu npm install -g bower`

5. Install all the Bower dependencies you'll need. `bower install`

6. All done! You can now `gulp`.

## Usage
Use `gulp` for local development or `gulp build` for deployment to a staging or production environment.

## Bower
We're using Bower to manage vendor dependencies.

1. Find package name: http://bower.io/search/

2. Install package: bower install --save PACKAGENAME

Bower and Gulp take care of the rest. If in the rare case you need a plugin that isn't on Bower you can add it where appropriate, '/js/plugins.js' and/or within the project CSS.

## Folder structure
The development will be done in `/source/js/` and `/source/scss/` which then will be compiled/concatinated/minified into `/build/js` and `/build/css`.

## Sublime Text Project
If using Sublime Text, open 'uno.sublime-project' using Project > Open Project... from the Sublime Text menu. This hides the "build" and "node_modules" folders in the side bar and project searches.
