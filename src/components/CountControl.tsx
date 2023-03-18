import useDispatch from "../hooks/useDispatch";
import useReduxStore from "../hooks/useReduxStore";
import { decrease, increase } from "../stores/ReduxStore";

export default function CountControl() {
  const dispatch = useDispatch();

  const { state } = useReduxStore();

  return (
    <>
      <p>{state.count}</p>
      <button type="button" onClick={() => dispatch(increase())}>
        Increase
      </button>

      <button type="button" onClick={() => dispatch(decrease())}>
        Decrease
      </button>
    </>
  );
}
