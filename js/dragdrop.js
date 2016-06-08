var blockJs = document.getElementById('block');
var areaJs = document.getElementById('area');

//фнукция для координат элемента, именно верхней левой точки
function Coordinates(elem) {
    var box = elem.getBoundingClientRect();//координаты элемента как прямоугольника
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || document.body.scrollTop;//прокрутка страницы оси X
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || document.body.scrollLeft;//прокрутка страницы Y

    var clientTop = docEl.clientTop || document.body.clientTop || 0;//смещение относительно левого верхнего угла
    var clientLeft = docEl.clientLeft || document.body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;//складываем прокрутку к координатам и отнимаем смещение
    var left = box.left + scrollLeft - clientLeft;

    return {// возвращаем
        top: top,
        left: left
    };
}

// функция на нажатие на блок мышкой, курсором
blockJs.onmousedown = function(eventJs) {

    var coords = Coordinates(blockJs); //получаем координаты блока, левую верхнюю точку
    var shiftX = eventJs.pageX - coords.left;//смещение по X, от координат курсора отнимаем отнима левую/верхнюю границу
    var shiftY = eventJs.pageY - coords.top;//смещение по Y

    moveAt(eventJs);

    // функция на передвижение мяча на координаты мышки курсора, не забывая про сдвиг ShiftX и shiftY
    function moveAt(eventJs) {
        blockJs.style.left = eventJs.pageX - shiftX + 'px';
        blockJs.style.top = eventJs.pageY - shiftY + 'px';
    }

    // функция для перемещения, когда двигается мышка, курсор
    document.onmousemove = function(eventJs) {
        moveAt(eventJs);
    };
    
    //функция по отпусканию мышки и конец движения
    blockJs.onmouseup = function() {
        document.onmousemove = null;
        blockJs.onmouseup = null;
    };

}

//отключаем встроенный браузерны DragDrop
blockJs.ondragstart = function() {
    return false;
};
