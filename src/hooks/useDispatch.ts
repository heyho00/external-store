import { Action } from "../stores/BaseStore";
import useStore from "./useStore";

export default function useDispatch() {
  const store = useStore();
  return (action: Action) => {
    store.dispatch(action);
  };
}
