import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing } from '../../util/data';
import { EditListingPaymentMethodsForm } from '../../forms';
import { ListingLink } from '..';

import css from './EditListingPaymentMethodsPanel.module.css';

const FEATURES_NAME = 'Payment Methods';

const EditListingPaymentMethodsPanel = props => {
  const {
    rootClassName,
    className,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const { publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingPaymentMethodsPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingPaymentMethodsPanel.createListingTitle" />
  );

  const paymentMethods = publicData && publicData.paymentMethods;
  const initialValues = { paymentMethods };

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingPaymentMethodsForm
        className={css.form}
        name={FEATURES_NAME}
        initialValues={initialValues}
        onSubmit={values => {
          const { paymentMethods = [] } = values;

          const updatedValues = {
            publicData: { paymentMethods },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
      />
    </div>
  );
};

EditListingPaymentMethodsPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditListingPaymentMethodsPanel.propTypes = {
  rootClassName: string,
  className: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingPaymentMethodsPanel;
