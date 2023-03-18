import ReduxStore, { State } from "../stores/ReduxStore";
import { container } from "tsyringe";
import useForceUpdate from "./useForceUpdate";
import { useEffect, useRef } from "react";

type Selector<T> = (state: State) => T;

export default function useSelector<T>(selector: Selector<T>): T {
  const store = container.resolve(ReduxStore);

  // const [state, setState] = useState(selector(store.state));
  const state = useRef(selector(store.state));

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const update = () => {
      // 특정 조건이 맞으면 forceUpdate 하려고
      // selector의 결과가 object일 경우 따로 처리가 필요함
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
