import React, { useEffect, useState } from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
// import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingBioForm, EditListingManufacturerForm } from '../../forms';
// import config from '../../config';

import css from './EditListingManufacturerPanel.module.css';

const EditListingManufacturerPanel = props => {
  const {
    className,
    rootClassName,
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

  const [manufacturerArray, setManufacturerArray] = useState([]);

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingManufacturerPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingManufacturerPanel.createListingTitle" />
  );
  const manufacturer = publicData && publicData?.manufacturer;
  const initialValues = { manufacturer };
  useEffect(() => {
    if (initialValues?.manufacturer.length) {
      setManufacturerArray(initialValues?.manufacturer);
    }

    return () => {
      // second
    };
  }, [JSON.stringify(initialValues?.manufacturer)]);

  // const categoryOptions = findOptionsForSelectFilter('category', config.custom.filters);
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingManufacturerForm
        className={css.form}
        initialValues={initialValues}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const updatedValues = {
            publicData: { manufacturer: manufacturerArray },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        setManufacturerArray={setManufacturerArray}
        manufacturerArray={manufacturerArray}
      />
    </div>
  );
};

EditListingManufacturerPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingManufacturerPanel.propTypes = {
  className: string,
  rootClassName: string,

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

export default EditListingManufacturerPanel;
