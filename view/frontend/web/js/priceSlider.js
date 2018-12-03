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
    
    _goToFilteredView: function () {
    
    },
  
    /**
     * TODO: ADD translations
     * @param min
     * @param max
     * @private
     */
    
    _setInputValues: function (min, max) {
      var minLabel = typeof min === 'undefined' || min ===  this._getMinValue() ? 'Meno di ' + this._getMinValue() : min
      var maxLabel = typeof max === 'undefined' || max ===  this._getMaxValue() ? 'Più di ' + this._getMaxValue() : max
      $('#min-price').val(minLabel + '€')
      $('#max-price').val(maxLabel + '€')
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
          $widget._setInputValues(ui.values[0],ui.values[1])
        },
        change: function( event, ui ) {
          console.log('change')
          console.log(ui)
          // window.location.href = price_url+ui.values[0]+"-"+ui.values[1];
        }
      })
    }
    
  });
  
  return $.bitbull.priceSlider;
});

