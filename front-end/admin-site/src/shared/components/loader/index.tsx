import classNames from "classnames";

import styles from "./index.module.scss";

type Variant =
  | "info"
  | "danger"
  | "warning"
  | "success"
  | "primary"
  | "secondary"
  | "accent";

interface IChileProps {
  className?: string;
  variant?: Variant;
}

interface Props {
  as?: "rotate-plane" | "chase" | "bounce" | "rect" | "cube" | "folding-cube";
  className?: string;
  variant?: Variant;
  wrapperClassName?: string;
  wrapper?: boolean;
}

const RotatePlane = ({ className, variant }: IChileProps) => {
  return (
    <div
      className={classNames(styles.RotatePlane, `bg-${variant}`, className)}
    />
  );
};
RotatePlane.displayName = "Loader.RotatePlane";

const Chase = ({ className, variant }: IChileProps) => {
  return (
    <div className={classNames(styles.Chase, className)}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.ChaseDot}>
          <span
            className={classNames(styles.ChaseDotBefore, `bg-${variant}`)}
          />
        </div>
      ))}
    </div>
  );
};
Chase.displayName = "Loader.Chase";

const Bounce = ({ className, variant }: IChileProps) => {
  return (
    <span className={classNames(styles.Bounce, className)}>
      <span className={classNames(styles.Bounce1, `bg-${variant}`)} />
      <span className={classNames(styles.Bounce2, `bg-${variant}`)} />
    </span>
  );
};
Bounce.displayName = "Loader.Bounce";

const Rect = ({ className, variant }: IChileProps) => {
  return (
    <span className={classNames(styles.RectContainer, className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={classNames(
            styles.Rect,
            styles[`Rect${index + 1}`],
            `bg-${variant}`
          )}
        />
      ))}
    </span>
  );
};
Rect.displayName = "Loader.Rect";

const Cube = ({ className, variant }: IChileProps) => {
  return (
    <span className={classNames(styles.CubeGrid, className)}>
      {Array.from({ length: 9 }).map((_, index) => (
        <span
          key={index}
          className={classNames(
            styles.Cube,
            styles[`Cube${index + 1}`],
            `bg-${variant}`
          )}
        />
      ))}
    </span>
  );
};
Cube.displayName = "Loader.Cube";

const FoldingCube = ({ className, variant }: IChileProps) => {
  return (
    <span className={classNames(styles.FoldingCubeGrid, className)}>
      <span className={classNames(styles.FoldingCube, styles.FoldingCube1)}>
        <span
          className={classNames(
            styles.FoldingCubeBefore,
            styles.FoldingCubeBefore1,
            `bg-${variant}`
          )}
        />
      </span>
      <span className={classNames(styles.FoldingCube, styles.FoldingCube2)}>
        <span
          className={classNames(
            styles.FoldingCubeBefore,
            styles.FoldingCubeBefore2,
            `bg-${variant}`
          )}
        />
      </span>
      <span className={classNames(styles.FoldingCube, styles.FoldingCube4)}>
        <span
          className={classNames(
            styles.FoldingCubeBefore,
            styles.FoldingCubeBefore4,
            `bg-${variant}`
          )}
        />
      </span>
      <span className={classNames(styles.FoldingCube, styles.FoldingCube3)}>
        <span
          className={classNames(
            styles.FoldingCubeBefore,
            styles.FoldingCubeBefore3,
            `bg-${variant}`
          )}
        />
      </span>
    </span>
  );
};
FoldingCube.displayName = "Loader.FoldingCube";

const Loader = ({
  className,
  as = "chase",
  variant = "secondary",
  wrapper = false,
  wrapperClassName,
}: Props) => {
  let child: JSX.Element;
  switch (as) {
    case "rotate-plane":
      child = <RotatePlane variant={variant} className={className} />;
      break;
    case "chase":
      child = <Chase className={className} variant={variant} />;
      break;
    case "bounce":
      child = <Bounce className={className} variant={variant} />;
      break;
    case "rect":
      child = <Rect className={className} variant={variant} />;
      break;
    case "cube":
      child = <Cube className={className} variant={variant} />;
      break;
    case "folding-cube":
      child = <FoldingCube className={className} variant={variant} />;
      break;
    default:
      child = <RotatePlane variant={variant} className={className} />;
      break;
  }
  return wrapper ? <div className={wrapperClassName}>{child}</div> : child;
};

Loader.displayName = "Loader";
export default Loader;
