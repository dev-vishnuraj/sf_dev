import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import css from './ListingPage.module.css';

const SectionOperationHoursMaybe = props => {
  const { publicData } = props;
  if (!publicData) {
    return null;
  }
  return publicData ? (
    <div className={css.sectionOperationHoursProfileView}>
      <div className={css.sectionCompanyName}>
        <h2 className={css.companyBioTitle}>
          <FormattedMessage id="EditListingOperationHoursPanel.title" />
        </h2>
        <p className={css.operationHoursMonday}>{publicData.operationHoursMonday}</p>
        <p className={css.operationHoursWednesday}>{publicData.operationHoursWednesday}</p>
        <p className={css.operationHoursFriday}>{publicData.operationHoursFriday}</p>
        <p className={css.operationHoursSunday}>{publicData.operationHoursSunday}</p>
      </div>
      <div className={css.sectionCompanyName}>
        <p className={css.operationHoursTuesday}>{publicData.operationHoursTuesday}</p>
        <p className={css.operationHoursThursday}>{publicData.operationHoursThursday}</p>
        <p className={css.operationHoursSaturday}>{publicData.operationHoursSaturday}</p>
      </div>
    </div>
  ) : null;
};

export default SectionOperationHoursMaybe;
