var MyRangeSlider1 = new RangeSlider({
  element: document.getElementById("MyRangeSlider1")
});

var MyRangeSlider2 = new RangeSlider({
  tiks: 16,
  element: document.getElementById("MyRangeSlider2")
});

var MyRangeSlider3 = new RangeSlider({
  posXInit: 25,
  tiks: 10,
  tiksType: "percents",
  element: document.getElementById("MyRangeSlider3")
});
MyRangeSlider3.readonly();

var MyRangeSlider4 = new RangeSlider({
  tiks: 16,
  tiksType: "numbers",
  element: document.getElementById("MyRangeSlider4")
});

var MyRangeSlider5 = new RangeSlider({
  posXInit: 65,
  tiksName: ["bad", "okay", "good", "fine"],
  element: document.getElementById("MyRangeSlider5")
});

var MyRangeSlider6 = new RangeSlider({
  minMaxStep: [20, 70, 10],
  element: document.getElementById("MyRangeSlider6")
});
