function CInterface(iCurBet,iTotBet,iMoney){
    var _aLinesBut;
    var _aPayline;
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosFullscreen;
    
    var _oButExit;
    var _oSpinBut;
    var _oInfoBut;
    var _oAddLineBut;
    var _oAudioToggle;
    var _oBetCoinBut;
    var _oMaxBetBut;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    

    var _oCoinText;
    var _oMoneyText;
    var _oTotalBetText;
    var _oNumLinesText;
    
    this._init = function(iCurBet,iTotBet,iMoney){
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x:CANVAS_WIDTH - (oSprite.width/2) - 10,y:(oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x,_pStartPosExit.y,oSprite,true);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSpriteAudio = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: _oButExit.getX() - oSpriteAudio.width/2, y: (oSprite.height/2) + 10};  
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSpriteAudio,s_bAudioActive,s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            _pStartPosFullscreen = {x:_pStartPosAudio.x - oSpriteAudio.width/2,y:_pStartPosAudio.y};
        }else{
            _pStartPosFullscreen = {x: _oButExit.getX() - oSprite.width, y: (oSprite.height/2) + 10};  
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        oSprite = s_oSpriteLibrary.getSprite('spin_but');
        _oSpinBut = new CTextButton(1090 + (oSprite.width/2),CANVAS_HEIGHT - (oSprite.height/2),oSprite,"",FONT_GAME,"#ffde00",22,s_oStage);  
        _oSpinBut.addEventListener(ON_MOUSE_UP, this._onSpin, this);
        
        
        oSprite = s_oSpriteLibrary.getSprite('info_but');
        _oInfoBut = new CTextButton(328 + (oSprite.width/2),CANVAS_HEIGHT - (oSprite.height/2),oSprite,TEXT_INFO,FONT_GAME,"#ffffff",30,s_oStage);        
        _oInfoBut.addEventListener(ON_MOUSE_UP, this._onInfo, this);
        
        
        oSprite = s_oSpriteLibrary.getSprite('but_lines_bg');
        _oAddLineBut = new CTextButton(494 + (oSprite.width/2),CANVAS_HEIGHT - (oSprite.height/2),oSprite,TEXT_LINES,FONT_GAME,"#ffffff",30,s_oStage);
        _oAddLineBut.addEventListener(ON_MOUSE_UP, this._onAddLine, this);
        
        
        _oNumLinesText = new CTLText(s_oStage, 
                    494, CANVAS_HEIGHT - 86, oSprite.width, 26, 
                    26, "center", "#ffffff", FONT_GAME, 1,
                    0, 0,
                    NUM_PAYLINES,
                    true, true, false,
                    false);
        _oNumLinesText.setShadow("#000", 2, 2, 2);
        
        
        oSprite = s_oSpriteLibrary.getSprite('coin_but');
        _oBetCoinBut = new CTextButton(680 + (oSprite.width/2),CANVAS_HEIGHT - (oSprite.height/2),oSprite,TEXT_COIN,FONT_GAME,"#ffffff",30,s_oStage);
        _oBetCoinBut.addEventListener(ON_MOUSE_UP, this._onBet, this);
        
        _oCoinText = new CTLText(s_oStage, 
                    680, CANVAS_HEIGHT - 86, oSprite.width, 26, 
                    26, "center", "#ffffff", FONT_GAME, 1,
                    0, 0,
                    iCurBet.toFixed(2),
                    true, true, false,
                    false);
                    

        _oCoinText.setShadow("#000", 2, 2, 2);

        
        oSprite = s_oSpriteLibrary.getSprite('but_maxbet_bg');
        _oMaxBetBut = new CTextButton(866 + (oSprite.width/2),CANVAS_HEIGHT - (oSprite.height/2),oSprite,TEXT_MAX_BET,FONT_GAME,"#ffffff",30,s_oStage);
        _oMaxBetBut.addEventListener(ON_MOUSE_UP, this._onMaxBet, this);
		
                
        _oTotalBetText = new CTLText(s_oStage, 
                    866, CANVAS_HEIGHT - 86, oSprite.width, 26, 
                    26, "center", "#ffffff", FONT_GAME, 1,
                    0, 0,
                    TEXT_BET +": "+iTotBet.toFixed(2),
                    true, true, false,
                    false);
                    

        _oTotalBetText.setShadow("#000", 2, 2, 2);
        
        
	_oMoneyText = new CTLText(s_oStage, 
                    349, 22, oSprite.width-20, 60, 
                    60, "center", "#ffde00", FONT_GAME, 1,
                    0, 0,
                    TEXT_MONEY +"\n"+iMoney.toFixed(2)+ TEXT_CURRENCY,
                    true, true, true,
                    false);


        
        
        oSprite = s_oSpriteLibrary.getSprite('bet_but');
        _aLinesBut = new Array();
        
        //LINE 1
        var oBut = new CBetBut( 334 + oSprite.width/2, 282 + oSprite.height/2);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,1);
        _aLinesBut[0] = oBut;
        
        //LINE 2
        oBut = new CBetBut( 334 + oSprite.width/2, 180 + oSprite.height/2);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,2);
        _aLinesBut[1] = oBut;
        
        //LINE 3
        oBut = new CBetBut( 334 + oSprite.width/2, 432 + oSprite.height/2);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,3);
        _aLinesBut[2] = oBut;
        
        //LINE 4
        oBut = new CBetBut( 334 + oSprite.width/2, 114 + oSprite.height/2);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,4);
        _aLinesBut[3] = oBut;

        //LINE 5
        oBut = new CBetBut( 334 + oSprite.width/2, 502 + oSprite.height/2);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,5);
        _aLinesBut[4] = oBut;

        _aPayline = new Array();
        for(var k = 0;k<NUM_PAYLINES;k++){
            var oBmp = new createjs.Bitmap(s_oSpriteLibrary.getSprite('payline_'+(k+1) ));
            oBmp.visible = false;
            s_oStage.addChild(oBmp);
            _aPayline[k] = oBmp;
        }
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButExit.unload();
        _oButExit = null;
        _oSpinBut.unload();
        _oSpinBut = null;
        _oInfoBut.unload();
        _oInfoBut = null;
        _oAddLineBut.unload();
        _oAddLineBut = null;
        _oBetCoinBut.unload();
        _oBetCoinBut = null;
        _oMaxBetBut.unload();
        _oMaxBetBut = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        
        for(var i=0;i<NUM_PAYLINES;i++){
            _aLinesBut[i].unload();
        }
        
        s_oStage.removeAllChildren();
        s_oInterface = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX,_pStartPosFullscreen.y + iNewY);
        }
        
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
    };

    this.refreshMoney = function(iMoney){
        _oMoneyText.refreshText(TEXT_MONEY +"\n"+iMoney.toFixed(2) + TEXT_CURRENCY);
    };
    
    this.refreshBet = function(iBet){
        _oCoinText.refreshText(iBet.toFixed(2));
    };
    
    this.refreshTotalBet = function(iTotBet){
        _oTotalBetText.refreshText(TEXT_BET +": "+iTotBet.toFixed(2));
    };
    
    this.refreshNumLines = function(iLines){
        _oNumLinesText.refreshText(iLines);
        
        for(var i=0;i<NUM_PAYLINES;i++){
            if(i<iLines){
                _aLinesBut[i].setOn();
                _aPayline[i].visible = true;
            }else{
                _aLinesBut[i].setOff();
            }
        }
        
        setTimeout(function(){for(var i=0;i<NUM_PAYLINES;i++){
            _aPayline[i].visible = false;
        }},1000);
    };
    
    this.resetWin = function(){
        _oSpinBut.changeText("");
    };
    
    this.refreshWinText = function(iWin){
        _oSpinBut.changeText(TEXT_WIN + "\n"+iWin.toFixed(2));
    };
    
    this.showLine = function(iLine){
        _aPayline[iLine-1].visible = true;
    };
    
    this.hideLine = function(iLine){
        _aPayline[iLine-1].visible = false;
    };
    
    this.hideAllLines = function(){
        for(var i=0;i<NUM_PAYLINES;i++){
            _aPayline[i].visible = false;
        }
    };
    
    this.disableBetBut = function(bDisable){
        for(var i=0;i<NUM_PAYLINES;i++){
            _aLinesBut[i].disable(bDisable);
        }
    };
    
    this.enableGuiButtons = function(){
        _oSpinBut.enable();
        _oMaxBetBut.enable();
        _oBetCoinBut.enable();
        _oAddLineBut.enable();
        _oInfoBut.enable();
    };
	
    this.enableSpin = function(){
            _oSpinBut.enable();
            _oMaxBetBut.enable();
    };

    this.disableSpin = function(){
            _oSpinBut.disable();
            _oMaxBetBut.disable();
    };
    
    this.enableMaxBet = function(){
        _oMaxBetBut.enable();
    };
    
    this.disableMaxBet = function(){
        _oMaxBetBut.disable();
    };
    
    this.disableGuiButtons = function(){
        _oSpinBut.disable();
        _oMaxBetBut.disable();
        _oBetCoinBut.disable();
        _oAddLineBut.disable();
        _oInfoBut.disable();
    };
    
    this._onBetLineClicked = function(iLine){
        this.refreshNumLines(iLine);
        
        s_oGame.activateLines(iLine);
    };
    
    this._onExit = function(){
        s_oGame.onExit();  
    };
    
    this._onSpin = function(){
        s_oGame.onSpin();
    };
    
    this._onAddLine = function(){
        s_oGame.addLine();
    };
    
    this._onInfo = function(){
        s_oGame.onInfoClicked();
    };
    
    this._onBet = function(){
        s_oGame.changeCoinBet();
    };
    
    this._onMaxBet = function(){
        s_oGame.onMaxBet();
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.isEnabled){
		_oButFullscreen.setActive(s_bFullscreen);
	}
    };


    this._onFullscreenRelease = function(){
	if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    s_oInterface = this;
    
    this._init(iCurBet,iTotBet,iMoney);
    
    return this;
}

var s_oInterface = null;