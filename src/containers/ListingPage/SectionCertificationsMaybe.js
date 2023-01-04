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
          <p className={css.cfesaCertified}>
            <h4 style={{ fontWeight: 'bold', color: 'red' }}>
              Is CFESA Certified : &emsp;{' '}
              <strong style={{ color: 'black' }}>{publicData.cfesaCertified}</strong>
            </h4>
          </p>
        </div>
        <div>
          <p className={css.certifiedTechnicians}>
            <h4 style={{ fontWeight: 'bold', color: 'red' }}>
              Number of certifed technicians : &emsp;{' '}
              <strong style={{ color: 'black' }}>{publicData.certifiedTechnicians}</strong>
            </h4>
          </p>
        </div>
      </div>
    </div>
  ) : null;
};

export default SectionCertificationsMaybe;
