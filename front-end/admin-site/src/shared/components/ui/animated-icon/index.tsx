import { ReactElement } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { IconType } from "react-icons";

interface Props extends HTMLMotionProps<"i"> {
  children: ReactElement<IconType>;
}

const AnimatedIcon = ({ children, ...rest }: Props) => (
  <motion.i {...rest}>{children}</motion.i>
);
AnimatedIcon.displayName = "Animated.Icon";
export default AnimatedIcon;
