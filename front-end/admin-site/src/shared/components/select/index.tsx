import { ChangeEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { FiX } from "react-icons/fi";

import { uniqueArrayOfObject } from "../../utils";
import Items from "./Items";
import Item from "./Item";
import styles from "./index.module.scss";

let counter = 0;

const variants: Variants = {
  blur: {
    boxShadow:
      "0px 2px 4px -1px rgba(0, 0, 0, 0),0px 4px 5px 0px rgba(0, 0, 0, 0), 0px 1px 10px 0px rgba(0, 0, 0, 0)",
  },
  focus: {
    boxShadow:
      "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
  },
};

type OptionType = { name: string; value: string };

interface Props {
  classes?: {
    root?: string;
    content?: string;
    searchBox?: string;
    value?: string;
    values?: string;
    items?: string;
    item?: string;
  };
  hideOnSelect?: boolean;
  multiple?: boolean;
  onSelect?(option: { value: string; values: string[] }): void;
  options: OptionType[];
  searchable?: boolean;
  selected?: OptionType;
}
const Select = ({
  classes,
  hideOnSelect = false,
  multiple = false,
  onSelect,
  options,
  searchable = false,
  selected,
}: Props) => {
  const [allOptions, setAllOptions] = useState<OptionType[]>(options);
  const [focus, setFocus] = useState<boolean>(false);
  const [values, setValues] = useState<OptionType[]>([selected || options[0]]);
  const ref = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const rootClickHandler = () => {
    setFocus(true);
  };

  const selectValue = (value: OptionType) => {
    if (multiple) {
      const temp = uniqueArrayOfObject(values, value, "value");
      if (temp.length !== values.length) {
        setValues(temp);
        onSelect &&
          onSelect({
            value: temp[0].value,
            values: temp.map((el) => el.value),
          });
      }
    } else {
      setValues([value]);
      onSelect && onSelect({ value: value.value, values: [] });
    }
    if (hideOnSelect) {
      setFocus(false);
    }
    setAllOptions(options);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      if (e.target.value === "") {
        setAllOptions(options);
      } else {
        setAllOptions(
          options.filter(
            (el) =>
              el.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
              el.value.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
      }
    }
  };

  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setFocus(false);
        setAllOptions(options);
      }
    };
    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("click", click);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (focus) {
      searchRef.current && searchRef.current.focus();
    }
  }, [focus]);
  return (
    <motion.div
      ref={ref}
      variants={variants}
      onClick={rootClickHandler}
      initial="blur"
      animate={focus ? "focus" : "blur"}
      className={classNames(styles.Root, classes?.root)}
    >
      <div className={classNames(styles.Content, classes?.content)}>
        {values.length === 0 && !focus && <p>Select a value</p>}
        {!multiple && values[0] && (
          <span className={classNames(classes?.value)}>{values[0].name}</span>
        )}
        {multiple &&
          values.map((item) => (
            <span
              key={item.value}
              className={classNames(styles.Pill, classes?.values)}
            >
              {item.name}
              <FiX
                onClick={() => {
                  setValues((prev) => prev.filter((v) => v !== item));
                }}
              />
            </span>
          ))}
        {searchable && focus && (
          <input
            className={classNames(classes?.searchBox)}
            ref={searchRef}
            onChange={onChange}
          />
        )}
      </div>
      <AnimatePresence exitBeforeEnter>
        {focus && (
          <Items className={classes?.items}>
            {allOptions.length ? (
              allOptions.map((el, index) => (
                <Item
                  className={classes?.item}
                  key={index}
                  onClick={() => selectValue(el)}
                >
                  {el.name}
                </Item>
              ))
            ) : (
              <p>No option to select</p>
            )}
          </Items>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

Select.displayName = "Select";
export default Select;
