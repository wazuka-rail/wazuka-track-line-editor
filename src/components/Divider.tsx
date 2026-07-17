import type { DividerProps } from "react-split-pane";

const Divider = ({
  direction,
  isDragging,
  disabled,
  onPointerDown,
  onKeyDown,
}: DividerProps) => (
  <div
    role="separator"
    aria-orientation={direction === "horizontal" ? "vertical" : "horizontal"}
    tabIndex={disabled ? -1 : 0}
    className={`divider ${direction}${isDragging ? " dragging" : ""}`}
    onPointerDown={disabled ? undefined : onPointerDown}
    onKeyDown={disabled ? undefined : onKeyDown}
  >
    <span />
  </div>
);

export default Divider;
