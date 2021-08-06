import {
  ComponentPropsWithoutRef,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import classNames from "classnames";

import { range } from "../../utils";
import styles from "./index.module.scss";

interface PageProps {
  active?: boolean;
  children?: ReactNode;
  className?: string;
  onClick?(): void;
  disabled?: boolean;
}
const Page = ({
  active = false,
  className,
  children,
  disabled = false,
  onClick,
}: PageProps) => {
  return (
    <li>
      <button
        className={classNames(styles.Page, active && styles.Active, className)}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </li>
  );
};
Page.displayName = "Pagination.Page";

interface Props extends ComponentPropsWithoutRef<"nav"> {
  classes?: {
    pages?: string;
    page?: string;
  };
  count?: number;
  current?: number;
  hideNextBtn?: boolean;
  hidePrevBtn?: boolean;
  onTap?(page: number): void;
  showFirstBtn?: boolean;
  showLastBtn?: boolean;
}

const Pagination = ({
  classes,
  className,
  count = 10,
  current = 1,
  hideNextBtn = false,
  hidePrevBtn = false,
  onTap,
  showFirstBtn = false,
  showLastBtn = false,
  ...rest
}: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(
    current < 1 || current > count ? 1 : current
  );

  const clickHandler = (index: number, action?: "prev" | "next") => {
    if (action) {
      if (action === "prev" && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else if (action === "next" && currentPage < count) {
        setCurrentPage((prev) => prev + 1);
      }
    } else {
      setCurrentPage(index);
    }
  };

  useEffect(() => {
    onTap && onTap(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const start =
    currentPage < 2 ? 2 : currentPage > count - 3 ? count - 3 : currentPage;
  return (
    <nav className={classNames(styles.Root, className)} {...rest}>
      <ol className={classNames(styles.Pages, classes?.pages)}>
        {showFirstBtn && (
          <Page className={classes?.page} onClick={() => clickHandler(1)}>
            <FiChevronsLeft />
          </Page>
        )}
        {!hidePrevBtn && (
          <Page
            className={classes?.page}
            onClick={() => clickHandler(1, "prev")}
            disabled={currentPage === 1}
          >
            <FiChevronLeft />
          </Page>
        )}
        {count >= 8 && (
          <Page
            className={classes?.page}
            onClick={() => clickHandler(1)}
            active={1 === currentPage}
          >
            1
          </Page>
        )}
        {count >= 8 && currentPage > 2 && <li className={styles.Gap}>...</li>}
        {range(count >= 8 ? start : 1, count >= 8 ? start + 2 : count).map(
          (item) => (
            <Page
              key={item}
              className={classes?.page}
              onClick={() => clickHandler(item)}
              active={item === currentPage}
            >
              {item}
            </Page>
          )
        )}
        {count >= 8 && currentPage < count - 3 && (
          <li className={styles.Gap}>...</li>
        )}
        {count >= 8 && (
          <Page
            className={classes?.page}
            onClick={() => clickHandler(count)}
            active={count === currentPage}
          >
            {count}
          </Page>
        )}
        {!hideNextBtn && (
          <Page
            className={classes?.page}
            onClick={() => clickHandler(1, "next")}
            disabled={currentPage === count}
          >
            <FiChevronRight />
          </Page>
        )}
        {showLastBtn && (
          <Page className={classes?.page} onClick={() => clickHandler(count)}>
            <FiChevronsRight />
          </Page>
        )}
      </ol>
    </nav>
  );
};

Pagination.displayName = "Pagination";
export default Pagination;
