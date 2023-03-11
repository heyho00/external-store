import useDispatch from "../hooks/useDispatch";
import useSelector from "../hooks/useSelector";
import { decrease, increase } from "../stores/Store";

export default function CountControl() {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.count);
  //굳이 해보자면
  const countAndName = useSelector((state) => ({
    count: state.count,
    name: state.name,
  }));

  return (
    <div>
      <p>{countAndName.count}</p>
      <button type="button" onClick={() => dispatch(increase())}>
        Increase
      </button>
      <button type="button" onClick={() => dispatch(decrease())}>
        Decrease
      </button>
    </div>
  );
}
