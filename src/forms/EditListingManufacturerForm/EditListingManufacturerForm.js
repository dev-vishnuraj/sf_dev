import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldMultiTagsInput } from '../../components';

import css from './EditListingManufacturerForm.module.css';

const MANUFACTURER_LIMIT = 5;

const EditListingManufacturerFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        invalid,
        intl,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;

      const manufacturerMessage = intl.formatMessage({ id: 'EditListingManufacturerForm.manufacturer' });
      const manufacturerPlaceholderMessage = intl.formatMessage({
        id: 'EditListingManufacturerForm.manufacturerPlaceholder',
      });
      const manufacturerRequiredMessage = intl.formatMessage({
        id: 'EditListingManufacturerForm.manufacturerRequired',
      });

      const { updateListingError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingManufacturerForm.profileUpdateFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      
      console.log("11111111111111111111111111111")
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageUpdateListing}
          <FieldTextInput
            id="manufacturer"
            name="manufacturer"
            className={css.manufacturer}
            type="text"
            label={manufacturerMessage}
            placeholder={manufacturerPlaceholderMessage}
            validate={composeValidators(required(manufacturerRequiredMessage))}
            autoFocus
          />
          
          {/* <FieldMultiTagsInput id="manufacturer" name="manufacturer" placeholder={manufacturerPlaceholderMessage}/> */}

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

EditListingManufacturerFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingManufacturerFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditListingManufacturerFormComponent);
