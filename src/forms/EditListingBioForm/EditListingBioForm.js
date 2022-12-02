import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput } from '../../components';

import css from './EditListingBioForm.module.css';

const TITLE_MAX_LENGTH = 60;
const DESCRIPTION_MAX_LENGTH = 1024;

const EditListingBioFormComponent = props => (
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
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingBioForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const descriptionMaxLengthMessage = intl.formatMessage(
        { id: 'EditListingBioForm.maxLength' },
        {
          maxLength: DESCRIPTION_MAX_LENGTH,
        }
      );

      const companyNameMessage = intl.formatMessage({ id: 'EditListingBioForm.companyName' });
      const companyNamePlaceholderMessage = intl.formatMessage({
        id: 'EditListingBioForm.companyNamePlaceholder',
      });
      const companyNameRequiredMessage = intl.formatMessage({
        id: 'EditListingBioForm.companyNameRequired',
      });

      const companyEmailMessage = intl.formatMessage({ id: 'EditListingBioForm.companyEmail' });
      const companyEmailPlaceholderMessage = intl.formatMessage({
        id: 'EditListingBioForm.companyEmailPlaceholder',
      });
      const companyEmailRequiredMessage = intl.formatMessage({
        id: 'EditListingBioForm.companyEmailRequired',
      });

      const companyPhoneMessage = intl.formatMessage({ id: 'EditListingBioForm.companyPhone' });
      const companyPhonePlaceholderMessage = intl.formatMessage({
        id: 'EditListingBioForm.companyPhonePlaceholder',
      });
      const companyPhoneRequiredMessage = intl.formatMessage({
        id: 'EditListingBioForm.companyPhoneRequired',
      });

      const companyAddressMessage = intl.formatMessage({ id: 'EditListingBioForm.companyAddress' });
      const companyAddressPlaceholderMessage = intl.formatMessage({
        id: 'EditListingBioForm.companyAddressPlaceholder',
      });
      const companyAddressRequiredMessage = intl.formatMessage({
        id: 'EditListingBioForm.companyAddressRequired',
      });

      const companyDescriptionMessage = intl.formatMessage({
        id: 'EditListingBioForm.companyDescription',
      });
      const companyDescriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingBioForm.companyDescriptionPlaceholder',
      });
      const companyDescriptionRequiredMessage = intl.formatMessage({
        id: 'EditListingBioForm.companyDescriptionRequired',
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const maxLength1024Message = maxLength(descriptionMaxLengthMessage, DESCRIPTION_MAX_LENGTH);

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingBioForm.profileUpdateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingBioForm.createProfileDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingBioForm.showProfileFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <FieldTextInput
            id="companyName"
            name="companyName"
            className={css.companyName}
            type="text"
            label={companyNameMessage}
            placeholder={companyNamePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(companyNameRequiredMessage))}
            autoFocus
          />

          <FieldTextInput
            id="companyEmail"
            name="companyEmail"
            className={css.companyEmail}
            type="text"
            label={companyEmailMessage}
            placeholder={companyEmailPlaceholderMessage}
            validate={composeValidators(required(companyEmailRequiredMessage))}
          />

          <FieldTextInput
            id="companyPhone"
            name="companyPhone"
            className={css.companyPhone}
            type="text"
            label={companyPhoneMessage}
            placeholder={companyPhonePlaceholderMessage}
            validate={composeValidators(required(companyPhoneRequiredMessage))}
          />

          <FieldTextInput
            id="companyAddress"
            name="companyAddress"
            className={css.companyAddress}
            type="text"
            label={companyAddressMessage}
            placeholder={companyAddressPlaceholderMessage}
            validate={composeValidators(required(companyAddressRequiredMessage))}
          />

          <FieldTextInput
            id="companyDescription"
            name="companyDescription"
            className={css.companyDescription}
            type="textarea"
            label={companyDescriptionMessage}
            placeholder={companyDescriptionPlaceholderMessage}
            validate={composeValidators(
              required(companyDescriptionRequiredMessage),
              maxLength1024Message
            )}
          />

          {/* <CustomCategorySelectFieldMaybe
            id="category"
            name="category"
            categories={categories}
            intl={intl}
          /> */}

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

EditListingBioFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingBioFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingBioFormComponent);
