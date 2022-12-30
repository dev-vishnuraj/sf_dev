import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';

import css from './ListingPage.module.css';
import classNames from 'classnames';
import { PaginatedList } from 'react-paginated-list';

const SectionManufacturerMaybe = props => {
  const { publicData } = props;
  if (!publicData) {
    return null;
  }
  // const twoColumns = true;
  // const classes = classNames(rootClassName || css.root, className);
  // const listClasses = twoColumns ? classNames(classes, css.twoColumns) : classes;

  const selectedOptions = publicData && publicData.manufacturers ? publicData.manufacturers : [];
  return (
    <div className={css.sectionManufacturers}>
      <h2 className={css.manufacturersTitle}>
        <FormattedMessage id="EditListingManufacturerPanel.title" />
      </h2>
      <PaginatedList
        list={selectedOptions}
        itemsPerPage={2}
        renderList={list => (
          <>
            {list.map(item => {
              return <div>{item}</div>;
            })}
          </>
        )}
      />
      {/* <PropertyGroup
        id="ListingPage.amenities"
        options={options}
        selectedOptions={selectedOptions}
        twoColumns={true}
      /> */}
    </div>
  );
};

export default SectionManufacturerMaybe;
