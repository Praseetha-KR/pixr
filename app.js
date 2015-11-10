'use strict';

// var url = document.getElementById('url');

// url.onchange = function() {
//     if (url.value) {
//         photo1.src = url.value;
//         photo2.style.backgroundImage = 'url(' + url.value + ')';
//     }
// };

/*
    Tab 1 actions
*/
function changeFilter(photo) {
    var filterArr = document.querySelectorAll('#blur, #grayscale, #sepia, #saturate, #hue-rotate, #invert, #opacity, #brightness, #contrast');

    let filterConfig = `blur(${filterArr[0].value}px)
        grayscale(${filterArr[1].value}%)
        sepia(${filterArr[2].value}%)
        saturate(${filterArr[3].value}%)
        hue-rotate(${filterArr[4].value}deg)
        invert(${filterArr[5].value}%)
        opacity(${filterArr[6].value}%)
        brightness(${filterArr[7].value}%)
        contrast(${filterArr[8].value}%)`;

    photo.style.filter = filterConfig;
    photo.style.webkitFilter =  filterConfig;
    return photo;
}

function controlfilters() {
    var filters = document.getElementById('filters');
    var inputFiltersList = filters.getElementsByTagName('input');
    for(let i = 0; i < inputFiltersList.length; i++) {
        inputFiltersList[i].setAttribute('oninput', 'changeFilter(document.getElementById("photo1"))');
    }
}

/*
    Tab 2 actions
*/

function changeBgBlending(bg) {
    var blendMode = document.querySelector('input[name="optionsBlending"]:checked').value;
    bg.style.backgroundBlendMode = blendMode;
    return bg;
}

function controlbgblending() {
    var bgBlending = document.getElementById('bgblending');

    // Change color swatch bg
    var swatch = document.getElementById('swatch');
    var bg = document.getElementById('photo2');
    swatch.oninput = function() {
        bg.style.backgroundColor = swatch.value;
    };

    var inputBgBlendingList = bgBlending.getElementsByTagName('input');
    for(var i = 0; i < inputBgBlendingList.length; i++) {
        inputBgBlendingList[i].setAttribute('onchange', 'changeBgBlending(document.getElementById("photo2"))');
    }
}

/*
    Tab Control
*/
function changeTabs(editor) {
    var ctrlValue = document.querySelector('input[name="controlSelector"]:checked').value;
    editor.className = '';
    editor.classList.add('tab-' + ctrlValue);
    eval('control' + ctrlValue + '()');
}
function controlTabs() {
    var ctrlSelector = document.getElementById('control-selector');
    var inputSelectorList = ctrlSelector.getElementsByTagName('input');
    controlfilters(); //Initialize tab 1 contents
    for(var i = 0; i < inputSelectorList.length; i++) {
        inputSelectorList[i].setAttribute('onchange', 'changeTabs(document.getElementById("editor"))');
    }
}
controlTabs();
