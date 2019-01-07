define([
    'jquery',
    'jquery/ui',
    'domReady!',
    'touchSupport'
], function($){
  $.widget('bitbull.priceSlider', {
    
    _init: function() {
      var range = this._getSelectedRange()
      this.onEventListeners()
      this._setCurrentRange() // Set current price range if filter is active
      if(this._isPriceFiltered()) { // Set values in inputs
        this._setInputValues(range[0],range[1])
      } else {
        this._setInputValues()
      }
      this._initSlider() // Init slider
    },
  
    /**
     * Event listeners
     */

    onEventListeners: function () {
      var that = this
      $(".go-to-price").click(function() {
        that._goToFilteredView($('#min-price').val(), $('#max-price').val())
      });
      $('.price-range-input').bind('input', function() {
        $(".go-to-price").show()
        $('#slider-price').slider({
          values: [ $('#min-price').val(), $('#max-price').val()]
        });
      });
    },
  
    /**
     * Redirect to the viltered view
     * @param min
     * @param max
     */
  
    _goToFilteredView: function (min, max) {
      var current = window.location.href,
        suffix = window.location.search.indexOf('?') >= 0 ? '&':'?'
      if (this._isPriceFiltered())  {
        console.log('is filtered')
        current = this._removeParams('price', current)
      }
      console.log(current)
      console.log(this._isPriceFiltered())
      var priceRange = ''
      $.each(this.options.values, function(index, range) {
        minOfRange = range.value.split('-')[0] !== '' ? range.value.split('-')[0] : Number(range.value.split('-')[1]) -10
        maxOfRange = range.value.split('-')[1] !== '' ? range.value.split('-')[1] : Number(range.value.split('-')[0]) +10
        if (max > minOfRange && min < maxOfRange) {
          priceRange += range.value + '_'
        }
      });
      window.location.href = current + suffix + 'price='+ priceRange
    },
  
    /**
     * Get range of selected price
     * @returns {*}
     */
    
    _getSelectedRange() {
      var values = this.options.values,
          selectedRange = []
      if (this._isPriceFiltered())  {
        $.each(values, function(index, range) {
          if (range.is_selected) {
            selectedRange.push(values[index].value)
          }
        });
        var length = selectedRange.length -1,
            min = selectedRange[0].split('-')[0] === '' ? this._getMinValue() : Number(selectedRange[0].split('-')[0])
            max = selectedRange[length].split('-')[1] === '' ? this._getMaxValue() : Number(selectedRange[length].split('-')[1])
        return [min, max]
      } else {
        return null
      }
    },
  
    /**
     * Get min value in current category
     * @returns {number}
     */
    
    _getMinValue: function () {
      var lowest = this.options.values[0]
      return Number(lowest.value.replace('-', '')) - 10;
    },
  
    /**
     * Get max value in current category
     * @returns {number}
     */
    
    _getMaxValue: function () {
       var highest = this.options.values.slice(-1)[0]
       return Number(highest.value.replace('-', '')) + 10;
    },
  
    /**
     * Is category filtered for price?
     * @returns {boolean}
     */
  
    _isPriceFiltered() {
      var params = window.location.search
      return params.indexOf('price=')>= 0
    },
  
    /**
     * Remove parameter from url
     * @param key
     * @param url
     */
    
    _removeParams: function (key, url) {
      var cleanedUrl = url.split('?')[0],
          param,
          params_arr = [],
          queryString = (url.indexOf('?') !== -1) ? url.split('?')[1] : '';
      if (queryString !== '') {
        params_arr = queryString.split('&');
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
          param = params_arr[i].split('=')[0];
          if (param === key) {
            params_arr.splice(i, 1);
          }
        }
        cleanedUrl = cleanedUrl + '?' + params_arr.join('&');
      }
      return cleanedUrl;
    },
    
    /**
     * Set starting values
     * @param min
     * @param max
     */
    
    _setInputValues: function (min, max) {
      $('#min-price').val(min || this._getMinValue())
      $('#max-price').val(max || this._getMaxValue())
    },
  
    /**
     * Set custom current range instead of default ranges in selected filters box
     * //TODO: translate
     */
    
    _setCurrentRange () {
      var range = this._getSelectedRange()
      var currency = this.options.currency
      if (range !== null) {
        $('#selected-price-range').html('Da ' + range[0] + currency + ' a ' + range[1] + currency)
      }
    },
  
    /**
     * Jquery UI slider init
     * @private
     */
    
    _initSlider: function () {
      var $widget = this,
          range = this._getSelectedRange()
      $('#slider-price').slider({
        range: true,
        min: this._getMinValue(),
        max: this._getMaxValue(),
        values: range === null ? [ this._getMinValue(), this._getMaxValue()] : range,
        slide: function( event, ui ) {
          $widget._setInputValues(ui.values[0],ui.values[1])
        },
        change: function( event, ui ) {
          $(".go-to-price").show()
          // $widget._goToFilteredView(ui.values[0],ui.values[1])
        }
      })
    }
    
  });
  
  return $.bitbull.priceSlider;
});

