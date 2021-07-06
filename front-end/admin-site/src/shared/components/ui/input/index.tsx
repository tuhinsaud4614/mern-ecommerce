import {
  ElementType,
  FocusEvent,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  useState,
} from "react";
import { motion, Variants } from "framer-motion";
import { IconType } from "react-icons";
import classNames from "classnames";

import HelperText from "./helper-text";
import Label from "./label";
import styles from "./index.module.scss";

type InputControl = HTMLInputElement | HTMLTextAreaElement;
interface Props extends HTMLAttributes<InputControl> {
  label?: string;
  helperText?: string;
  classes?: {
    wrapper?: string;
    container?: string;
    root?: string;
    label?: string;
    helper?: string;
  };
  multiline?: boolean;
  rows?: number;
  resize?: boolean;
  icon?:
    | ReactElement<IconType>
    | [ReactElement<IconType>, ReactElement<IconType>];
  iconTap?: () => void;
  valid?: boolean;
  required?: boolean;
}

const variants: Variants = {
  blur: {
    opacity: 0.8,
    scale: 0.995,
    boxShadow:
      "0px 2px 4px -1px rgba(0, 0, 0, 0),0px 4px 5px 0px rgba(0, 0, 0, 0), 0px 1px 10px 0px rgba(0, 0, 0, 0)",
  },
  focus: {
    opacity: 1,
    scale: 1,
    boxShadow:
      "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
  },
};

const Input = forwardRef<InputControl, Props>(
  (
    {
      id,
      label,
      classes,
      onFocus,
      onBlur,
      multiline,
      icon,
      iconTap,
      rows = 4,
      resize = false,
      valid = true,
      helperText,
      required = false,
      ...rest
    },
    ref
  ) => {
    const [focused, setFocused] = useState<boolean>(false);
    const [iconIndex, setIconIndex] = useState<number>(0);

    const Component: "input" | "textarea" | ElementType = multiline
      ? ("textarea" as ElementType)
      : ("input" as ElementType);

    const iconSwitcher = () => {
      if (icon && iconTap) {
        iconTap();
      }
      if (icon && Array.isArray(icon)) {
        setIconIndex((prev) => (prev === 0 ? 1 : 0));
      }
    };

    return (
      <div className={classNames(classes?.wrapper, styles.Wrapper)} >
        {label && (
          <Label className={classes?.label} id={id} required={required}>
            {label}
          </Label>
        )}
        <motion.div
          className={classNames(styles.Container, classes?.container)}
          variants={variants}
          initial="blur"
          animate={focused ? "focus" : "blur"}
        >
          {icon && !multiline && (
            <span
              onClick={iconSwitcher}
              className={classNames(
                (iconTap || Array.isArray(icon)) && styles.Icon
              )}
            >
              {Array.isArray(icon) ? icon[iconIndex] : icon}
            </span>
          )}
          <Component
            style={{ resize: resize ? "auto" : "none" }}
            className={classNames(styles.Root, classes?.root)}
            onFocus={(e: FocusEvent<InputControl>) => {
              setFocused(true);
              onFocus && onFocus(e);
            }}
            onBlur={(e: FocusEvent<InputControl>) => {
              setFocused(false);
              onBlur && onBlur(e);
            }}
            rows={rows}
            ref={ref}
            required={required}
            {...rest}
          />
        </motion.div>
        {helperText && <HelperText>{helperText}</HelperText>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
