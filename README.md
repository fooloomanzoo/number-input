[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/fooloomanzoo/number-input)
[![Demo](https://img.shields.io/badge/demo-available-red.svg)](https://www.webcomponents.org/element/fooloomanzoo/number-input/demo/demo/index.html)

## \<number-input\>

An input for numeric values.

### Motivation

The normal `input` with `type="number"` is fairly good to use, but it has some flaws, because it should e.g.:
* prevent non numeric input and also not propagate those values
* pad a value, if you like
* size the input, according to it's value

This element tries to achieve that by using internally an `text input` and expose it to handle numeric input

### Example

<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <style>
      html {
        font-family: 'Source Sans Pro', sans-serif;
        line-height: 1.5;
      }
      number-input {
        font-size: 1.5em;
        --number-input: {
          background: rgba(60, 61, 172, 0.5);
          transition: background 150ms ease-in-out;
          color: white;
          padding: 0.5em;
          border-radius: 4px;
          border: none;
        };
        --number-input-focus: {
          background: rgba(60, 61, 172, 0.9);
          outline: none;
        };
      }
    </style>
    <link rel="import" href="number-input.html">

    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<number-input min="-5000" step="50" max="5000" pad-length="4"></number-input>
```

### Installation
```
bower install --save fooloomanzoo/number-input
```

### License
[MIT](https://github.com/fooloomanzoo/number-input/blob/master/LICENSE.txt)
