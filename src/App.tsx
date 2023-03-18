import "reflect-metadata";
import Counter from "./components/Counter";
import CountControl from "./components/CountControl";
import NameCard from "./components/NameCard";

export default function App() {
  return (
    <>
      <p>Hello, world!</p>
      <Counter />
      <Counter />
      <CountControl />
      {/* <NameCard /> */}
    </>
  );
}
