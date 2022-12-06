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

      const operationHoursMondayMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursMonday',
      });
      const operationHoursMondayPlaceholderMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursPlaceholderMonday',
      });
      const operationHoursMondayRequiredMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursRequiredMonday',
      });

      const operationHoursTuesdayMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursTuesday',
      });
      const operationHoursTuesdayPlaceholderMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursPlaceholderTuesday',
      });
      const operationHoursTuesdayRequiredMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursRequiredTuesday',
      });

      const operationHoursWednesdayMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursWednesday',
      });
      const operationHoursWednesdayPlaceholderMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursPlaceholderWednesday',
      });
      const operationHoursWednesdayRequiredMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursRequiredWednesday',
      });

      const operationHoursThursdayMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursThursday',
      });
      const operationHoursThursdayPlaceholderMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursPlaceholderThursday',
      });
      const operationHoursThursdayRequiredMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursRequiredThursday',
      });

      const operationHoursFridayMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursFriday',
      });
      const operationHoursFridayPlaceholderMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursPlaceholderFriday',
      });
      const operationHoursFridayRequiredMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursRequiredFriday',
      });

      const operationHoursSaturdayMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursSaturday',
      });
      const operationHoursSaturdayPlaceholderMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursPlaceholderSaturday',
      });
      const operationHoursSaturdayRequiredMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursRequiredSaturday',
      });

      const operationHoursSundayMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursSunday',
      });
      const operationHoursSundayPlaceholderMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursPlaceholderSunday',
      });
      const operationHoursSundayRequiredMessage = intl.formatMessage({
        id: 'EditListingOperationHoursForm.OperationHoursRequiredSunday',
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

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageUpdateListing}
          <FieldTextInput
            id="operationHoursMonday"
            name="operationHoursMonday"
            className={css.operationHours}
            type="text"
            label={operationHoursMondayMessage}
            placeholder={operationHoursMondayPlaceholderMessage}
            validate={composeValidators(required(operationHoursMondayRequiredMessage))}
            autoFocus
          />

          <FieldTextInput
            id="operationHoursTuesday"
            name="operationHoursTuesday"
            className={css.operationHours}
            type="text"
            label={operationHoursTuesdayMessage}
            placeholder={operationHoursTuesdayPlaceholderMessage}
            validate={composeValidators(required(operationHoursTuesdayRequiredMessage))}
            autoFocus
          />

          <FieldTextInput
            id="operationHoursWednesday"
            name="operationHoursWednesday"
            className={css.operationHours}
            type="text"
            label={operationHoursWednesdayMessage}
            placeholder={operationHoursWednesdayPlaceholderMessage}
            validate={composeValidators(required(operationHoursWednesdayRequiredMessage))}
            autoFocus
          />

          <FieldTextInput
            id="operationHoursThursday"
            name="operationHoursThursday"
            className={css.operationHours}
            type="text"
            label={operationHoursThursdayMessage}
            placeholder={operationHoursThursdayPlaceholderMessage}
            validate={composeValidators(required(operationHoursThursdayRequiredMessage))}
            autoFocus
          />

          <FieldTextInput
            id="operationHoursFriday"
            name="operationHoursFriday"
            className={css.operationHours}
            type="text"
            label={operationHoursFridayMessage}
            placeholder={operationHoursFridayPlaceholderMessage}
            validate={composeValidators(required(operationHoursFridayRequiredMessage))}
            autoFocus
          />

          <FieldTextInput
            id="operationHoursSaturday"
            name="operationHoursSaturday"
            className={css.operationHours}
            type="text"
            label={operationHoursSaturdayMessage}
            placeholder={operationHoursSaturdayPlaceholderMessage}
            validate={composeValidators(required(operationHoursSaturdayRequiredMessage))}
            autoFocus
          />

          <FieldTextInput
            id="operationHoursSunday"
            name="operationHoursSunday"
            className={css.operationHours}
            type="text"
            label={operationHoursSundayMessage}
            placeholder={operationHoursSundayPlaceholderMessage}
            validate={composeValidators(required(operationHoursSundayRequiredMessage))}
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
