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
* display a specified unit
* display a specified currencies
* can use percentage values and do have automatically the correct decimal value

This element wants to achieve that, by using the [Intl.NumberFormat API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat). A more simpler element \<integer-input\> just uses integer values and doesn't use units or percent values.

![img](https://github.com/fooloomanzoo/number-input/raw/master/docs/number-input.gif "Demo")

### Example

<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>

    <custom-style>
      <style is="custom-style">
        body {
          font-family: 'Source Sans Pro', sans-serif;
        }
        integer-input, number-input {
          --number-input: {
            background: transparent;
            transition: background 150ms ease-in-out;
            color: rgba(0,0,0,0.8);
            padding: 6px;
            border-radius: 0;
            font-size: 0.9em;
          };
          --number-input-focus: {
            background: rgb(35, 35, 40);
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
<span>using units: </span><number-input min="-150" step="0.15" max="300" pad-length="3" default="15" unit="°C"></number-input><br>
<span>in percent: </span><number-input min="-1" step="0.15" max="3" start-at="1" default="1" number-style="percent"></number-input><br>
<span>using currencies: </span><number-input min="0" step="0.01" always-sign start-at="1000" default="1000" use-grouping number-style="currency" currency="EUR"></number-input><br>
<span>as integer: </span><integer-input min="-150" step="15" max="300" default="15"></integer-input>
```

### Styling
Have a look at [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element.

### Installation
```
bower install --save fooloomanzoo/number-input
```

### License
[MIT](https://github.com/fooloomanzoo/number-input/blob/master/LICENSE.txt)
