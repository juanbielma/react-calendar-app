import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./button.scss";

const Button = ({ classNames = [], ...others }) => {

  const containerCN = classNames.map(cn => `button--${cn}`);

  return (
    <button
      className={classnames("button", containerCN)}
      {...others}
    />
  );
};

Button.propTypes = {
  classNames: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired
};

Button.defaultProps = {
  classNames: [],
  onClick: () => {},
  text: "Button"
};

export default Button;
