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
    },
    
    _getMinValue: function () {
      var lowest = this.options.values[0]
      return Number(lowest.value.replace('-', ''));
    },
    
    _getMaxValue: function () {
       var highest = this.options.values.slice(-1)[0]
       return Number(highest .value.replace('-', ''));
    },
    
    _goToFilteredView: function (min, max) {
      var current = window.location.href,
          params = window.location.search,
          suffix = params.indexOf('?') >= 0 ? '&':'?'
      if (this._isPriceFiltered())  {
        current = this._removeParams('price', current)
      }
      console.log(min)
      console.log(max)
      //window.location.href = current + suffix + 'price='+ min + '-'+ max
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
    
    _isPriceFiltered() {
      var params = window.location.search
      return params.indexOf('price=')>= 0
    },
  
    /**
     * TODO: ADD translations
     * @param min
     * @param max
     * @private
     */
    
    _setInputValues: function (min, max) {
      if (typeof min === 'undefined' || min === this._getMinValue()) {
        min = this._isPriceFiltered() ? this._getMinValue() : (this._getMinValue() - 10)
      }
      if (typeof max === 'undefined' || max === this._getMaxValue()) {
        max = this._isPriceFiltered() ? this._getMaxValue() : (this._getMaxValue() + 10)
      }
      $('#min-price').val(min)
      $('#max-price').val(max)
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
        values: [ this._getMinValue(), this._getMaxValue() ],
        slide: function( event, ui ) {
          console.log(ui)
          $widget._setInputValues(ui.values[0],ui.values[1])
        },
        change: function( event, ui ) {
          setTimeout(function(){
            $widget._goToFilteredView(ui.values[0],ui.values[1])
          },10);
        }
      })
    }
    
  });
  
  return $.bitbull.priceSlider;
});

