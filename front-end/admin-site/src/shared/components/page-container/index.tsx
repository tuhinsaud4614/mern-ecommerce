import { ReactNode } from "react";
import classNames from "classnames";

import { IRoute } from "../../../routes";
import BreadCrumb from "../bread-crumb";
import styles from "./index.module.scss";

interface Props {
  breads?: IRoute[];
  classes?: {
    title?: string;
  };
  title: string;
  children?: ReactNode | ReactNode[];
}

const PageContainer = ({ breads, classes, title, children }: Props) => {
  return (
    <>
      <h1 className={classNames(styles.Title, classes?.title)}>{title}</h1>
      {breads && (
        <BreadCrumb>
          {breads.map((bread, index) => (
            <BreadCrumb.Item key={index} to={bread.path} exact>
              {bread.name}
            </BreadCrumb.Item>
          ))}
        </BreadCrumb>
      )}
      {children}
    </>
  );
};
PageContainer.displayName = "PageContainer";
export default PageContainer;
