const bookingForm = (
  <FinalForm
    onSubmit={values => this.handleSubmit(values)}
    render={fieldRenderProps => {
      const { handleSubmit } = fieldRenderProps;
      return (
        <Form onSubmit={handleSubmit}>
          {showInitialMessageInput ? (
            <div>
              <h3 className={css.messageHeading}>
                <FormattedMessage id="StripePaymentForm.messageHeading" />
              </h3>

              <FieldTextInput
                type="textarea"
                id={`bookingForm-message`}
                name="initialMessage"
                label={initialMessageLabel}
                placeholder={messagePlaceholder}
                className={css.message}
              />
            </div>
          ) : null}
          <div className={css.submitContainer}>
            <PrimaryButton
              className={css.submitButton}
              type="submit"
              inProgress={this.state.submitting}
              disabled={false}
            >
              Confirm booking
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);