[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/fooloomanzoo/number-input)
[![API](https://img.shields.io/badge/API-available-green.svg)](https://www.webcomponents.org/element/fooloomanzoo/number-input/elements/number-input)
[![Demo](https://img.shields.io/badge/demo-available-red.svg)](https://www.webcomponents.org/element/fooloomanzoo/number-input/demo/demo/index.html)

_[API](https://fooloomanzoo.github.io/number-input/components/number-input/#/elements/number-input)_ and
_[Demo](https://fooloomanzoo.github.io/number-input/components/number-input/#/elements/number-input/demos/demo/index.html)_

## \<number-input\>

An input for numeric values.

### Motivation

The normal `input` with `type="number"` is fairly good to use, but it has some flaws, because it should if wanted e.g.:

* prevent non numeric input
* guarantee **live**-data to be valid
* use the local decimal separator
* pad a value with `0` (to a specific length)
* size the input (according to it's length)
* overflow to minimum or underflow to maximum
* saturate to minimum or to maximum
* display a specified unit and size the input
* can use percentage values and do have automatically the correct decimal value

This element wants to achieve that. It does use **decimal notation**, like `123.4`, but does not display _scientific (exponential) notation_, like `1.234e+2`. A more simpler element \<integer-input\> just uses integer values and doesn't use units or percent values.

![img](https://github.com/fooloomanzoo/number-input/raw/master/docs/number-input.gif "Demo")

### Example

<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>

    <custom-style>
      <style is="custom-style">
        html {
          font-family: 'Source Sans Pro', sans-serif;
          --number-input: {
            background: rgba(35, 35, 40, 0.5);
            transition: background 150ms ease-in-out;
            color: #f1f1f1;
            padding: 3px;
            border-radius: 0;
          };
          --number-input-focus: {
            background: rgba(35, 35, 40, 1);
            color: #f1f1f1;
            outline: none;
          };
        }
      </style>
    </custom-style>
    <link rel="import" href="number-input.html">
    <link rel="import" href="integer-input.html">

    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<span>with unit: </span><number-input min="-150" step="0.15" max="300" pad-length="3" default="15" unit="°C"></number-input><br>
<span>in percent: </span><number-input min="-150" step="0.15" max="300" pad-length="3" default="15" in-percent></number-input><br>
<span>as integer: </span><integer-input min="-150" step="15" max="300" default="15"></integer-input>
```

### Installation
```
bower install --save fooloomanzoo/number-input
```

### License
[MIT](https://github.com/fooloomanzoo/number-input/blob/master/LICENSE.txt)
