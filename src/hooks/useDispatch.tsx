import useReduxStore from "./useReduxStore";
import { Action } from "../stores/BaseStore";

export default function useDispatch() {
  const store = useReduxStore();

  return (action: Action) => {
    store.dispatch(action);
  };
}
