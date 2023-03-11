import useStore from "../hooks/useStore";

export default function CountControl() {
  const store = useStore();

  const handleClickIncrease = () => {
    store.dispatch({ type: "increase" });
  };

  const handleClickDecrease = () => {
    store.dispatch({ type: "decrease" });
  };

  return (
    <div>
      <button type="button" onClick={handleClickIncrease}>
        Increase
      </button>
      <button type="button" onClick={handleClickDecrease}>
        Decrease
      </button>
    </div>
  );
}
