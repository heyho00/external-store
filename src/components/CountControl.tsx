import useCounterStore from "../hooks/useCounterStore";

export default function CountControl() {
  const counterStore = useCounterStore();

  const increase = () => {
    counterStore.increase();
  };
  const decrease = () => {
    counterStore.decrease();
  };

  return (
    <>
      <p>{counterStore.count}</p>
      <button type="button" onClick={increase}>
        Increase
      </button>

      <button type="button" onClick={decrease}>
        Decrease
      </button>
    </>
  );
}
