import ReduxStore, { State } from "../stores/ReduxStore";
import { container } from "tsyringe";
import useForceUpdate from "./useForceUpdate";
import { useEffect } from "react";

type Selector<T> = (state: State) => T;

export default function useSelector<T>(selector: Selector<T>): T {
  const store = container.resolve(ReduxStore);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    store.addListener(forceUpdate);

    return () => {
      store.removeListener(forceUpdate);
    };
  }, [store, forceUpdate]);

  return selector(store.state);
}
