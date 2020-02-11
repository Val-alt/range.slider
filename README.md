# Range Slider on JS

## Quick start

### Load
Download the latest release

### Usage
HTML:
```
<div id="MyRangeSlider"></div>
```

Call the plugin function and your carousel is ready.

```
var MyRangeSlider = document.getElementById("MyRangeSlider");
MyRangeSlider.RangeSlider({});
```

### Options
- posXInit:
    - from 0 to 100
- tiks:
    - from 0 to ***
- tiksName:
    - array of names
- tiksType:
    - "numbers"
    - "percents"
```
MyRangeSlider.RangeSlider({
  posXInit: "65",
  tiks: 4,
  tiksName: ["bad", "okay", "good", "fine"]
});
```