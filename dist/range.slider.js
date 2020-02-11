"use strict";

Object.prototype.RangeSlider = function (_ref) {
  var posXInit = _ref.posXInit,
      tiks = _ref.tiks,
      tiksName = _ref.tiksName,
      tiksType = _ref.tiksType;
  var sliderElem = this;
  var tickDistance = 100 / tiks;

  if (tiks !== undefined && (tiksName == undefined || tiksName.length == tiks)) {
    var sliderTiks = document.createElement("div");
    sliderTiks.setAttribute("class", "range-slider__tiks");
    sliderElem.appendChild(sliderTiks);
    var sliderTik = [];

    for (var i = 1; i < tiks; i++) {
      sliderTik[i] = document.createElement("div");
      sliderTik[i].style.left = "".concat(tickDistance * i, "% ");
      sliderTik[i].setAttribute("data-position", sliderTik[i].style.left);
      sliderTiks.appendChild(sliderTik[i]);
    }
  }

  if (tiksName !== undefined || tiksType !== undefined) {
    if (tiksName == undefined) {
      tiksName = [];

      if (tiksType === "numbers") {
        for (var _i = 0; _i < tiks; _i++) {
          tiksName[_i] = _i + 1;
        }
      }

      if (tiksType === "percents") {
        for (var _i2 = 0; _i2 < tiks; _i2++) {
          tiksName[_i2] = "".concat(tickDistance * (_i2 + 1), "%");
        }
      }
    }

    tickDistance = 100 / tiksName.length;
    var sliderOptions = document.createElement("div");
    sliderOptions.setAttribute("class", "range-slider__options");
    sliderElem.appendChild(sliderOptions);
    var sliderOption = [];

    for (var _i3 = 0; _i3 < tiksName.length; _i3++) {
      sliderOption[_i3] = document.createElement("p");
      sliderOption[_i3].innerHTML = tiksName[_i3];
      sliderOption[_i3].style.flex = "0 0 ".concat(tickDistance, "%");

      sliderOption[_i3].setAttribute("data-position", tickDistance * _i3);

      sliderOptions.appendChild(sliderOption[_i3]);
    }

    sliderOptions.onclick = function (e) {
      for (var _i4 = 0; _i4 < sliderOptions.children.length; _i4++) {
        sliderOptions.children[_i4].classList.remove("active");
      }

      e.target.classList.add("active");
      posXInit = +e.target.dataset.position + tickDistance / 2;
      posXInitHandle(posXInit);
    };
  }

  var sliderHandle = document.createElement("div");
  var sliderTrack = document.createElement("div");
  var sliderBand = document.createElement("div");
  var sliderBandColor = document.createElement("div");
  sliderHandle.setAttribute("class", "range-slider__handle");
  sliderBand.setAttribute("class", "range-slider__band");
  sliderBandColor.setAttribute("class", "range-slider__band range-slider__band--color");
  sliderElem.appendChild(sliderBand);
  sliderElem.appendChild(sliderBandColor);
  sliderElem.appendChild(sliderTrack);
  sliderTrack.appendChild(sliderHandle);
  var sliderBandPageX = sliderElem.getBoundingClientRect().left;
  var posX;
  var sliderHandleLeftCenter = sliderHandle.offsetWidth / 2;
  var sliderTrackWidth = sliderElem.offsetWidth;
  var sliderElemPageX = sliderElem.getBoundingClientRect().left;
  sliderTrack.style.position = "absolute";
  sliderTrack.style.width = "".concat(sliderTrackWidth, "px");
  sliderTrack.style.left = "".concat(-sliderHandleLeftCenter, "px");
  sliderElem.classList.add("range-slider");

  if (posXInit !== undefined) {
    posXInitHandle(posXInit);
  } else if (sliderOptions !== undefined) {
    sliderOptions.children[0].classList.add("active");
  }

  if (document.readyState !== "loading") {
    startup();
  } else {
    // let dclhandler = true;
    document.addEventListener("DOMContentLoaded", startup);
  }

  function startup() {
    sliderHandle.addEventListener("touchstart", handleMove, false);
    sliderHandle.addEventListener("touchmove", handleMove, false);
  }

  function handleMove(e) {
    e.preventDefault();
    sliderHandle.style.position = "absolute";
    sliderTrack.appendChild(sliderHandle);
    sliderHandle.style.zIndex = 1000;

    if (e.clientX) {
      posX = e.clientX;
    } else if (e.targetTouches) {
      posX = e.targetTouches[0].clientX;
    }

    sliderHandlePosX(posX);
  }

  function sliderHandlePosX(posX) {
    var HandlePosX;

    if (posX - sliderBandPageX <= 0) {
      HandlePosX = 0;
    } else if (posX - sliderBandPageX > sliderElem.offsetWidth) {
      HandlePosX = sliderTrackWidth;
    } else {
      HandlePosX = posX - sliderElemPageX;
    }

    var posPers = "".concat(Math.round(HandlePosX / sliderTrackWidth * 100), "%");
    sliderHandle.style.left = posPers;
    sliderBandColor.style.width = posPers;

    if (sliderOptions !== undefined) {
      for (var _i5 = 0; _i5 < sliderOptions.children.length; _i5++) {
        if (+sliderHandle.style.left.replace("%", "") >= +sliderOptions.children[_i5].dataset.position) {
          for (var _i6 = 0; _i6 < sliderOptions.children.length; _i6++) {
            sliderOptions.children[_i6].classList.remove("active");
          }

          sliderOptions.children[_i5].classList.add("active");
        }
      }
    }
  }

  sliderHandle.onmousedown = function (e) {
    handleMove(e);

    document.onmousemove = function (e) {
      handleMove(e);
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  sliderHandle.ondragstart = function () {
    return false;
  };

  function posXInitHandle(posXInit) {
    sliderHandle.style.left = "".concat(posXInit, "%");
    sliderBandColor.style.width = "".concat(posXInit, "%");

    for (var _i7 = 0; _i7 < sliderOptions.children.length; _i7++) {
      if (+sliderHandle.style.left.replace("%", "") > +sliderOptions.children[_i7].dataset.position) {
        for (var _i8 = 0; _i8 < sliderOptions.children.length; _i8++) {
          sliderOptions.children[_i8].classList.remove("active");
        }

        sliderOptions.children[_i7].classList.add("active");
      }
    }
  }
};