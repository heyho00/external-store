import { container } from "tsyringe";
import useForceUpdate from "../hooks/useForceUpdate";
import Store from "../stores/Store";

export default function Counter() {
  const store = container.resolve(Store);

  const forceUpdate = useForceUpdate();

  store.forceUpdate = forceUpdate;

  return (
    <div>
      <p>Count {store.count}</p>
    </div>
  );
}

// CountControl컴포에서 icrease눌러 store.count가 +1
// Counter 컴포넌트는 리렌더 되지않고 기존값이다가
// Refresh 눌러 forceUpdate해주면 store.count가 바뀐다.

// 항상 눌러야만 업데이트 되는걸 바꿔보려면
// Store에 가서.
