var blockJs = document.getElementById('block');
var areaJs = document.getElementById('area');

function Coordinates(elem) {
    var box = elem.getBoundingClientRect();
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || document.body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || document.body.scrollLeft;

    var clientTop = docEl.clientTop || document.body.clientTop || 0;
    var clientLeft = docEl.clientLeft || document.body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
        top: top,
        left: left
    };
}

blockJs.onmousedown = function(eventJs) {

    var coords = Coordinates(blockJs);
    var shiftX = eventJs.pageX - coords.left;
    var shiftY = eventJs.pageY - coords.top;

    moveAt(eventJs);

    function moveAt(eventJs) {
        blockJs.style.left = eventJs.pageX - shiftX + 'px';
        blockJs.style.top = eventJs.pageY - shiftY + 'px';
    }

    document.onmousemove = function(eventJs) {
        moveAt(eventJs);
    };

    blockJs.onmouseup = function() {
        document.onmousemove = null;
        blockJs.onmouseup = null;
    };

}

blockJs.ondragstart = function() {
    return false;
};
