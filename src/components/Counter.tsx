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

// 비즈니스 로직은 잘 바뀌지 않는다.
// 변화가 빈번한 UI 요소에 대한 테스트 대신,
// 오래 유지되는 비즈니스 로직에 대한 테스트코드 작성으로 유지보수에 도움이 되는 치밀한 코드를 작성할 수 있다.

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
