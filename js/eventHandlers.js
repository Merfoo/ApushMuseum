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
    }
}

// Handle click event
function clickEvent(e)
{
    var picked = _scene.pick(e.clientX, e.clientY);
    
    if(picked.hit)
    {
        switch(picked.pickedMesh.id)
        {
            case _modelNames.littleBoy:
                showInfo(_infos[picked.pickedMesh.id]);
                _modelNames.showing = picked.pickedMesh.id;
                break;
        }
    }
    
    console.log(picked);
}