import { useState } from "react";

export default function useForceUpdate() {
  const [state, setState] = useState(0);

  const forceUpdate = () => {
    setState(state + 1);
  };
  return forceUpdate;
}
