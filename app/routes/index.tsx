import { Await, createFileRoute, defer } from '@tanstack/react-router';
import { useEffect, useState } from "react";

export const Route = createFileRoute('/')({
  component: Home,
  validateSearch: (search): { time?: number } => {
    return search;
},
loaderDeps: ({ search }) => ({ time: search.time }),
  loader: async ({deps}) => {
    const deferred = defer(
      new Promise<string>((resolve) =>
        setTimeout(() => resolve("defer"), deps.time ?? 10)
      )
    );
    return {
      deferred,
      hello: "world"
    };
  },
});

function Home() {
  const [count, setCount] = useState(0);
  const { deferred, hello } = Route.useLoaderData();
  console.log('deferred', deferred);
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <div>{hello}</div>
      <Await promise={deferred} fallback={<div>Loading...</div>}>
        {(data) => <div>{data}</div>}
      </Await>
      <button onClick={() => setCount(count+1)}>{count}</button>
    </div>
  );
}

