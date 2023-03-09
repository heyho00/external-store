import { useState } from "react";

export default function useForceUpdate() {
  const [state, setState] = useState({});

  const forceUpdate = () => {
    // setState(state);
    // state+=1 을 그냥 state로 수정하면 바뀌지 않아 리렌더되지 않는다.
    // 사실 이 훅은 리렌더만 시키는게 목적인 forceUpdate이기 때문에
    // 값을 변화시킬 필요없이 빈 객체를 주고
    // 스프레드로 복사본을 setState만 해주면 된다.(리렌더 됨)
    // Counter.tsx 파일의 state 값의 변화로 인해 눈에 보이는 값은 올라간다.
    // {...state} 안하고 {}만 해도 되네 ; 새객체구나.
    setState({});
  };
  return forceUpdate;
}
