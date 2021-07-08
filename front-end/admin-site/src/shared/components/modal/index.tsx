import { createContext, forwardRef, ReactElement } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, Variants } from "framer-motion";
import classNames from "classnames";

import Head, { HeadProps } from "./Head";
import Body, { BodyProps } from "./Body";
import Foot, { FootProps } from "./Foot";
import styles from "./index.module.scss";

interface ContextProps {
  onHide(): void;
}

export const ModalContext = createContext<ContextProps>({
  onHide() {},
});

interface ModalProps {
  center?: boolean;
  classes?: {
    backdrop?: string;
    container?: string;
  };
  onHide(): void;
  open: boolean;
  scroll?: boolean;
  staticBack?: boolean;
  children?: ReactElement<HeadProps> | ReactElement<BodyProps> |ReactElement<FootProps>[];
}

const backdropVariants: Variants = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
  },
};

const containerVariants: Variants = {
  start: {
    y: "-100vh",
    transition: {
      delay: 0.3,
    },
  },
  end: {
    y: 0,
  },
};

const ModalComponent = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      center = true,
      children,
      classes,
      onHide,
      open = false,
      scroll = true,
      staticBack = false,
    },
    ref
  ) => {
    return createPortal(
      <AnimatePresence exitBeforeEnter>
        {open && (
          <motion.div
            ref={ref}
            variants={backdropVariants}
            className={classNames(
              styles.Backdrop,
              classes?.backdrop,
              center && styles.Center
            )}
            initial="start"
            animate="end"
            exit="start"
            onClick={!staticBack ? onHide : undefined}
          >
            <ModalContext.Provider value={{ onHide: onHide }}>
              <motion.div
                onClick={(e) => e.stopPropagation()}
                variants={containerVariants}
                initial="start"
                animate="end"
                className={classNames(
                  styles.Container,
                  scroll && styles.Scroll,
                  classes?.container
                )}
              >
                {children}
              </motion.div>
            </ModalContext.Provider>
          </motion.div>
        )}
      </AnimatePresence>,
      document.getElementById("presentation-modal") as HTMLElement
    );
  }
);

const Modal = Object.assign(ModalComponent, {
  Head: Head,
  Body: Body,
  Foot: Foot,
});

Modal.displayName = "Modal";

export default Modal;
