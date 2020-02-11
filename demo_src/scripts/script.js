var MyRangeSlider1 = document.getElementById("MyRangeSlider1");
MyRangeSlider1.RangeSlider({});

var MyRangeSlider2 = document.getElementById("MyRangeSlider2");
MyRangeSlider2.RangeSlider({
  tiks: "16"
});

var MyRangeSlider3 = document.getElementById("MyRangeSlider3");
MyRangeSlider3.RangeSlider({
  posXInit: "25",
  tiks: "10",
  tiksType: "percents"
});

var MyRangeSlider4 = document.getElementById("MyRangeSlider4");
MyRangeSlider4.RangeSlider({
  tiks: "16",
  tiksType: "numbers"
});

var MyRangeSlider5 = document.getElementById("MyRangeSlider5");
MyRangeSlider5.RangeSlider({
  posXInit: "65",
  tiksName: ["bad", "okay", "good", "fine"]
});

var MyRangeSlider6 = document.getElementById("MyRangeSlider6");
MyRangeSlider6.RangeSlider({
  tiks: 4,
  tiksName: ["bad", "okay", "good", "fine"]
});