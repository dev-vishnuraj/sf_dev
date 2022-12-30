import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import css from './ListingPage.module.css';

const SectionCertificationsMaybe = props => {
  const { publicData } = props;
  if (!publicData) {
    return null;
  }
  return publicData ? (
    <div className={css.sectionCompanyName}>
      <h2 className={css.companyBioTitle}>
        <FormattedMessage id="EditListingCertificationsPanel.title" />
      </h2>
      <p className={css.cfesaCertified}><FormattedMessage id='Is CFESA Certified : '/>{publicData.cfesaCertified}</p>
      <p className={css.certifiedTechnicians}><FormattedMessage id='Number of certifed technicians : '/>{publicData.certifiedTechnicians}</p>
    </div>
  ) : null;
};

export default SectionCertificationsMaybe;
