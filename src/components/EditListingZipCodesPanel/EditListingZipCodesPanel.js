import React, { useEffect, useState } from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing, ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';

import css from './EditListingZipCodesPanel.module.css';
import { EditListingZipCodesForm } from '../../forms';

const FEATURES_NAME = 'zipcodes';

const EditListingZipCodesPanel = props => {
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
  const currentListing = ensureOwnListing(listing);
  const { publicData } = currentListing.attributes;

  const [zipCodesArray, setZipCodesArray] = useState([]);

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingZipCodesPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingZipCodesPanel.createListingTitle" />
  );

  const zipcodes = publicData && publicData?.zipcodes;
  const initialValues = { zipcodes };
  console.log('publicData = ', publicData);
  useEffect(() => {
    if (initialValues?.zipcodes?.length) {
      setZipCodesArray(initialValues?.zipcodes || []);
    }

    return () => {
      // second
    };
  }, [JSON.stringify(initialValues?.zipcodes)]);

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingZipCodesForm
        className={css.form}
        initialValues={initialValues}
        onSubmit={values => {
          const updatedValues = {
            publicData: { zipcodes: zipCodesArray },
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
        setZipCodesArray={setZipCodesArray}
        zipCodesArray={zipCodesArray}
      />
    </div>
  );
};

EditListingZipCodesPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

EditListingZipCodesPanel.propTypes = {
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

export default EditListingZipCodesPanel;
