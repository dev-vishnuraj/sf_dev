import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, FieldCheckboxGroup, FieldTagsInput, Form } from '../../components';

import css from './EditListingZipCodesForm.module.css';

const EditListingZipCodesFormComponent = props => {
  const { zipCodesArray, setZipCodesArray } = props;
  const handleChange = data => {
    setZipCodesArray(data);
  };

  console.log('zipCodesArray = ', zipCodesArray);
  return (
    <FinalForm
      {...props}
      mutators={{ ...arrayMutators }}
      render={formRenderProps => {
        const {
          disabled,
          ready,
          rootClassName,
          className,
          name,
          handleSubmit,
          pristine,
          saveActionMsg,
          updated,
          updateInProgress,
          fetchErrors,
          filterConfig,
        } = formRenderProps;

        const classes = classNames(rootClassName || css.root, className);
        const submitReady = (updated && pristine) || ready;
        const submitInProgress = updateInProgress;
        const submitDisabled = disabled || submitInProgress;

        const { updateListingError, showListingsError } = fetchErrors || {};
        const errorMessage = updateListingError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingZipCodesForm.updateFailed" />
          </p>
        ) : null;

        const errorMessageShowListing = showListingsError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingZipCodesForm.showListingFailed" />
          </p>
        ) : null;
        return (
          <Form className={classes} onSubmit={handleSubmit}>
            {errorMessage}
            {errorMessageShowListing}

            <FieldTagsInput
              id="zipcodes"
              name="zipcodes"
              placeholder="Add New"
              handleChange={handleChange}
              tagArray={zipCodesArray}
            />
            <Button
              className={css.submitButton}
              type="submit"
              inProgress={submitInProgress}
              disabled={submitDisabled}
              ready={submitReady}
            >
              {saveActionMsg}
            </Button>
          </Form>
        );
      }}
    />
  );
};

EditListingZipCodesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingZipCodesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  filterConfig: propTypes.filterConfig,
};

const EditListingZipCodesForm = EditListingZipCodesFormComponent;

export default EditListingZipCodesForm;
