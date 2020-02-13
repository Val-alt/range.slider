"use strict";

function RangeSlider(parameters) {
  var sliderElem = parameters.element;

  this.disable = function () {
    return sliderElem.style.display = "none";
  };

  this.enable = function () {
    sliderElem.classList.remove("readonly");
    return sliderElem.style.display = "block";
  };

  this.destroy = function () {
    return sliderElem.remove();
  };

  this.readonly = function () {
    return sliderElem.classList.add("readonly");
  };

  var posXInit = parameters.posXInit;
  var tiks = parameters.tiks;
  var minMaxStep = parameters.minMaxStep;
  var tiksName = parameters.tiksName;
  var tiksType = parameters.tiksType;
  var tickDistance = 100 / tiks;
  var sliderTiks;
  var sliderOptions;

  if (tiks !== undefined && (tiksName == undefined || tiksName.length == tiks)) {
    sliderTiks = document.createElement("div");
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

  if (tiksName !== undefined || tiksType !== undefined || minMaxStep !== undefined) {
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

      if (minMaxStep !== undefined) {
        var min = minMaxStep[0];
        var max = minMaxStep[1];
        var step = minMaxStep[2];

        if (min <= max && step >= 0) {
          if (step === 0) {
            step = 1;
          }

          tiksName[0] = min;

          for (var _i3 = 1; _i3 <= (max - min) / step; _i3++) {
            tiksName[_i3] = tiksName[_i3 - 1] + step;
          }
        }
      }
    }

    tickDistance = 100 / tiksName.length;
    sliderOptions = document.createElement("div");
    sliderOptions.setAttribute("class", "range-slider__options");
    sliderElem.appendChild(sliderOptions);
    var sliderOption = [];

    for (var _i4 = 0; _i4 < tiksName.length; _i4++) {
      sliderOption[_i4] = document.createElement("p");
      sliderOption[_i4].innerHTML = tiksName[_i4];
      sliderOption[_i4].style.flex = "0 0 ".concat(tickDistance, "%");

      sliderOption[_i4].setAttribute("data-position", tickDistance * _i4);

      sliderOptions.appendChild(sliderOption[_i4]);
    }

    sliderOptions.onclick = function (e) {
      for (var _i5 = 0; _i5 < sliderOptions.children.length; _i5++) {
        sliderOptions.children[_i5].classList.remove("active");
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
  var sliderInput = document.createElement("input");
  sliderHandle.setAttribute("class", "range-slider__handle");
  sliderBand.setAttribute("class", "range-slider__band");
  sliderBandColor.setAttribute("class", "range-slider__band range-slider__band--color");
  sliderInput.setAttribute("type", "text");
  sliderInput.setAttribute("name", "sliderInput");
  sliderElem.appendChild(sliderBand);
  sliderElem.appendChild(sliderBandColor);
  sliderElem.appendChild(sliderTrack);
  sliderTrack.appendChild(sliderHandle);
  sliderElem.appendChild(sliderInput);
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
    sliderInput.value = posPers;

    if (sliderOptions !== undefined) {
      for (var _i6 = 0; _i6 < sliderOptions.children.length; _i6++) {
        if (+sliderHandle.style.left.replace("%", "") >= +sliderOptions.children[_i6].dataset.position) {
          for (var _i7 = 0; _i7 < sliderOptions.children.length; _i7++) {
            sliderOptions.children[_i7].classList.remove("active");
          }

          sliderOptions.children[_i6].classList.add("active");

          if (tiksType !== "percents") {
            sliderInput.value = sliderOptions.children[_i6].textContent;
          }
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

  sliderBand.onclick = function (e) {
    return clickOnBand(e);
  };

  sliderBandColor.onclick = function (e) {
    return clickOnBand(e);
  };

  if (sliderTiks !== undefined) {
    sliderTiks.onclick = function (e) {
      return clickOnBand(e);
    };
  }

  function clickOnBand(e) {
    var posXClick;

    if (e.clientX) {
      posXClick = e.clientX;
    } else if (e.targetTouches) {
      posXClick = e.targetTouches[0].clientX;
    }

    sliderHandlePosX(posXClick);
  }

  sliderHandle.ondragstart = function () {
    return false;
  };

  function posXInitHandle(posXInit) {
    sliderHandle.style.left = "".concat(posXInit, "%");
    sliderBandColor.style.width = "".concat(posXInit, "%");
    sliderInput.value = "".concat(posXInit, "%");

    for (var _i8 = 0; _i8 < sliderOptions.children.length; _i8++) {
      if (+sliderHandle.style.left.replace("%", "") > +sliderOptions.children[_i8].dataset.position) {
        for (var _i9 = 0; _i9 < sliderOptions.children.length; _i9++) {
          sliderOptions.children[_i9].classList.remove("active");
        }

        sliderOptions.children[_i8].classList.add("active");

        sliderInput.value = sliderOptions.children[_i8].textContent;
      }
    }
  }
} // Object.prototype.RangeSlider = function(parameters) {
//   let sliderElem = this;
//   if (parameters === "disable") {
//     return (sliderElem.style.display = "none");
//   }
//   if (parameters === "enable") {
//     sliderElem.classList.remove("readonly");
//     return (sliderElem.style.display = "block");
//   }
//   if (parameters === "destroy") {
//     return sliderElem.remove();
//   }
//   if (parameters === "readonly") {
//     return sliderElem.classList.add("readonly");
//   }
//   let posXInit = parameters.posXInit;
//   let tiks = parameters.tiks;
//   let minMaxStep = parameters.minMaxStep;
//   let tiksName = parameters.tiksName;
//   let tiksType = parameters.tiksType;
//   let tickDistance = 100 / tiks;
//   let sliderTiks;
//   let sliderOptions;
//   if (
//     tiks !== undefined &&
//     (tiksName == undefined || tiksName.length == tiks)
//   ) {
//     sliderTiks = document.createElement("div");
//     sliderTiks.setAttribute("class", "range-slider__tiks");
//     sliderElem.appendChild(sliderTiks);
//     let sliderTik = [];
//     for (let i = 1; i < tiks; i++) {
//       sliderTik[i] = document.createElement("div");
//       sliderTik[i].style.left = `${tickDistance * i}% `;
//       sliderTik[i].setAttribute("data-position", sliderTik[i].style.left);
//       sliderTiks.appendChild(sliderTik[i]);
//     }
//   }
//   if (
//     tiksName !== undefined ||
//     tiksType !== undefined ||
//     minMaxStep !== undefined
//   ) {
//     if (tiksName == undefined) {
//       tiksName = [];
//       if (tiksType === "numbers") {
//         for (let i = 0; i < tiks; i++) {
//           tiksName[i] = i + 1;
//         }
//       }
//       if (tiksType === "percents") {
//         for (let i = 0; i < tiks; i++) {
//           tiksName[i] = `${tickDistance * (i + 1)}%`;
//         }
//       }
//       if (minMaxStep !== undefined) {
//         let min = minMaxStep[0];
//         let max = minMaxStep[1];
//         let step = minMaxStep[2];
//         if (min <= max && step >= 0) {
//           if (step === 0) {
//             step = 1;
//           }
//           tiksName[0] = min;
//           for (let i = 1; i <= (max - min) / step; i++) {
//             tiksName[i] = tiksName[i - 1] + step;
//           }
//         }
//       }
//     }
//     tickDistance = 100 / tiksName.length;
//     sliderOptions = document.createElement("div");
//     sliderOptions.setAttribute("class", "range-slider__options");
//     sliderElem.appendChild(sliderOptions);
//     let sliderOption = [];
//     for (let i = 0; i < tiksName.length; i++) {
//       sliderOption[i] = document.createElement("p");
//       sliderOption[i].innerHTML = tiksName[i];
//       sliderOption[i].style.flex = `0 0 ${tickDistance}%`;
//       sliderOption[i].setAttribute("data-position", tickDistance * i);
//       sliderOptions.appendChild(sliderOption[i]);
//     }
//     sliderOptions.onclick = e => {
//       for (let i = 0; i < sliderOptions.children.length; i++) {
//         sliderOptions.children[i].classList.remove("active");
//       }
//       e.target.classList.add("active");
//       posXInit = +e.target.dataset.position + tickDistance / 2;
//       posXInitHandle(posXInit);
//     };
//   }
//   let sliderHandle = document.createElement("div");
//   let sliderTrack = document.createElement("div");
//   let sliderBand = document.createElement("div");
//   let sliderBandColor = document.createElement("div");
//   let sliderInput = document.createElement("input");
//   sliderHandle.setAttribute("class", "range-slider__handle");
//   sliderBand.setAttribute("class", "range-slider__band");
//   sliderBandColor.setAttribute(
//     "class",
//     "range-slider__band range-slider__band--color"
//   );
//   sliderInput.setAttribute("type", "text");
//   sliderInput.setAttribute("name", "sliderInput");
//   sliderElem.appendChild(sliderBand);
//   sliderElem.appendChild(sliderBandColor);
//   sliderElem.appendChild(sliderTrack);
//   sliderTrack.appendChild(sliderHandle);
//   sliderElem.appendChild(sliderInput);
//   let sliderBandPageX = sliderElem.getBoundingClientRect().left;
//   let posX;
//   let sliderHandleLeftCenter = sliderHandle.offsetWidth / 2;
//   let sliderTrackWidth = sliderElem.offsetWidth;
//   let sliderElemPageX = sliderElem.getBoundingClientRect().left;
//   sliderTrack.style.position = "absolute";
//   sliderTrack.style.width = `${sliderTrackWidth}px`;
//   sliderTrack.style.left = `${-sliderHandleLeftCenter}px`;
//   sliderElem.classList.add("range-slider");
//   if (posXInit !== undefined) {
//     posXInitHandle(posXInit);
//   } else if (sliderOptions !== undefined) {
//     sliderOptions.children[0].classList.add("active");
//   }
//   if (document.readyState !== "loading") {
//     startup();
//   } else {
//     // let dclhandler = true;
//     document.addEventListener("DOMContentLoaded", startup);
//   }
//   function startup() {
//     sliderHandle.addEventListener("touchstart", handleMove, false);
//     sliderHandle.addEventListener("touchmove", handleMove, false);
//   }
//   function handleMove(e) {
//     e.preventDefault();
//     sliderHandle.style.position = "absolute";
//     sliderTrack.appendChild(sliderHandle);
//     sliderHandle.style.zIndex = 1000;
//     if (e.clientX) {
//       posX = e.clientX;
//     } else if (e.targetTouches) {
//       posX = e.targetTouches[0].clientX;
//     }
//     sliderHandlePosX(posX);
//   }
//   function sliderHandlePosX(posX) {
//     let HandlePosX;
//     if (posX - sliderBandPageX <= 0) {
//       HandlePosX = 0;
//     } else if (posX - sliderBandPageX > sliderElem.offsetWidth) {
//       HandlePosX = sliderTrackWidth;
//     } else {
//       HandlePosX = posX - sliderElemPageX;
//     }
//     let posPers = `${Math.round((HandlePosX / sliderTrackWidth) * 100)}%`;
//     sliderHandle.style.left = posPers;
//     sliderBandColor.style.width = posPers;
//     sliderInput.value = posPers;
//     if (sliderOptions !== undefined) {
//       for (let i = 0; i < sliderOptions.children.length; i++) {
//         if (
//           +sliderHandle.style.left.replace("%", "") >=
//           +sliderOptions.children[i].dataset.position
//         ) {
//           for (let i = 0; i < sliderOptions.children.length; i++) {
//             sliderOptions.children[i].classList.remove("active");
//           }
//           sliderOptions.children[i].classList.add("active");
//           if (tiksType !== "percents") {
//             sliderInput.value = sliderOptions.children[i].textContent;
//           }
//         }
//       }
//     }
//   }
//   sliderHandle.onmousedown = function(e) {
//     handleMove(e);
//     document.onmousemove = function(e) {
//       handleMove(e);
//     };
//     document.onmouseup = function() {
//       document.onmousemove = null;
//       document.onmouseup = null;
//     };
//   };
//   sliderBand.onclick = e => clickOnBand(e);
//   sliderBandColor.onclick = e => clickOnBand(e);
//   if (sliderTiks !== undefined) {
//     sliderTiks.onclick = e => clickOnBand(e);
//   }
//   function clickOnBand(e) {
//     let posXClick;
//     if (e.clientX) {
//       posXClick = e.clientX;
//     } else if (e.targetTouches) {
//       posXClick = e.targetTouches[0].clientX;
//     }
//     sliderHandlePosX(posXClick);
//   }
//   sliderHandle.ondragstart = function() {
//     return false;
//   };
//   function posXInitHandle(posXInit) {
//     sliderHandle.style.left = `${posXInit}%`;
//     sliderBandColor.style.width = `${posXInit}%`;
//     sliderInput.value = `${posXInit}%`;
//     for (let i = 0; i < sliderOptions.children.length; i++) {
//       if (
//         +sliderHandle.style.left.replace("%", "") >
//         +sliderOptions.children[i].dataset.position
//       ) {
//         for (let i = 0; i < sliderOptions.children.length; i++) {
//           sliderOptions.children[i].classList.remove("active");
//         }
//         sliderOptions.children[i].classList.add("active");
//         sliderInput.value = sliderOptions.children[i].textContent;
//       }
//     }
//   }
// };