import useForceUpdate from "../hooks/useForceUpdate";

// Business logic

const state = {
  count: 0,
};

function increase() {
  state.count += Math.ceil(Math.random() * 10);
}

// UI
// 이런 식으로 business logic과 ui를 나눈다. 관심사의 분리.

export default function Counter() {
  const forceUpdate = useForceUpdate();

  const handleClick = () => {
    increase();
    forceUpdate();
  };

  return (
    <div>
      <p>{state.count}</p>
      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </div>
  );
}
