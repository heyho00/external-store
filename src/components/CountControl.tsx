import useCounterStore from "../hooks/useCounterStore";

export default function CountControl() {
  const [{ count }, store] = useCounterStore();

  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={() => store.increase()}>
        Increase
      </button>
      <button type="button" onClick={() => store.increase(10)}>
        Increase 10
      </button>
      <button type="button" onClick={() => store.decrease()}>
        Decrease
      </button>
      <button type="button" onClick={() => store.decrease(10)}>
        Decrease
      </button>
    </div>
  );
}
