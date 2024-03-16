import { Title } from "@solidjs/meta";

import { createEffect, createResource, createSignal, Suspense, Resource, Match, Switch } from 'solid-js';

const fetchData = async () => {
  const response = await fetch('http://127.0.0.1:8000/articles/');

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  // const responseData = await response.json();
  // console.log(responseData); // 打印响应内容
  // return responseData;

  const htmlContent = await response.text();
  return htmlContent;
}

const [data, { mutate, refetch }] = createResource(fetchData);

// const MyComponent = () => {  // 解析数据资源
//   const [data, setData] = createSignal(null);
//   const [loading, setLoading] = createSignal(true);
// 
//   createEffect(async () => {
//     try {
//       const fetchedData = await fetchData();
//       setData(fetchedData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   });
//   
//   return (
//     <Suspense fallback={<p>Loading...</p>}>
//       <div>
//         {data() ? (
//           <div>
//             {/* 使用获取到的数据渲染UI */}
//           </div>
//         ) : (
//           <p>Error: Failed to fetch data</p>
//         )}
//       </div>
//     </Suspense>
//   );
// };



const MyComponent = () => {
  const [htmlResource] = createResource(fetchData);
  // console.log(htmlResource.state);
  const htmlContext = htmlResource();
  console.log("Loading Articles list HTML!!!");

  return (
    <div>
      <Suspense fallback={<p>Not Found</p>}>
        <Switch>
          <Match when={htmlResource.state === 'pending' || htmlResource.state === 'unresolved'}>
            <div>Loading...</div>
          </Match>
          <Match when={htmlResource.state === 'ready'}>
            <div innerHTML={htmlResource()}></div>
          </Match>
          <Match when={htmlResource.state === 'errored'}>
            {JSON.stringify(htmlResource.error)}
          </Match>
        </Switch>
      </Suspense>
    </div>
  );
};


export default function Article() {
  return (
    <main>
      <Title>Hello Article</Title>
      <h1>Hello Article!</h1>
      <MyComponent />
      <div>Welcome to GGBond's Blog!</div>
    </main>
  );
}

// export default function Index() {
//   return <div>Welcome to Hogwarts!</div>;
// }
