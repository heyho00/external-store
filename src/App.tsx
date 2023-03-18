import "reflect-metadata";
import Counter from "./components/Counter";
import CountControl from "./components/CountControl";

export default function App() {
  return (
    <>
      <p>Hello, world!</p>
      <Counter />
      <CountControl />
    </>
  );
}
