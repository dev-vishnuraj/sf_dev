import React, { Component } from 'react';
import { array, bool, func, number, object, oneOf, shape, string } from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { withViewport } from '../../util/contextHelpers';
import { propTypes } from '../../util/types';
import {
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_NEW,
  LISTING_PAGE_PARAM_TYPES,
} from '../../util/urlHelpers';
import { ensureListing } from '../../util/data';

import { NamedRedirect, Tabs } from '../../components';

import EditListingWizardTab, {
  BIO,
  MANUFACTURERS,
  OPERATION_HOURS,
  PAYMENT_METHODS,
  SERVICES,
  CERTIFICATIONS,
  ZIP_CODES,
} from './EditListingWizardTab';
import css from './EditListingWizard.module.css';

// Show availability calendar only if environment variable availabilityEnabled is true
// const availabilityMaybe = config.enableAvailability ? [AVAILABILITY] : [];

// You can reorder these panels.
// Note 1: You need to change save button translations for new listing flow
// Note 2: Ensure that draft listing is created after the first panel
// and listing publishing happens after last panel.
export const TABS = [
  BIO,
  MANUFACTURERS,
  OPERATION_HOURS,
  PAYMENT_METHODS,
  SERVICES,
  CERTIFICATIONS,
  ZIP_CODES,
];

// Tabs are horizontal in small screens
const MAX_HORIZONTAL_NAV_SCREEN_WIDTH = 1023;

const tabLabel = (intl, tab) => {
  let key = null;
  if (tab === BIO) {
    key = 'EditListingWizard.tabLabelBio';
  } else if (tab === MANUFACTURERS) {
    key = 'EditListingWizard.tabLabelManufacturers';
  } else if (tab === OPERATION_HOURS) {
    key = 'EditListingWizard.tabLabelOperationHours';
  } else if (tab === PAYMENT_METHODS) {
    key = 'EditListingWizard.tabLabelPaymentMethods';
  } else if (tab === SERVICES) {
    key = 'EditListingWizard.tabLabelServices';
  } else if (tab === CERTIFICATIONS) {
    key = 'EditListingWizard.tabLabelCertifications';
  } else if (tab === ZIP_CODES) {
    key = 'EditListingWizard.tabLabelZipCodes';
  }

  return intl.formatMessage({ id: key });
};

/**
 * Check if a wizard tab is completed.
 *
 * @param tab wizard's tab
 * @param listing is contains some specific data if tab is completed
 *
 * @return true if tab / step is completed.
 */
const tabCompleted = (tab, listing) => {
  const {
    publicData,
  } = listing.attributes;

  switch (tab) {
    case BIO:
      return !!(
        publicData &&
        publicData.companyName &&
        publicData.companyEmail &&
        publicData.companyPhone &&
        publicData.companyAddress &&
        publicData.companyDescription
      );
    case MANUFACTURERS:
      return !!(publicData && publicData.manufacturer);
    case OPERATION_HOURS:
      return !!(publicData && publicData.operationHours);
    case PAYMENT_METHODS:
      return !!(publicData && publicData.paymentMethods);
    case SERVICES:
      return !!(publicData && publicData.services);
    case CERTIFICATIONS:
      return !!(
        publicData &&
        publicData.cfesaCertified &&
        publicData.certifiedTechnicians
      );
    case ZIP_CODES:
      return !!(publicData && publicData.zipCodesServiced);
    default:
      return false;
  }
};

/**
 * Check which wizard tabs are active and which are not yet available. Tab is active if previous
 * tab is completed. In edit mode all tabs are active.
 *
 * @param isNew flag if a new listing is being created or an old one being edited
 * @param listing data to be checked
 *
 * @return object containing activity / editability of different tabs of this wizard
 */
const tabsActive = (isNew, listing) => {
  return TABS.reduce((acc, tab) => {
    const previousTabIndex = TABS.findIndex(t => t === tab) - 1;
    const isActive =
      previousTabIndex >= 0 ? !isNew || tabCompleted(TABS[previousTabIndex], listing) : true;
    return { ...acc, [tab]: isActive };
  }, {});
};

const scrollToTab = (tabPrefix, tabId) => {
  const el = document.querySelector(`#${tabPrefix}_${tabId}`);
  if (el) {
    el.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }
};

// Create a new or edit listing through EditListingWizard
class EditListingWizard extends Component {
  constructor(props) {
    super(props);

    // Having this info in state would trigger unnecessary rerendering
    this.hasScrolledToTab = false;

    this.state = {
      draftId: null,
      showPayoutDetails: false,
    };
    this.handleCreateFlowTabScrolling = this.handleCreateFlowTabScrolling.bind(this);
    this.handlePublishListing = this.handlePublishListing.bind(this);
    this.handlePayoutModalClose = this.handlePayoutModalClose.bind(this);
    this.handlePayoutSubmit = this.handlePayoutSubmit.bind(this);
  }

  componentDidMount() {
    const { stripeOnboardingReturnURL } = this.props;

    if (stripeOnboardingReturnURL != null && !this.showPayoutDetails) {
      this.setState({ showPayoutDetails: true });
    }
  }

  handleCreateFlowTabScrolling(shouldScroll) {
    this.hasScrolledToTab = shouldScroll;
  }

  handlePublishListing(id) {
    this.props.onPublishListingDraft(id);
  }

  handlePayoutModalClose() {
    this.setState({ showPayoutDetails: false });
  }

  handlePayoutSubmit(values) {
    this.props
      .onPayoutDetailsSubmit(values)
      .then(response => {
        this.props.onManageDisableScrolling('EditListingWizard.payoutModal', false);
      })
      .catch(() => {
        // do nothing
      });
  }

  render() {
    const {
      id,
      className,
      rootClassName,
      params,
      listing,
      viewport,
      intl,
      errors,
      fetchInProgress,
      onManageDisableScrolling,
      onPayoutDetailsFormChange,
      getAccountLinkInProgress,
      currentUser,
      ...rest
    } = this.props;

    const selectedTab = params.tab;
    const isNewListingFlow = [LISTING_PAGE_PARAM_TYPE_NEW, LISTING_PAGE_PARAM_TYPE_DRAFT].includes(
      params.type
    );
    const rootClasses = rootClassName || css.root;
    const classes = classNames(rootClasses, className);
    const currentListing = ensureListing(listing);
    const tabsStatus = tabsActive(isNewListingFlow, currentListing);

    // If selectedTab is not active, redirect to the beginning of wizard
    if (!tabsStatus[selectedTab]) {
      const currentTabIndex = TABS.indexOf(selectedTab);
      const nearestActiveTab = TABS.slice(0, currentTabIndex)
        .reverse()
        .find(t => tabsStatus[t]);

      return <NamedRedirect name="EditListingPage" params={{ ...params, tab: nearestActiveTab }} />;
    }

    const { width } = viewport;
    const hasViewport = width > 0;
    const hasHorizontalTabLayout = hasViewport && width <= MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
    const hasVerticalTabLayout = hasViewport && width > MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
    const hasFontsLoaded =
      hasViewport && document.documentElement.classList.contains('fontsLoaded');

    // Check if scrollToTab call is needed (tab is not visible on mobile)
    if (hasVerticalTabLayout) {
      this.hasScrolledToTab = true;
    } else if (hasHorizontalTabLayout && !this.hasScrolledToTab && hasFontsLoaded) {
      const tabPrefix = id;
      scrollToTab(tabPrefix, selectedTab);
      this.hasScrolledToTab = true;
    }

    const tabLink = tab => {
      return { name: 'EditListingPage', params: { ...params, tab } };
    };

    return (
      <div className={classes}>
        <Tabs
          rootClassName={css.tabsContainer}
          navRootClassName={css.nav}
          tabRootClassName={css.tab}
        >
          {TABS.map(tab => {
            return (
              <EditListingWizardTab
                {...rest}
                key={tab}
                tabId={`${id}_${tab}`}
                tabLabel={tabLabel(intl, tab)}
                tabLinkProps={tabLink(tab)}
                selected={selectedTab === tab}
                disabled={isNewListingFlow && !tabsStatus[tab]}
                tab={tab}
                intl={intl}
                params={params}
                listing={listing}
                marketplaceTabs={TABS}
                errors={errors}
                handleCreateFlowTabScrolling={this.handleCreateFlowTabScrolling}
                handlePublishListing={this.handlePublishListing}
                fetchInProgress={fetchInProgress}
              />
            );
          })}
        </Tabs>
      </div>
    );
  }
}

EditListingWizard.defaultProps = {
  className: null,
  currentUser: null,
  rootClassName: null,
  listing: null,
  updateInProgress: false,
};

EditListingWizard.propTypes = {
  id: string.isRequired,
  className: string,
  currentUser: propTypes.currentUser,
  rootClassName: string,
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(LISTING_PAGE_PARAM_TYPES).isRequired,
    tab: oneOf(TABS).isRequired,
  }).isRequired,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: shape({
    attributes: shape({
      publicData: object,
      description: string,
      geolocation: object,
      pricing: object,
      title: string,
    }),
    images: array,
  }),

  errors: shape({
    createListingDraftError: object,
    updateListingError: object,
    publishListingError: object,
    showListingsError: object,
    uploadImageError: object,
  }).isRequired,

  fetchInProgress: bool.isRequired,
  getAccountLinkInProgress: bool.isRequired,
  onManageDisableScrolling: func.isRequired,

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default compose(withViewport, injectIntl)(EditListingWizard);
