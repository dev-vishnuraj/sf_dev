/*
 * Marketplace specific configuration.
 *
 * Every filter needs to have following keys:
 * - id:     Unique id of the filter.
 * - label:  The default label of the filter.
 * - type:   String that represents one of the existing filter components:
 *           BookingDateRangeFilter, KeywordFilter, PriceFilter,
 *           SelectSingleFilter, SelectMultipleFilter.
 * - group:  Is this 'primary' or 'secondary' filter?
 *           Primary filters are visible on desktop layout by default.
 *           Secondary filters are behind "More filters" button.
 *           Read more from src/containers/SearchPage/README.md
 * - queryParamNames: Describes parameters to be used with queries
 *                    (e.g. 'price' or 'pub_amenities'). Most of these are
 *                    the same between webapp URLs and API query params.
 *                    You can't change 'dates', 'price', or 'keywords'
 *                    since those filters are fixed to a specific attribute.
 * - config: Extra configuration that the filter component needs.
 *
 * Note 1: Labels could be tied to translation file
 *         by importing FormattedMessage:
 *         <FormattedMessage id="some.translation.key.here" />
 *
 * Note 2: If you need to add new custom filter components,
 *         you need to take those into use in:
 *         src/containers/SearchPage/FilterComponent.js
 *
 * Note 3: If you just want to create more enum filters
 *         (i.e. SelectSingleFilter, SelectMultipleFilter),
 *         you can just add more configurations with those filter types
 *         and tie them with correct extended data key
 *         (i.e. pub_<key> or meta_<key>).
 */

export const filters = [
  {
    id: 'dates',
    label: 'Dates',
    type: 'BookingDateRangeFilter',
    group: 'primary',
    // Note: BookingDateRangeFilter is fixed filter,
    // you can't change "queryParamNames: ['dates'],"
    queryParamNames: ['dates'],
    config: {},
  },
  {
    id: 'price',
    label: 'Price',
    type: 'PriceFilter',
    group: 'primary',
    // Note: PriceFilter is fixed filter,
    // you can't change "queryParamNames: ['price'],"
    queryParamNames: ['price'],
    // Price filter configuration
    // Note: unlike most prices this is not handled in subunits
    config: {
      min: 0,
      max: 1000,
      step: 5,
    },
  },
  {
    id: 'keyword',
    label: 'Keyword',
    type: 'KeywordFilter',
    group: 'primary',
    // Note: KeywordFilter is fixed filter,
    // you can't change "queryParamNames: ['keywords'],"
    queryParamNames: ['keywords'],
    // NOTE: If you are ordering search results by distance
    // the keyword search can't be used at the same time.
    // You can turn on/off ordering by distance from config.js file.
    config: {},
  },
  {
    id: 'category',
    label: 'Category',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_category'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'smoke', label: 'Smoke' },
        { key: 'electric', label: 'Electric' },
        { key: 'wood', label: 'Wood' },
        { key: 'other', label: 'Other' },
      ],
    },
  },
  {
    id: 'payments',
    label: 'Payment Methods',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_payments'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: 'cash',
          label: 'Cash',
        },
        {
          key: 'cheque',
          label: 'Cheque',
        },
        {
          key: 'paypal',
          label: 'Paypal',
        },
        {
          key: 'venmo',
          label: 'Venmo',
        },
        {
          key: 'zelle',
          label: 'Zelle',
        },
        {
          key: 'credit_card',
          label: 'Credit card',
        },
      ],
    },
  },
  {
    id: 'services',
    label: 'Services',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_services'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: 'service1',
          label: 'Service One',
        },
        {
          key: 'service2',
          label: 'Service two',
        },
        {
          key: 'service3',
          label: 'Service three',
        },
        {
          key: 'service4',
          label: 'Service four',
        },
        {
          key: 'service5',
          label: 'Service five',
        },
        {
          key: 'service6',
          label: 'Service six',
        },
        {
          key: 'service7',
          label: 'Service seven',
        },
        {
          key: 'service8',
          label: 'Service eight',
        },
        {
          key: 'service9',
          label: 'Service nine',
        },
        {
          key: 'service10',
          label: 'Service ten',
        },
        {
          key: 'service11',
          label: 'Service eleven',
        },
        {
          key: 'service12',
          label: 'Service twelve',
        },
        {
          key: 'service13',
          label: 'Service thirteen',
        },
        {
          key: 'service14',
          label: 'Service fourteen',
        },
        {
          key: 'service15',
          label: 'Service fifteen',
        },
        {
          key: 'service16',
          label: 'Service sixteen',
        },
        {
          key: 'service17',
          label: 'Service seventeen',
        },
        {
          key: 'service18',
          label: 'Service eighteen',
        },
        {
          key: 'service19',
          label: 'Service nineteen',
        },
        {
          key: 'service20',
          label: 'Service twenty',
        },
      ],
    },
  },
  {
    id: 'zipcodes',
    label: 'Zip Codes Serviced',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_zipcodes'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: '123567',
          label: '123567',
        },
        {
          key: '98397',
          label: '98397',
        },
        {
          key: '97314',
          label: '97314',
        },
        {
          key: '797389',
          label: '797389',
        },
        {
          key: '916389',
          label: '916389',
        },
      ],
    },
  },
  {
    id: 'amenities',
    label: 'Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: 'towels',
          label: 'Towels',
        },
        {
          key: 'bathroom',
          label: 'Bathroom',
        },
        {
          key: 'swimming_pool',
          label: 'Swimming pool',
        },
        {
          key: 'own_drinks',
          label: 'Own drinks allowed',
        },
        {
          key: 'jacuzzi',
          label: 'Jacuzzi',
        },
        {
          key: 'audiovisual_entertainment',
          label: 'Audiovisual entertainment',
        },
        {
          key: 'barbeque',
          label: 'Barbeque',
        },
        {
          key: 'own_food_allowed',
          label: 'Own food allowed',
        },
      ],
    },
  },
  {
    id: 'manufacturers',
    label: 'Manufacturers',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_manufacturers'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: 'american_range',
          label: 'American Range',
        },
        {
          key: 'cleveland',
          label: 'Cleveland',
        },
        {
          key: 'imperial_brown',
          label: 'Imperial Brown',
        },
        {
          key: 'traulsen',
          label: 'Traulsen',
        },
        {
          key: 'bulman_products',
          label: 'Bulman Products',
        },
        {
          key: `custom_delis_equipment`,
          label: `Custom Deli's Equipment`,
        },
        {
          key: 'evergreen_manufacturing',
          label: 'Evergreen Manufacturing',
        },
        {
          key: 'golden_star',
          label: 'Golden Star',
        },
      ],
    },
  },
];

export const sortConfig = {
  // Enable/disable the sorting control in the SearchPage
  active: true,

  // Note: queryParamName 'sort' is fixed,
  // you can't change it since Flex API expects it to be named as 'sort'
  queryParamName: 'sort',

  // Internal key for the relevance option, see notes below.
  relevanceKey: 'relevance',

  // Keyword filter is sorting the results already by relevance.
  // If keyword filter is active, we need to disable sorting.
  conflictingFilters: ['keyword'],

  options: [
    { key: 'createdAt', label: 'Newest' },
    { key: '-createdAt', label: 'Oldest' },
    { key: '-price', label: 'Lowest price' },
    { key: 'price', label: 'Highest price' },

    // The relevance is only used for keyword search, but the
    // parameter isn't sent to the Marketplace API. The key is purely
    // for handling the internal state of the sorting dropdown.
    { key: 'relevance', label: 'Relevance', longLabel: 'Relevance (Keyword search)' },
  ],
};
