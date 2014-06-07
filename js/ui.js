// Remove all animations
function removeAnimations(el)
{
    for(var prop in _anims)
        if(_anims.hasOwnProperty(prop))
            el.classList.remove(_anims[prop]);
}

// Shows info page
function showInfo(el)
{
    if(_modelNames.showing !== null)
    {
        removeAnimations(_infos[_modelNames.showing]);
        _infos[_modelNames.showing].classList.add(_anims.centerToRight);
    }
    
    removeAnimations(el);
    el.classList.add(_anims.rightToCenter);
    removeAnimations(_dom.hideInfo);
    _dom.hideInfo.classList.add(_anims.fadeIn);
    disablePointerLock();
    _game.inGame = false;
}

// Hides info page
function hideInfo()
{
    if(_modelNames.showing !== null)
    {
        _game.inGame = true;
        removeAnimations(_infos[_modelNames.showing]);
        _infos[_modelNames.showing].classList.add(_anims.centerToRight);
        _modelNames.showing = null;
        removeAnimations(_dom.hideInfo);
        _dom.hideInfo.classList.add(_anims.fadeOut);
        enablePointerLock();
    }
}

// Shows start menu
function showStartMenu()
{
    hideInfo();
    removeAnimations(_dom.startMenu);
    _dom.startMenu.classList.add(_anims.upToCenter);
    _game.inGame = false;
}

// Hides start menu
function hideStartMenu()
{
    removeAnimations(_dom.startMenu);
    _dom.startMenu.classList.add(_anims.centerToUp);
    _game.inGame = true;
}