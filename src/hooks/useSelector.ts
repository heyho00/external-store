import { useEffect, useRef, useState } from "react";
import { container } from "tsyringe";
import Store, { State } from "../stores/Store";
import useForceUpdate from "./useForceUpdate";

type Selector<T> = (state: State) => T;

export default function useSelector<T>(selector: Selector<T>): T {
  const store = container.resolve(Store);

  const state = useRef(selector(store.state));
  // const [state, setState] = useState(selector(store.state));

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const update = () => {
      // 특정 조건 맞으면 forceupdate
      // selector의 결과가 원시값이 아닌 객체인 경우 처리 필요함.
      const newState = selector(store.state);
      if (newState !== state.current) {
        forceUpdate();
        state.current = newState;
      }
    };

    store.addListener(update);

    return () => store.removeListener(update);
  }, [store, forceUpdate]);

  return selector(store.state);
}
