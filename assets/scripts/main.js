/*
 *
 */

phina.globalize();

/*
 * constant.js
 */
var SCREEN_WIDTH    = 640;              // スクリーン幅
var SCREEN_HEIGHT   = 960;              // スクリーン高さ


var ASSETS = {
  sound: {
    bgm: './assets/sounds/bgm.mp3',
    tap: './assets/sounds/tap.wav',
  },
  font: {
    FreckleFace: './assets/fonts/Freckle-Face/Freckle-Face.ttf.woff',
  },
};

phina.main(function() {
  var app = GameApp({
    title: '1111',
    startLabel: location.search.substr(1).toObject().scene || 'title',
    assets: ASSETS,
  });
  document.body.appendChild( app.domElement );

  app.backgroundColor = 'black';
  app.enableStats();

  app.run();
});


phina.define('TitleScene', {
  superClass: 'CanvasScene',

  init: function() {
    this.superInit();

    this.fromJSON({
      children: {
        title: {
          className: 'Label',
          arguments: {
            text: '1111',
            color: 'red',
            fontSize: 200,
            fontFamily: 'FreckleFace',
          },
          x: this.gridX.center(),
          y: this.gridY.center(-2),
        },
        guide: {
          className: 'Label',
          arguments: {
            text: '~ only tap ~',
            color: 'red',
            fontSize: 48,
            fontFamily: 'FreckleFace',
          },
          x: this.gridX.center(),
          y: this.gridY.center(2),
        },
      }
    })
  },
});

