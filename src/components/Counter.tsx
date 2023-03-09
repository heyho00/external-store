import useForceUpdate from "../hooks/useForceUpdate";

let count = 0;

export default function Counter() {
  const forceUpdate = useForceUpdate();

  const handleClick = () => {
    count += 1;
    forceUpdate();
  };

  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </div>
  );
}

//count를 리액트 바깥에 두고 +=1 해도 리렌더가 되지 않는다.
// state가 아니기 때문이다.
// useForceUpdate 훅을 만들어 forceUpdate를 해준다.
