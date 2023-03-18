import { useEffect } from "react";
import useSelector from "../hooks/useSelector";

export default function NameCard() {
  const name = useSelector((state) => state.name);

  useEffect(() => {
    console.log("name card render");
  });

  return (
    <>
      <div>Name: {name}</div>
    </>
  );
}
