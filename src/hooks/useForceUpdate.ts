import { useCallback, useState } from "react";

export default function useForceUpdate() {
  const [, setState] = useState({});
  return useCallback(() => setState({}), []);
  // useCallback을 써서 함수도 바뀌지 않도록 해준다.
}
