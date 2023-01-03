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
      <hr></hr>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div>
          <h4 style={{fontWeight: 'bold'}}>Is CFESA Certified : </h4>
          <p className={css.cfesaCertified}>
            {publicData.cfesaCertified}
          </p>
        </div>
        <div>
        <h4 style={{fontWeight: 'bold'}}>Number of certifed technicians : </h4>
          <p className={css.certifiedTechnicians}>
            {publicData.certifiedTechnicians}
          </p>
        </div>
      </div>
    </div>
  ) : null;
};

export default SectionCertificationsMaybe;
