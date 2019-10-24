import React from "react";
import classnames from "classnames";

import "./frame.scss";

const Frame = props => {
  if (!props.show) return null;
  return (
    <div className={classnames("frame", "frame--" + props.direction)}>
      <div className="overlay" />
      <div className="frame-container">{props.children}</div>
    </div>
  );
};

function FrameHeader({ children }) {
  return <div className="frame-header">{children}</div>;
}

function FrameDialog({ children }) {
  return <div className="frame-dialog">{children}</div>;
}

Frame.Dialog = FrameDialog;
Frame.Header = FrameHeader;

export default Frame;
