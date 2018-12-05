define([
    'jquery',
    'jquery/ui',
    'domReady!'
], function($){
  $.widget('bitbull.priceSlider', {
  
    _init: function() {
      console.log(this.options)
      this._initSlider()
      this._setInputValues()
      // this._onInputChange()
    },
  
    _goToFilteredView: function (min, max) {
      var current = window.location.href,
        suffix = window.location.search.indexOf('?') >= 0 ? '&':'?'
      if (this._isPriceFiltered())  {
        current = this._removeParams('price', current)
      }
      var priceRange = ''
      $.each(this.options.values, function(index, range) {
        minOfRange = range.value.split('-')[0] !== '' ? range.value.split('-')[0] : range.value.split('-')[1] -10
        maxOfRange = range.value.split('-')[1] !== '' ? range.value.split('-')[1] : range.value.split('-')[0] +10
        if (max >= minOfRange && min <= maxOfRange) {
          priceRange += range.value + '_'
        }
      });
      setTimeout(function(){
        window.location.href = current + suffix + 'price='+ priceRange
      },10);
    },
    
    _getMinValue: function () {
      var lowest = this.options.values[0]
      return Number(lowest.value.replace('-', '')) - 10;
    },
    
    _getMaxValue: function () {
       var highest = this.options.values.slice(-1)[0]
       return Number(highest.value.replace('-', '')) + 10;
    },
  
    _isPriceFiltered() {
      var params = window.location.search
      return params.indexOf('price=')>= 0
    },
    
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
  
    _onInputChange: function () {
      $('.price-range-input').bind('input', function() {
         // on input do soething
      });
    },
    
    _setInputValues: function (min, max) {
      $('#min-price').val(min || this._getMinValue())
      $('#max-price').val(max || this._getMaxValue())
    },
  
    /**
     * Jquery UI slider init
     * @private
     */
    
    _initSlider: function () {
      var $widget = this
      $('#slider-price').slider({
        range: true,
        min: this._getMinValue(),
        max: this._getMaxValue(),
        values: [ this._getMinValue(), this._getMaxValue()],
        slide: function( event, ui ) {
          $widget._setInputValues(ui.values[0],ui.values[1])
        },
        change: function( event, ui ) {
          $widget._goToFilteredView(ui.values[0],ui.values[1])
        }
      })
    }
    
  });
  
  return $.bitbull.priceSlider;
});

