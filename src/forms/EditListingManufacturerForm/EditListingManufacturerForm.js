import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
// import { maxLength, required, composeValidators } from '../../util/validators';
import {
  Form,
  Button,
  // FieldTextInput,
  // FieldMultiTagsInput,
  // FieldTagsInput,
  FieldCheckboxGroup,
} from '../../components';

import css from './EditListingManufacturerForm.module.css';
import { findOptionsForSelectFilter } from '../../util/search';
import config from '../../config';

// const MANUFACTURER_LIMIT = 5;

const EditListingManufacturerFormComponent = props => {
  // const { manufacturerArray, setManufacturerArray } = props;
  // const handleChange = data => {
  //   setManufacturerArray(data);
  // };
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

        // const manufacturerMessage = intl.formatMessage({
        //   id: 'EditListingManufacturerForm.manufacturers',
        // });
        // const manufacturerPlaceholderMessage = intl.formatMessage({
        //   id: 'EditListingManufacturerForm.manufacturerPlaceholder',
        // });
        // const manufacturerRequiredMessage = intl.formatMessage({
        //   id: 'EditListingManufacturerForm.manufacturerRequired',
        // });
        const classes = classNames(rootClassName || css.root, className);
        const submitReady = (updated && pristine) || ready;
        const submitInProgress = updateInProgress;
        const submitDisabled = disabled || submitInProgress;
  
        const { updateListingError, showListingsError } = fetchErrors || {};
        const errorMessageUpdateListing = updateListingError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingManufacturerForm.profileUpdateFailed" />
          </p>
        ) : null;

        const options = findOptionsForSelectFilter('manufacturers', filterConfig);
        return (
          <Form className={classes} onSubmit={handleSubmit}>
            {errorMessageUpdateListing}

            {/* <FieldTagsInput
              id="manufacturers"
              name="manufacturers"
              placeholder="Add New"
              handleChange={handleChange}
              tagArray={manufacturerArray}
            /> */}

            <FieldCheckboxGroup
              className={css.manufacturers}
              id={name}
              name={name}
              options={options}
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

EditListingManufacturerFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingManufacturerFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingManufacturerFormComponent);
