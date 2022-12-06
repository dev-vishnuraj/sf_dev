import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldRadioButton } from '../../components';

import css from './EditListingCertificationsForm.module.css';

const EditListingCertificationsFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        categories,
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;

      const certifiedTechniciansMessage = intl.formatMessage({
        id: 'EditListingCertificationsForm.certifiedTechnicians',
      });
      const certifiedTechniciansPlaceholderMessage = intl.formatMessage({
        id: 'EditListingCertificationsForm.certifiedTechniciansPlaceholder',
      });
      const certifiedTechniciansRequiredMessage = intl.formatMessage({
        id: 'EditListingCertificationsForm.certifiedTechniciansRequired',
      });

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingCertificationsForm.profileUpdateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingCertificationsForm.createProfileDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingCertificationsForm.showProfileFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const showAsRequired = pristine && required;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}

          <p style={{fontSize: '20px'}}>Is <strong>CFESA</strong> Certified</p>

          <FieldRadioButton
            id={'cfesa_certified_yes'}
            name="cfesaCertified"
            label="Yes"
            value="yes"
            showAsRequired={showAsRequired}
          />

          <FieldRadioButton
            id={'cfesa_certified_no'}
            name="cfesaCertified"
            label="No"
            value="no"
            showAsRequired={showAsRequired}
          />

          <FieldTextInput
            id="certifiedTechnicians"
            name="certifiedTechnicians"
            className={css.certifiedTechnicians}
            type="text"
            label={certifiedTechniciansMessage}
            placeholder={certifiedTechniciansPlaceholderMessage}
            autoFocus
            validate={composeValidators(required(certifiedTechniciansRequiredMessage))}
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

EditListingCertificationsFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingCertificationsFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingCertificationsFormComponent);
