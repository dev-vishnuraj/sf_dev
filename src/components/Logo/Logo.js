import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import config from '../../config';
import IconLogo from './logo.png';
import LogoImage from './service_finder.png';
import css from './Logo.module.css';

const Logo = props => {
  const { className, format, ...rest } = props;
  const mobileClasses = classNames(css.logoMobile, className);

  if (format === 'desktop') {
    return <img height={50} width={200} src={LogoImage} alt={config.siteTitle} {...rest} />;
  }

  return <img height={80} width={100} src={IconLogo} alt={config.siteTitle} {...rest} />;
};

const { oneOf, string } = PropTypes;

Logo.defaultProps = {
  className: null,
  format: 'desktop',
};

Logo.propTypes = {
  className: string,
  format: oneOf(['desktop', 'mobile']),
};

export default Logo;