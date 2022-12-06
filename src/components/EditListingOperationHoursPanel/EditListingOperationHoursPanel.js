import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
// import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import {
  EditListingBioForm,
  EditListingoperationHoursForm,
  EditListingOperationHoursForm,
} from '../../forms';
// import config from '../../config';

import css from './EditListingOperationHoursPanel.module.css';

const EditListingOperationHoursPanel = props => {
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

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingOperationHoursPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingOperationHoursPanel.createListingTitle" />
  );

  // const categoryOptions = findOptionsForSelectFilter('category', config.custom.filters);
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingOperationHoursForm
        className={css.form}
        initialValues={{
          operationHoursMonday: publicData.operationHoursMonday,
          operationHoursTuesday: publicData.operationHoursTuesday,
          operationHoursWednesday: publicData.operationHoursWednesday,
          operationHoursThursday: publicData.operationHoursThursday,
          operationHoursFriday: publicData.operationHoursFriday,
          operationHoursSaturday: publicData.operationHoursSaturday,
          operationHoursSunday: publicData.operationHoursSunday,
        }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const {
            operationHoursMonday,
            operationHoursTuesday,
            operationHoursWednesday,
            operationHoursThursday,
            operationHoursFriday,
            operationHoursSaturday,
            operationHoursSunday,
          } = values;
          const updateValues = {
            publicData: {
              operationHoursMonday,
              operationHoursTuesday,
              operationHoursWednesday,
              operationHoursThursday,
              operationHoursFriday,
              operationHoursSaturday,
              operationHoursSunday,
            },
          };

          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
      />
    </div>
  );
};

EditListingOperationHoursPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingOperationHoursPanel.propTypes = {
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

export default EditListingOperationHoursPanel;
