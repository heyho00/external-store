import { Action } from "../stores/BaseStore";
import ReduxStore from "../stores/ReduxStore";
import { container } from "tsyringe";

export default function useDispatch<Payload>() {
  const store = container.resolve(ReduxStore);

  return (action: Action<Payload>) => store.dispatch(action);
}
