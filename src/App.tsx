import CountControl from "./components/CountControl";
import Counter from "./components/Counter";

export default function App() {
  return (
    <>
      <p>Hello, wldfd!</p>
      <Counter />
      <Counter />
      <CountControl />
    </>
  );
}

//Counter를 두개 쓰면 밑에꺼만 상태가 변함.
// Store.ts를 수정한다.
