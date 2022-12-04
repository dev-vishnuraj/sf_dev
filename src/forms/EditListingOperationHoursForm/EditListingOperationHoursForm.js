import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldMultiTagsInput } from '../../components';

import css from './EditListingOperationHoursForm.module.css';

// const operationHours_LIMIT = 5;

const EditListingOperationHoursFormComponent = props => (
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

      const operationHoursMessage = intl.formatMessage({ id: 'EditListingOperationHoursForm.OperationHours' });
      const operationHoursPlaceholderMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursPlaceholder',
      });
      const operationHoursRequiredMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursRequired',
      });

      const { updateListingError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingOperationHoursForm.profileUpdateFailed" />
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
            id="operationHours"
            name="operationHours"
            className={css.operationHours}
            type="text"
            label={operationHoursMessage}
            placeholder={operationHoursPlaceholderMessage}
            validate={composeValidators(required(operationHoursRequiredMessage))}
            autoFocus
          />
          
          {/* <FieldMultiTagsInput id="operationHours" name="operationHours" placeholder={operationHoursPlaceholderMessage}/> */}

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

EditListingOperationHoursFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingOperationHoursFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingOperationHoursFormComponent);
