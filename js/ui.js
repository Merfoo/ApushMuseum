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
    hideCrosshair();
}

// Hides info page
function hideInfo()
{
    if(_modelNames.showing !== null)
    {
        removeAnimations(_infos[_modelNames.showing]);
        _infos[_modelNames.showing].classList.add(_anims.centerToRight);
        _modelNames.showing = null;
        removeAnimations(_dom.hideInfo);
        _dom.hideInfo.classList.add(_anims.fadeOut);
        enablePointerLock();
        showCrosshair();
    }
}

// Shows start menu
function showStartMenu()
{
    hideInfo();
    hideCrosshair();
    disablePointerLock();
    removeAnimations(_dom.startMenu);
    _dom.startMenu.classList.add(_anims.upToCenter);
}

// Hides start menu
function hideStartMenu()
{
    showCrosshair();
    removeAnimations(_dom.startMenu);
    _dom.startMenu.classList.add(_anims.centerToUp);
}

// Shows crosshair
function showCrosshair()
{
    removeAnimations(_dom.crosshair);
    _dom.crosshair.classList.add(_anims.fadeIn);
}

// Hides crosshair
function hideCrosshair()
{
    removeAnimations(_dom.crosshair);
    _dom.crosshair.classList.add(_anims.fadeOut);
}

// Shows loading
function hideLoading()
{
    removeAnimations(_dom.loadingMenu);
    _dom.loadingMenu.classList.add(_anims.centerToLeft);
}