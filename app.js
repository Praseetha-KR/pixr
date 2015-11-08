'use strict';

var photo = document.getElementById('photo');
var bgPhoto = document.getElementById('bg-block');
var filters = document.getElementById('filters');
var inputList = filters.getElementsByTagName('input');
var url = document.getElementById('url');

url.onchange = function() {
    if (url.value) {
        photo.src = url.value;
    }
};

var blur = document.getElementById('blur');
var grayscale = document.getElementById('grayscale');
var sepia = document.getElementById('sepia');
var saturate = document.getElementById('saturate');
var hueRotate = document.getElementById('hue-rotate');
var invert = document.getElementById('invert');
var opacity = document.getElementById('opacity');
var brightness = document.getElementById('brightness');
var contrast = document.getElementById('contrast');

for(var i = 0; i < inputList.length; i++) {
    inputList[i].oninput = function() {
        var filterConfig = 'blur(' + blur.value + 'px) \
            grayscale(' + grayscale.value + '%) \
            sepia(' + sepia.value + '%) \
            saturate(' + saturate.value + '%) \
            hue-rotate(' + hueRotate.value + 'deg) \
            invert(' + invert.value + '%) \
            opacity(' + opacity.value + '%) \
            brightness(' + brightness.value + '%) \
            contrast(' + contrast.value + '%)';
        photo.style.filter = filterConfig;
        photo.style.webkitFilter =  filterConfig;
    };
}

var blending = document.getElementById('blending');
var inputBlendingList = blending.getElementsByTagName('input');

for(var i = 0; i < inputBlendingList.length; i++) {
    inputBlendingList[i].onchange = function() {
        var blendingValue = document.querySelector('input[name="optionsBlending"]:checked').value;
        bgPhoto.style.backgroundBlendMode = blendingValue;
        (document.getElementById('test')).innerHTML = blendingValue;
    };
}

var ctrlSelector = document.getElementById('control-selector');
var inputSelectorList = ctrlSelector.getElementsByTagName('input');

function makeAllInVisible() {
    (document.getElementById('filters')).style.display = 'none';
    (document.getElementById('blending')).style.display = 'none';
}
(document.getElementById('blending')).style.display = 'none';
bgPhoto.style.display = 'none';
for(var i = 0; i < inputSelectorList.length; i++) {
    inputSelectorList[i].onchange = function() {
        makeAllInVisible();
        var ctrlValue = document.querySelector('input[name="controlSelector"]:checked').value;
        (document.getElementById(ctrlValue)).style.display = 'block';
        if (ctrlValue === 'blending') {
            photo.style.display = 'none';
            bgPhoto.style.display = 'block';
        } else {
            photo.style.display = 'block';
            bgPhoto.style.display = 'none';
        }
    };
}

var swatch = document.getElementById('swatch');

swatch.oninput = function() {
    bgPhoto.style.backgroundColor = swatch.value;
};
