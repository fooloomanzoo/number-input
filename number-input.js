import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { RangeMixin } from '@fooloomanzoo/property-mixins/range-mixin.js';
import { IntlNumberFormatMixin } from '@fooloomanzoo/property-mixins/intl-number-format-mixin.js';
import { InputPattern } from '@fooloomanzoo/input-picker-pattern/input-pattern.js';

/**
 * mixin to create a number-input
 *
 * @mixinFunction
 * @polymer
 */
export const NumberInputMixin = dedupingMixin(function(superClass) {
  return class extends superClass {
    constructor() {
      super();
      this._isSet = function(value) {
        return !isNaN(this.parseNumber(value));
      }.bind(this);
    }

    static get inputTemplate() {
      return html`
        <input id="input"
          type$="[[type]]"
          value="{{input::input}}"
          step="[[step]]"
          required$="[[required]]"
          disabled$="[[disabled]]"
          placeholder="[[placeholder]]"
          spellcheck="false"
          autocomplete="off">
      `;
    }

    static get properties() {
      return {
        /**
         * type of the input
         */
        type: {
          type: String,
          readOnly: true
        },

        /**
         * length to pad the string (with `0`) according to the total amount of numbers
         */
        padLength: {
          type: Number
        },

        /**
         * enables auto padding
         * @type {boolean}
         */
        autoPadding: {
          type: Boolean
        },

        /**
         * minimum digits right to the decimal separator
         */
        minimumFractionDigits: {
          type: Number,
          readOnly: true
        },

        /**
         * minimum digits left to the decimal separator to pad
         */
        minimumIntegerDigits: {
          type: Number,
          readOnly: true
        },

        value: {
          type: Number,
          notify: true
        },

        /**
         * defines the property that should be used for the value
         */
        propertyForValue: {
          type: String,
          value: 'valueAsNumber'
        }
      }
    }

    static get observers() {
      return [
        '_computeMinlengthString(formatNumber, startAt, min, max, minimumIntegerDigits, minimumFractionDigits, alwaysSign)',
        '_computeType(_numberOptions, decimalSeparator, alwaysSign, padLength, autoPadding)',
        '_computeMinimumFractionDigits(step, min, max, numberStyle)',
        '_computeMinimumIntegerDigits(autoPadding, padLength, default, startAt, min, max, step, numberStyle)',
        '_formatNumberChanged(formatNumber)'
      ]
    }

    /**
     * reset the value
     */
    reset(value) {
      this.value = this._computeDefaultValue(value);
    }

    _checkKeycode(e) {
      switch (e.keyCode) {
        case 38: // up
          e.preventDefault();
          e.stopPropagation();
          this.increase();
          break;
        case 40: // down
          e.preventDefault();
          e.stopPropagation();
          this.decrease();
          break;
        default:
          super._checkKeycode(e);
      }
    }

    _inputChanged(input) {
      // test if value is set and if needed set input to default
      if (this._defaultIsSet(input) === false) {
        const value = this._computeDefaultValue();
        if (this._isSet(value)) {
          this.input = this.formatNumber(value);
          return;
        }
      }
      if (this.autoResize) {
        this._debouncedResizeWidth();
      }
    }

    _valueChanged(value, oldValue) {
      if (this.__resettingValueAsNumber === true) return;
      value = this._checkValueAsNumber(this.parseNumber(value), oldValue);
      if (this._isSet(value) === false) {
        this._updateInput(undefined, value);
        return;
      }
      this.setProperties({
        input: this.formatNumber(value),
        value: value
      });
      this._debouncedResizeWidth();
    }

    _valueAsNumberChanged(valueAsNumber, oldValue) {
      if (this.__resettingValueAsNumber === true) return;
      if (this._isSet(valueAsNumber) === false) {
        this._updateInput(undefined, valueAsNumber);
        return;
      }
      super._valueAsNumberChanged(valueAsNumber, oldValue);
    }

    _defaultChanged(def) {
      if (isNaN(this.parseNumber(def))) return;
      if (this._isSet(this.value) === false) {
        this.value = this._computeDefaultValue();
      }
    }

    _computeDefaultValue(value) {
      if (this._isSet(this.default)) {
        return this.parseNumber(this.default);
      }
      return value;
    }

    /**
     * update manually the value with the native input
     */
    _confirmInput(e) {
      const value = this.parseNumber(this.input);

      if (this._isSet(value)) {
        this.setProperties({
          input: this.formatNumber(value),
          value: value
        })
      } else {
        this.reset();
      }
      this._debouncedResizeWidth();
      e && e.stopPropagation && e.stopPropagation();
    }

    /**
     * update manually the native input with the given value
     */
    _updateInput(e, value) {
      if (value === undefined) {
        // '_updateInput' called without preparsed value
        value = this.parseNumber(this.value);
      }
      if (this._isSet(value)) {
        this.input = this.formatNumber(value);
      } else {
        // reset input
        this.input = '';
      }
      this._debouncedResizeWidth();
      e && e.stopPropagation && e.stopPropagation();
    }

    _formatNumberChanged() {
      if (!isNaN(this.valueAsNumber)) {
        this._updateInput(undefined, this.valueAsNumber);
      }
    }

    _computeMinlengthString() {
      if (this.formatNumber === undefined)
        return;
      const def = isNaN(this.default) ? '' : this.formatNumber(this.default),
        placeholder = this.placeholder || '',
        startAt = isNaN(this.startAt) ? '' : this.formatNumber(this.startAt),
        min = isNaN(this.min) ? '' : this.formatNumber(Math.abs(this.min)),
        max = isNaN(this.max) ? '' : this.formatNumber(this.max),
        minlengthNumber = this.formatNumber(Math.pow(10, Math.ceil(this.minlength || 1) - (this.numberStyle === 'percent' ? 3 : 1)));
      const minlengthString = (!this.alwaysSign && this.max < 0 ? '-' : '') + this.formatNumber(Math.pow(10, (this.minimumIntegerDigits || 1) - 1) + Math.pow(10, -(this.minimumFractionDigits || 0)));
      this._minlengthString = [startAt, max, min, placeholder, minlengthString, minlengthNumber].reduce( (acc, curr) => {
        return curr.length > acc.length ? curr : acc;
      }, def);
    }

    _computeType(numberOptions, decimalSeparator, unit, alwaysSign, padLength, autoPadding) {
      // maximize compatibility for mobile keyboards
      let type;
      if (numberOptions && numberOptions.numberStyle === 'decimal' && !unit && !alwaysSign && !padLength && !autoPadding) {
        type = 'number';
      } else if (decimalSeparator === '.' || (numberOptions && numberOptions.maximumFractionDigits === 0)) {
        // for type = 'tel' there won't be a comma available for the onscreen keyboard
        type = 'tel';
      } else {
        type = 'text';
      }
      this._setType(type);
    }

    _computeMinimumIntegerDigits(autoPadding, padLength, def, startAt, min, max, step, numberStyle) {
      if (numberStyle === 'percent') {
        min = Math.round(min * 100);
        max = Math.round(max * 100);
        def = Math.round(def * 100);
        step = Math.round(step * 100);
        startAt = Math.round(startAt * 100);
      } else {
        min = Math.round(min);
        max = Math.round(max);
        def = Math.round(def);
        step = Math.round(step);
        startAt = Math.round(startAt);
      }
      min = '' + (Math.abs(min) || 0);
      max = '' + (Math.abs(max) || 0);
      def = '' + (Math.abs(def) || 0);
      step = '' + (Math.abs(step) || 0);
      startAt = '' + (Math.abs(startAt) || 0);

      let minimumIntegerDigits;
      if (autoPadding) {
        minimumIntegerDigits = Math.max((padLength || 1), startAt.length, step.length, def.length, min.length, max.length);
      } else {
        minimumIntegerDigits = padLength || 1;
      }
      this._setMinimumIntegerDigits(minimumIntegerDigits);
    }

    _computeMinimumFractionDigits(step, min, max, numberStyle) {
      if (numberStyle === 'percent') {
        min = this._safeMult(min || 0, 100);
        max = this._safeMult(max || 0, 100);
        step = this._safeMult(step || 0.01, 100);
      }

      min = '' + (Math.abs(min) || '');
      max = '' + (Math.abs(max) || '');
      step = '' + step;

      this._setMinimumFractionDigits( ['0', step, min, max].reduce( (acc, curr) => {
        const pos = curr.indexOf('.');
        return Math.max((pos < 0) ? 0 : (curr.length - 1 - pos), acc);
      }) );
    }

  }
});

/**
 *  `number-input` is an element that can:
 * * prevent non numeric input
 * * guarantee **live**-data to be valid
 * * pad a value with `0` (to a specific length)
 * * size the input (according to it's length)
 * * overflow to minimum or underflow to maximum
 * * saturate to minimum or to maximum
 * * display a specified unit and size the input
 * * specify the decimal separator (the value will still be a Number object)
 * * use percent-format
 *
 * Example:
 * ```html
 * <number-input step="2" min="-20" max="140" pad-length="2"></number-input>
 * ```
 *
 * It sizes automatically. Use `key-up` and `key-down` to increment the value. If `step` is given, the value is a **multiple** of `step`.
 *
 *  Have a look at [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element.
 *
 * ```css
 *  number-input {
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
 * @appliesMixin NumberInputMixin
 * @appliesMixin IntlNumberFormatMixin
 * @appliesMixin RangeMixin
 * @appliesMixin InputPattern
 *
 * @demo demo/index.html
 * @demo demo/form.html Form Demo
 **/
export class NumberInput extends NumberInputMixin(InputPattern(RangeMixin(IntlNumberFormatMixin(PolymerElement)))) {

  static get is() {
    return 'number-input';
  }
}

if (!customElements.get(NumberInput.is)) {
  customElements.define(NumberInput.is, NumberInput);
}
