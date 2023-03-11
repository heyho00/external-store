import { useEffect } from "react";
import { container } from "tsyringe";
import useForceUpdate from "./useForceUpdate";
import Store from "../stores/Store";

export default function useStore() {
  const store = container.resolve(Store);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    store.addListener(forceUpdate);

    return () => store.removeListener(forceUpdate);

    // clean up 해준다.
  }, [store, forceUpdate]);

  return store;
}
