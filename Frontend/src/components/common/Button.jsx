import React from "react";
import './Button.css'
const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  as: Component = "button",
  className = "",
  ...rest
}) => {
  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};

export default Button;
