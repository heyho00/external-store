import { container } from "tsyringe";
import { useEffect } from "react";
import useForceUpdate from "../hooks/useForceUpdate";
import ReduxStore from "../stores/ReduxStore";

export default function useReduxStore() {
  const store = container.resolve(ReduxStore);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    store.addListener(forceUpdate);

    return () => {
      store.removeListener(forceUpdate);
    };
  }, [store, forceUpdate]);

  return store;
}
