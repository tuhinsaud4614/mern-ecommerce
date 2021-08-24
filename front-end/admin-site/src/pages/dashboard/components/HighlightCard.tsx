import { ComponentType } from "react";
import { Link } from "react-router-dom";
import { IconBaseProps } from "react-icons";
import classNames from "classnames";

import ListTile from "../../../shared/components/list-title";
import styles from "../index.module.scss";

interface Props {
  icon: ComponentType<IconBaseProps>;
  subtitle: string;
  title: string;
  variant?:
    | "info"
    | "danger"
    | "warning"
    | "success"
    | "primary"
    | "secondary"
    | "accent";
}
const HighlightCard = ({
  icon: IconComponent,
  title,
  subtitle,
  variant = "info",
}: Props) => {
  return (
    <Link to="/" className={styles.HighlightWrapper}>
      <ListTile
        className={classNames(
          styles.HighlightCard,
          styles[`HighlightCard${variant}`]
        )}
      >
        <ListTile.Title style={{ color: "var(--text-alt-color)" }}>
          {title}
        </ListTile.Title>
        <ListTile.Subtitle className={styles.Subtitle}>{subtitle}</ListTile.Subtitle>
        <ListTile.Tailing className={styles.CardIcon}>
          <IconComponent />
        </ListTile.Tailing>
      </ListTile>
    </Link>
  );
};
HighlightCard.displayName = "HighlightCard";
export default HighlightCard;
