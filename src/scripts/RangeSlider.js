Object.prototype.RangeSlider = function({
  posXInit,
  tiks,
  tiksName,
  tiksType
}) {
  let sliderElem = this;

  let tickDistance = 100 / tiks;

  if (
    tiks !== undefined &&
    (tiksName == undefined || tiksName.length == tiks)
  ) {
    let sliderTiks = document.createElement("div");
    sliderTiks.setAttribute("class", "range-slider__tiks");
    sliderElem.appendChild(sliderTiks);

    let sliderTik = [];
    for (let i = 1; i < tiks; i++) {
      sliderTik[i] = document.createElement("div");
      sliderTik[i].style.left = `${tickDistance * i}% `;
      sliderTik[i].setAttribute("data-position", sliderTik[i].style.left);
      sliderTiks.appendChild(sliderTik[i]);
    }
  }

  if (tiksName !== undefined || tiksType !== undefined) {
    if (tiksName == undefined) {
      tiksName = [];

      if (tiksType === "numbers") {
        for (let i = 0; i < tiks; i++) {
          tiksName[i] = i + 1;
        }
      }

      if (tiksType === "percents") {
        for (let i = 0; i < tiks; i++) {
          tiksName[i] = `${tickDistance * (i + 1)}%`;
        }
      }
    }

    tickDistance = 100 / tiksName.length;

    var sliderOptions = document.createElement("div");
    sliderOptions.setAttribute("class", "range-slider__options");
    sliderElem.appendChild(sliderOptions);

    var sliderOption = [];

    for (let i = 0; i < tiksName.length; i++) {
      sliderOption[i] = document.createElement("p");
      sliderOption[i].innerHTML = tiksName[i];
      sliderOption[i].style.flex = `0 0 ${tickDistance}%`;
      sliderOption[i].setAttribute("data-position", tickDistance * i);
      sliderOptions.appendChild(sliderOption[i]);
    }

    sliderOptions.onclick = e => {
      for (let i = 0; i < sliderOptions.children.length; i++) {
        sliderOptions.children[i].classList.remove("active");
      }
      e.target.classList.add("active");
      posXInit = +e.target.dataset.position + tickDistance / 2;
      posXInitHandle(posXInit);
    };
  }

  let sliderHandle = document.createElement("div");
  let sliderTrack = document.createElement("div");
  let sliderBand = document.createElement("div");
  let sliderBandColor = document.createElement("div");

  sliderHandle.setAttribute("class", "range-slider__handle");
  sliderBand.setAttribute("class", "range-slider__band");
  sliderBandColor.setAttribute(
    "class",
    "range-slider__band range-slider__band--color"
  );

  sliderElem.appendChild(sliderBand);
  sliderElem.appendChild(sliderBandColor);
  sliderElem.appendChild(sliderTrack);
  sliderTrack.appendChild(sliderHandle);

  let sliderBandPageX = sliderElem.getBoundingClientRect().left;
  let posX;
  let sliderHandleLeftCenter = sliderHandle.offsetWidth / 2;
  let sliderTrackWidth = sliderElem.offsetWidth;
  let sliderElemPageX = sliderElem.getBoundingClientRect().left;

  sliderTrack.style.position = "absolute";
  sliderTrack.style.width = `${sliderTrackWidth}px`;
  sliderTrack.style.left = `${-sliderHandleLeftCenter}px`;
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
    let HandlePosX;

    if (posX - sliderBandPageX <= 0) {
      HandlePosX = 0;
    } else if (posX - sliderBandPageX > sliderElem.offsetWidth) {
      HandlePosX = sliderTrackWidth;
    } else {
      HandlePosX = posX - sliderElemPageX;
    }
    let posPers = `${Math.round((HandlePosX / sliderTrackWidth) * 100)}%`;
    sliderHandle.style.left = posPers;
    sliderBandColor.style.width = posPers;

    if (sliderOptions !== undefined) {
      for (let i = 0; i < sliderOptions.children.length; i++) {
        if (
          +sliderHandle.style.left.replace("%", "") >=
          +sliderOptions.children[i].dataset.position
        ) {
          for (let i = 0; i < sliderOptions.children.length; i++) {
            sliderOptions.children[i].classList.remove("active");
          }
          sliderOptions.children[i].classList.add("active");
        }
      }
    }
  }

  sliderHandle.onmousedown = function(e) {
    handleMove(e);
    document.onmousemove = function(e) {
      handleMove(e);
    };

    document.onmouseup = function() {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  sliderHandle.ondragstart = function() {
    return false;
  };

  function posXInitHandle(posXInit) {
    sliderHandle.style.left = `${posXInit}%`;
    sliderBandColor.style.width = `${posXInit}%`;

    for (let i = 0; i < sliderOptions.children.length; i++) {
      if (
        +sliderHandle.style.left.replace("%", "") >
        +sliderOptions.children[i].dataset.position
      ) {
        for (let i = 0; i < sliderOptions.children.length; i++) {
          sliderOptions.children[i].classList.remove("active");
        }
        sliderOptions.children[i].classList.add("active");
      }
    }
  }
};
