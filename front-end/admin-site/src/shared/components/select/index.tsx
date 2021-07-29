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
  multiple?: boolean;
  onSelect?(value: string | string[]): void;
  searchable?: boolean;
  selected?: OptionType;
}
const options = [
  { name: "Hi", value: "hi" },
  { name: "Hello", value: "hello" },
  { name: "Zoo", value: "zoo" },
];
const Select = ({
  multiple = true,
  onSelect,
  searchable = true,
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
        onSelect && onSelect(temp.map((el) => el.value));
      }
    } else {
      setValues([value]);
      onSelect && onSelect(value.value);
    }
    setFocus(false);
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
              el.name.toLowerCase().includes(e.target.value) ||
              el.value.toLowerCase().includes(e.target.value)
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
  }, []);

  useEffect(() => {
    if (focus) {
      searchRef.current && searchRef.current.focus();
    }
  }, [focus]);
  console.log("render", counter++);
  return (
    <motion.div
      ref={ref}
      variants={variants}
      onClick={rootClickHandler}
      initial="blur"
      animate={focus ? "focus" : "blur"}
      className={classNames(styles.Root)}
    >
      <div className={classNames(styles.Content)}>
        {values.length === 0 && !focus && <p>Select a value</p>}
        {!multiple && values[0] && <span>{values[0]}</span>}
        {multiple &&
          values.map((item) => (
            <span key={item.value} className={classNames(styles.Pill)}>
              {item.name}
              <FiX
                onClick={() => {
                  setValues((prev) => prev.filter((v) => v !== item));
                }}
              />
            </span>
          ))}
        {searchable && focus && <input ref={searchRef} onChange={onChange} />}
      </div>
      <AnimatePresence exitBeforeEnter>
        {focus && allOptions.length && (
          <Items>
            {allOptions.map((el, index) => (
              <Item key={index} onClick={() => selectValue(el)}>
                {el.name}
              </Item>
            ))}
          </Items>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

Select.displayName = "Select";
export default Select;
