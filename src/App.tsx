import CountControl from "./components/CountControl";
import Counter from "./components/Counter";
import NameCard from "./components/NameCard";

export default function App() {
  return (
    <>
      <p>Hello, wldfd!</p>
      <Counter />
      <Counter />
      <CountControl />
      <NameCard />
    </>
  );
}

//Counter를 두개 쓰면 밑에꺼만 상태가 변함.
// Store.ts를 수정한다.
