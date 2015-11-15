'use strict';

var url = document.getElementById('url');

url.onchange = function() {
    if (url.value) {
        (document.getElementById('photo1')).src = url.value;
        (document.getElementById('photo2')).style.backgroundImage = 'url(' + url.value + ')';
    }
};

function cssCode(selector, genCode) {
    var code = document.getElementById('code');
    code.value = selector + ' {\n\t' + genCode + '\n}';
    return;
}
function resetCssCode() {
    var code = document.getElementById('code');
    code.value = '/* update settings to generate styles */';
}
resetCssCode();
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

    var genCode = 'filter: ' + filterConfig +';\n-webkit-filter: ' + filterConfig + ';';
    cssCode('.image', genCode);

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

function changeBgBlend(bg) {
    var blendMode = document.querySelector('input[name="optionsBgBlending"]:checked').value;
    bg.style.backgroundBlendMode = blendMode;
    var genCode = 'background-blend-mode: ' + blendMode + ';\nbackground-color: ' + document.getElementById('swatch1').value + ';';
    cssCode('.background-image', genCode);
    return bg;
}

function controlbgblend() {
    var bgBlend = document.getElementById('bgblend');

    // Change color swatch bg
    var swatch1 = document.getElementById('swatch1');
    var bg = document.getElementById('photo2');
    swatch1.oninput = function() {
        bg.style.backgroundColor = swatch1.value;
    };

    var inputBgBlendList = bgBlend.getElementsByTagName('input');
    for(var i = 0; i < inputBgBlendList.length; i++) {
        inputBgBlendList[i].setAttribute('onchange', 'changeBgBlend(document.getElementById("photo2"))');
    }
}

/*
    Tab 3 actions
*/

function changeMixBlend(box) {
    var blendMode = document.querySelector('input[name="optionsMixBlending"]:checked').value;
    box.style.mixBlendMode = blendMode;
    var genCode = 'mix-blend-mode: ' + blendMode + ';\nbackground-color: ' + document.getElementById('swatch2').value + ';';
    cssCode('.box-overlay', genCode);
    return box;
}

function controlmixblend() {
    var mixBlend = document.getElementById('mixblend');

    // Change color swatch bg
    var swatch2 = document.getElementById('swatch2');
    var bg = document.getElementById('photo3');
    var box = bg.querySelector('.box');
    swatch2.oninput = function() {
        box.style.backgroundColor = swatch2.value;
    };

    var inputMixBlendList = mixBlend.getElementsByTagName('input');
    for(var i = 0; i < inputMixBlendList.length; i++) {
        inputMixBlendList[i].setAttribute('onchange', 'changeMixBlend(document.querySelector(".box"))');
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
    resetCssCode();
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
