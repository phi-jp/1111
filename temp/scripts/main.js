/*
 * main.js
 */


/*
 * global
 */
var app = null;



/*
 * main
 */
tm.main(function() {
    app = tm.display.CanvasApp("#world");
    app.fps = FRAME_RATE;
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
    app.fitWindow();
    app.enableStats();
    app.fps = 30;
    
    var loading = tm.ui.LoadingScene({
        assets: ASSETS,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    });
    loading.onload = function() {
        // タイトルシーン生成
        var titleScene = TitleScene();
        app.replaceScene(titleScene);
    };
    app.replaceScene(loading);
    
    
    app.run();
});



/*
 * タイトルシーン
 */
tm.define("TitleScene", {
    superClass: tm.app.Scene,
    
    init: function() {
        this.superInit();
        
        // tm.asset.Manager.get("bgm_title").clone().play();
        
        this.stage = tm.display.CanvasElement().addChildTo(this);
        
        this.stage.fromJSON({
            children: {
                "titleLabel": {
                    type: "tm.display.Label",
                    text: "1111",
                    fontSize: 200,
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y-150,
                    fontFamily: "'Freckle Face', cursive",
                    alpha: 0,
                },
                "msgLabel": {
                    type: "tm.display.Label",
                    text: "~ only tap ~",
                    fontSize: 48,
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y+150,
                    fontFamily: "'Freckle Face', cursive",
                    alpha: 0,
                },
            }
        });
        
        this.stage.titleLabel.tweener
            .wait(1000)
            .fadeIn(2000)
            .call(function() {
                this.stage.msgLabel.tweener.clear()
                    .set({alpha:0.5})
                    .fadeIn(2000)
                    .setLoop(true);
            }.bind(this))
    },
    
    onpointingstart: function() {
        this.onpointingstart = null;
        
        this.close();
    },
    
    close: function() {
        this.stage.tweener.fadeOut(2000).call(function() {
            this.app.replaceScene(MainScene());
        }.bind(this));
    },
});



/*
 * タイトルシーン
 */
tm.define("MainScene", {
    superClass: tm.app.Scene,
    
    init: function() {
        this.superInit();
        
        this.stage = tm.display.CanvasElement().addChildTo(this);
        
        this.stage.fromJSON({
            children: {
                "tapLabel": {
                    type: "tm.display.Label",
                    text: "0",
                    fontSize: 200,
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y,
                    fontFamily: "'Freckle Face', cursive",
                },
                "timeLabel": {
                    type: "tm.display.Label",
                    text: "0",
                    fontSize: 32,
                    x: SCREEN_CENTER_X,
                    y: 80,
                    fontFamily: "'Freckle Face', cursive",
                },
            }
        });
        
        this.tapCount = 0;
        
        this.startTime = new Date();
    },
    
    update: function() {
        var time = (new Date())-this.startTime;
        
        this.stage.timeLabel.text = "Time : " + (time)/1000;
    },
    
    onpointingstart: function() {
        ++this.tapCount;
        this.stage.tapLabel.text = this.tapCount;
        
//        tm.asset.Manager.get("se_tap").clone().play();
        
        if (this.tapCount >= 1111) {
            this.update = null;
            this.onpointingstart = null;
            this.close();
        }
    },
    
    close: function() {
        var time = ((new Date())-this.startTime)/1000;
        this.stage.tweener.fadeOut(1000).call(function() {
            this.app.replaceScene(ResultScene(time));
        }.bind(this));
    },
    
});




/*
 * タイトルシーン
 */
tm.define("ResultScene", {
    superClass: tm.app.Scene,
    
    init: function(time) {
        this.superInit();
        
        time = time ||123.456;
        this.stage = tm.display.CanvasElement().addChildTo(this);
        
        this.fromJSON({
            children: {
                "timeLabel": {
                    type: "tm.display.Label",
                    text: "Time: " + (time),
                    fontSize: 64,
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y-100,
                    fontFamily: "'Freckle Face', cursive",
                },
                "tweetLabel": {
                    type: "tm.display.Label",
                    text: "tweet",
                    fontSize: 64,
                    fillStyle: "#9ef",
                    x: SCREEN_CENTER_X-150,
                    y: SCREEN_CENTER_Y+100,
                    width: 100,
                    height: 50,
                    fontFamily: "'Freckle Face', cursive",
                },
                "backLabel": {
                    type: "tm.display.Label",
                    text: "back",
                    fontSize: 64,
                    fillStyle: "#aaa",
                    x: SCREEN_CENTER_X+150,
                    y: SCREEN_CENTER_Y+100,
                    width: 100,
                    height: 50,
                    fontFamily: "'Freckle Face', cursive",
                },
                
            }
        });
        
        this.backLabel.setInteractive(true);
        this.backLabel.one("pointingstart", function() {
            this.close();
        }.bind(this));
        
        var twitterURL = this.tweetURL = tm.social.Twitter.createURL({
            type    : "tweet",
            text    : "`Time: {0}`".format(time),
            hashtags: "1111,tmlib",
            via     : "phi_jp",
            url     : "http://phi-jp.github.io/1111",
        });
        this.tweetLabel.setInteractive(true);
        this.tweetLabel.onclick = function() {
            window.open(twitterURL);
        };
    },
    
    close: function() {
        this.app.replaceScene(TitleScene());
    }
});

