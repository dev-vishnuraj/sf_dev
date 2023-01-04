import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';

import css from './ListingPage.module.css';
import classNames from 'classnames';
import { PaginatedList } from 'react-paginated-list';

const SectionZipCodesServicedMaybe = props => {
  const { publicData } = props;
  if (!publicData) {
    return null;
  }
  // const twoColumns = true;
  // const classes = classNames(rootClassName || css.root, className);
  // const listClasses = twoColumns ? classNames(classes, css.twoColumns) : classes;

  const selectedOptions = publicData && publicData.zipcodes ? publicData.zipcodes : [];
  return (
    <div className={css.sectionManufacturers}>
      <h2 className={css.manufacturersTitle}>
        <FormattedMessage id="EditListingZipCodesPanel.title" />
      </h2>
    <hr></hr>
      <PaginatedList
        list={selectedOptions}
        itemsPerPage={15}
        renderList={list => (
          <>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {list.map(item => {
                return (
                  <div
                    style={{
                       // border: '2px solid black',
                       margin: '10px 20px',
                       padding: '5px 20px',
                       borderRadius: '25px',
                       backgroundColor: 'lightgray',
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </>
        )}
        useMinimalControls={selectedOptions.length > 15 ? false : true}
        displayNumbers={selectedOptions.length > 15 ? true : false}
      />
    </div>
  );
};

export default SectionZipCodesServicedMaybe;
