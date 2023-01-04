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
      <p className={css.companyName}><strong style={{color: 'red'}}>Name : &emsp; </strong>{publicData.companyName}</p>
      <p className={css.companyEmail}><strong style={{color: 'red'}}>Email : &emsp; </strong>{publicData.companyEmail}</p>
      <p className={css.companyPhone}><strong style={{color: 'red'}}>Phone : &emsp; </strong>{publicData.companyPhone}</p>
      <p className={css.companyAddress}><strong style={{color: 'red'}}>Address : &emsp; </strong>{publicData.companyAddress}</p>
      <p className={css.companyDescription}><strong style={{color: 'red'}}>Description : &emsp; </strong>{publicData.companyDescription}</p>
    </div>
  ) : null;
};

export default SectionCompanyBioMaybe;
