// Handle key up event
function keyUpEvent(e)
{
    switch(e.keyCode)
    {
        case _keyCodes.w:
            _keys.forward = false;
            break;
            
        case _keyCodes.s:
            _keys.backward = false;
            break;
            
        case _keyCodes.a:
            _keys.left = false;
            break;
            
        case _keyCodes.d:
            _keys.right = false;
            break;
        
        case _keyCodes.esc:
            showStartMenu();
            break;
            
        case _keyCodes.enter:
            initGame();
            break;
    }
}

// Handle key down event
function keyDownEvent(e)
{
    switch(e.keyCode)
    {
        case _keyCodes.w:
            _keys.forward = true;
            break;
            
        case _keyCodes.s:
            _keys.backward = true;
            break;
            
        case _keyCodes.a:
            _keys.left = true;
            break;
            
        case _keyCodes.d:
            _keys.right = true;
            break;
    }
}

// Handle click event
function mouseClickEvent(e)
{
    var picked = _scene.pick(_screen.width / 2, _screen.height / 2);
    
    if(picked.hit)
    {
        switch(picked.pickedMesh.id)
        {
            case _modelNames.littleBoy:
            case _modelNames.fatMan:
            case _modelNames.enolaGay:
                showInfo(_infos[picked.pickedMesh.id]);
                _modelNames.showing = picked.pickedMesh.id;
                break;
        }
    }
}

// Handles mouse move event
function mouseMoveEvent(e)
{
    if(_mouse.pointerLocked)
    {
        var xMov = e.webkitMovementX || e.mozMovementX || 0;
        var yMov = e.webkitMovementY || e.mozMovementY || 0;
        _viewAngle.horzSum += (xMov * .75);
        _viewAngle.vertSum += (yMov * .75);
    }
}

// Handles pointerlock changes
function pointerLockChangeEvent(e)
{
    _mouse.pointerLocked = document.webkitPointerLockElement === _dom.canvas || document.mozPointerLockElement === _dom.canvas;
}

// Handles when window loses focus
function windowLostFocusEvent()
{
    showStartMenu();
}