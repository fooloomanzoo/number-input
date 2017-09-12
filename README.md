[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/fooloomanzoo/number-input)
[![Demo](https://img.shields.io/badge/demo-available-red.svg)](https://www.webcomponents.org/element/fooloomanzoo/number-input/demo/demo/index.html)

# \<number-input\>

An input for numeric values.

## Motivation

The normal `input` with `type="number"` is fairly good to use, but it has some flaws, because it should e.g.:
* prevent non numeric input and also not propagate those values
* padd a value, if you like
* size the input, according to it's value

This element tries to achieve that by using internally an `text input and expose it to handle numeric input

<!--
```
<custom-element-demo height="330">
  <template>
    <link rel="import" href="datetime-picker.html">
    <style>
      html {
        font-family: 'Source Sans Pro', sans-serif;
        line-height: 1.5;
      }
    </style>
    <dom-bind>
      <template is="dom-bind">
        <next-code-block></next-code-block>
      </template>
    </dom-bind>
  </template>
</custom-element-demo>
```
-->

```html

<number-input value="{{value}}" min="-1111" step="11.1" max="2222" pad-length="4" ></number-input>
<div class="vertical-section-container result">
  <div><code>value</code>: <b>[[value]]</b></div>
</div>

```
