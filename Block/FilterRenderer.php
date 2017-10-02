<?php
/**
 * Catalog layer filter renderer
 */
namespace Emizentech\Priceslider\Block;

use Magento\Catalog\Model\Layer\Filter\FilterInterface;

class FilterRenderer extends \Magento\LayeredNavigation\Block\Navigation\FilterRenderer
{
    protected $currency;

    public function __construct(
        \Magento\Backend\Block\Template\Context $context,
        \Magento\Directory\Model\Currency $currency,
        array $data = []
    )
    {
        $this->currency = $currency;
        parent::__construct($context, $data);
    }

    /**
     * @param FilterInterface $filter
     * @return string
     */
    public function render(FilterInterface $filter)
    {
        $this->assign('filterItems', $filter->getItems());
        $this->assign('filter' , $filter);
        $html = $this->_toHtml();
        $this->assign('filterItems', []);
        return $html;
    }

    public function getPriceRange($filter){
        $filterprice = array('min' => 0 , 'max' => 0);
        if($filter instanceof \Magento\CatalogSearch\Model\Layer\Filter\Price){
            $priceArr = $filter->getResource()->loadPrices(10000000000);
            $filterprice['min'] = reset($priceArr);
            $filterprice['max'] = end($priceArr);
        }
        return $filterprice;
    }

    public function getFilterUrl($filter){
        $query = ['price'=> ''];
        return $this->getUrl('*/*/*', ['_current' => true, '_use_rewrite' => true, '_query' => $query]);
    }

    /**
     * Get current store currency code
     *
     * @return string
     */
    public function getCurrentCurrencyCode()
    {
        return $this->_storeManager->getStore()->getCurrentCurrencyCode();
    }

    /**
     * Get currency symbol for current locale and currency code
     *
     * @return string
     */
    public function getCurrentCurrencySymbol()
    {
        return $this->currency->getCurrencySymbol();
    }
}