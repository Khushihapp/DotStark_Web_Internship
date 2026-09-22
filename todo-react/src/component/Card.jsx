import { memo } from "react";

function Card({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

export default memo(Card);