import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { NumberInputMixin } from './number-input.js';
import { RangeMixin } from '@fooloomanzoo/property-mixins/range-mixin.js';
import { IntlNumberFormatMixin } from '@fooloomanzoo/property-mixins/intl-number-format-mixin.js';
import { InputPattern } from '@fooloomanzoo/input-picker-pattern/input-pattern.js';

/**
 * mixin to create a integer-input
 *
 * @mixinFunction
 * @polymer
 */
export const IntegerInputMixin = dedupingMixin(superClass => {
  return class extends superClass {
    static get properties() {
      return {
        /**
         * step for changing the input (referencing to `min` or `0`)
         * @type {number}
         */
        step: {
          type: Number,
          value: 1,
          observer: '_stepChanged'
        },
        /**
         * The maximum number of fraction digits to use
         */
        maximumFractionDigits: {
          type: Number,
          readOnly: true,
          value: 0
        }
      }
    }

    _computeMinimumFractionDigits() {
      return 0;
    }

    _safeAdd(a, b) {
      return a + b;
    }

    _safeMult(a, b) {
      return a * b;
    }
  }
});

/**
 *  `integer-input` is an element that can:
 * * prevent non numeric input
 * * guarantee **live**-data to be valid
 * * pad a value with `0` (to a specific length)
 * * size the input (according to it's length)
 * * overflow to minimum or underflow to maximum
 * * saturate to minimum or to maximum
 * * display a specified unit and size the input
 *
 * Example:
 * ```html
 * <integer-input step="2" min="-20" max="140" pad-length="2"></integer-input>
 * ```
 *
 * It sizes automatically. Use `key-up` and `key-down` to increment the value. If `step` is given, the value is a **multiple** of `step`.
 *
 *  Have a look at [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element.
 *
 * ```css
 *  integer-input {
 *   --input-disabled-color: grey;
 *   --input-focus-background: rgba(0,0,0,0.3);
 *   --input-focus: {
 *     font-weight: bold;
 *   };
 *   --input-placeholder: {
 *     color: pink;
 *   };
 * }
 * ```
 * @polymer
 * @customElement
 *
 * @appliesMixin IntegerInputMixin
 * @appliesMixin NumberInputMixin
 * @appliesMixin IntlNumberFormatMixin
 * @appliesMixin RangeMixin
 * @appliesMixin InputPattern
 *
 * @demo demo/index.html
 * @demo demo/form.html Form Demo
 **/
export class IntegerInput extends IntegerInputMixin(NumberInputMixin(InputPattern(RangeMixin(IntlNumberFormatMixin(PolymerElement))))) {

  static get is() {
    return 'integer-input';
  }
}

if (!customElements.get(IntegerInput.is)) {
  customElements.define(IntegerInput.is, IntegerInput);
}
