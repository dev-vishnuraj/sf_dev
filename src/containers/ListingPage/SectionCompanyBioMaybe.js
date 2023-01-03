import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import css from './ListingPage.module.css';

const SectionCompanyBioMaybe = props => {
  const { publicData } = props;
  if (!publicData) {
    return null;
  }
  return publicData ? (
    <div className={css.sectionCompanyName}>
      <h2 className={css.companyBioTitle}>
        <FormattedMessage id="EditListingBioPanel.title" />
      </h2>
      <hr></hr>
      <p className={css.companyName}>{publicData.companyName}</p>
      <p className={css.companyEmail}>{publicData.companyEmail}</p>
      <p className={css.companyPhone}>{publicData.companyPhone}</p>
      <p className={css.companyAddress}>{publicData.companyAddress}</p>
      <p className={css.companyDescription}>{publicData.companyDescription}</p>
    </div>
  ) : null;
};

export default SectionCompanyBioMaybe;
