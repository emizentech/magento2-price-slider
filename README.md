# magento2-price-slider
###### Refactored from [magento2-price-slider](https://github.com/emizentech/magento2-price-slider)

TODO: No pthml for now, do something like

```
<?php if ($filter->getData('attribute_code') === 'price'):?>
    <span><?php echo __('from') ?></span><input type="text" id="min-price" class="price-range-input" /><span>€</span>
    <span><?php echo __('from') ?></span><input type="text" id="max-price" class="price-range-input" /><span>€</span>
    <div id="slider-price" data-mage-init='{"priceSlider": {"values": <?php echo \Zend_Json::encode($data);?> }}'></div>
<?php else: ?>
  // Your filters options
  ...
```
