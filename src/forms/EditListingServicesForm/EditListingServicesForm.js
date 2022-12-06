import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, FieldCheckboxGroup, FieldTagsInput, Form } from '../../components';

import css from './EditListingServicesForm.module.css';

const EditListingServicesFormComponent = props => {
  const { servicesArray, setServicesArray } = props;
  const handleChange = data => {
    setServicesArray(data);
  };
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
          intl,
          updated,
          updateInProgress,
          fetchErrors,
          filterConfig,
        } = formRenderProps;

        // const errorMessageUpdateListing = updateListingError ? (
        //   <p className={css.error}>
        //     <FormattedMessage id="EditListingManufacturerForm.profileUpdateFailed" />
        //   </p>
        // ) : null;
        const classes = classNames(rootClassName || css.root, className);
        const submitReady = (updated && pristine) || ready;
        const submitInProgress = updateInProgress;
        const submitDisabled = disabled || submitInProgress;


        const { updateListingError, showListingsError } = fetchErrors || {};
        const errorMessage = updateListingError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingServicesForm.updateFailed" />
          </p>
        ) : null;

        const errorMessageShowListing = showListingsError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingServicesForm.showListingFailed" />
          </p>
        ) : null;

        return (
          <Form className={classes} onSubmit={handleSubmit}>
            {/* {errorMessageUpdateListing} */}

            <FieldTagsInput
              id="services"
              name="services"
              placeholder="Add New"
              handleChange={handleChange}
              tagArray={servicesArray}
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

EditListingServicesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingServicesFormComponent.propTypes = {
  rootClassName: string,
  // intl: intlShape.isRequired,
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

const EditListingServicesForm = EditListingServicesFormComponent;

export default EditListingServicesForm;
