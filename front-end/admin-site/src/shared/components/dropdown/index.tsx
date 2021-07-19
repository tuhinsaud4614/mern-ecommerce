import { ComponentPropsWithRef, ReactElement, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { AnimatePresence, motion, Variants } from "framer-motion";

import Item from "./Item";
import styles from "./index.module.scss";

interface Props {
  relativeElement?: Element | null;
  open: boolean;
  onClose?(): void;
  position?: {
    horizontal?: "left" | "right";
    vertical?: "top" | "bottom";
  };
  children?: ReactElement<ComponentPropsWithRef<"li">>[];
}

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const Dropdown = ({
  relativeElement,
  open,
  position,
  onClose,
  children,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function setPos() {
      const horizontal = position?.horizontal || "left";
      const vertical = position?.vertical || "top";
      if (ref.current) {
        let h = 0,
          v = 16;
        if (relativeElement) {
          const relativeEleProps = relativeElement.getBoundingClientRect();
          const currentEleProps = ref.current.getBoundingClientRect();
          let temp = document.body.offsetWidth - currentEleProps.width;
          let temp1 = window.innerHeight - currentEleProps.height;
          if (horizontal === "left") {
            h =
              relativeEleProps.left + currentEleProps.width <=
              document.body.offsetWidth
                ? relativeEleProps.left
                : temp <= 0
                ? 0
                : temp;
          } else if (horizontal === "right") {
            let right = document.body.offsetWidth - relativeEleProps.right;
            h =
              relativeEleProps.right >= currentEleProps.width
                ? right
                : temp <= 0
                ? 0
                : temp;
          }
          if (vertical === "top") {
            v =
              relativeEleProps.top + currentEleProps.height <=
              window.innerHeight
                ? relativeEleProps.top
                : temp1 <= 0
                ? 0
                : temp1;
          } else if (vertical === "bottom") {
            let bottom = window.innerHeight - relativeEleProps.bottom;
            v =
              relativeEleProps.bottom >= currentEleProps.height
                ? bottom
                : temp1 <= 0
                ? 0
                : temp1;
          }
        }
        ref.current.style[horizontal] = `${h}px`;
        ref.current.style[vertical] = `${v}px`;
      }
    }
    setPos();
    window.addEventListener("resize", setPos);

    return () => window.removeEventListener("resize", setPos);
  }, [relativeElement, position]);

  return createPortal(
    <AnimatePresence exitBeforeEnter>
      {open && (
        <motion.div
          onClick={onClose}
          className={classNames(styles.Backdrop)}
          variants={variants}
          initial="hidden"
          animate={"visible"}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className={classNames(styles.Root)}
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={"visible"}
          >
            <ul className={classNames(styles.Items)}>{children}</ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("presentation-modal") as HTMLDivElement
  );
};

Dropdown.displayName = "Dropdown";

export default Object.assign(Dropdown, {
  Item: Item,
});
