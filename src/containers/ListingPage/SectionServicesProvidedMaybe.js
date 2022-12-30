import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';

import css from './ListingPage.module.css';
import classNames from 'classnames';
import { PaginatedList } from 'react-paginated-list';

const SectionServicesProvidedMaybe = props => {
  const { publicData } = props;
  if (!publicData) {
    return null;
  }
  // const twoColumns = true;
  // const classes = classNames(rootClassName || css.root, className);
  // const listClasses = twoColumns ? classNames(classes, css.twoColumns) : classes;

  const selectedOptions = publicData && publicData.services ? publicData.services : [];
  return (
    <div className={css.sectionManufacturers}>
      <h2 className={css.manufacturersTitle}>
        <FormattedMessage id="EditListingServicesPanel.title" />
      </h2>
      <PaginatedList
        list={selectedOptions}
        itemsPerPage={5}
        renderList={list => (
          <>
            {list.map(item => {
              return <div>{item}</div>;
            })}
          </>
        )}
        useMinimalControls={false}
      />
    </div>
  );
};

export default SectionServicesProvidedMaybe;
