"use client";
import App from "../components/App";
import Image from "next/image";
import store from "../redux/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Provider store={store}>
        <App />
      </Provider>
    </main>
  );
}

// export async function getStaticProps(context) {
//   console.log("Context", context);
//   const id = context.params.id;
//   //const { allEvents } = await import('/data/data.json');
//   //const eventData = allEvents.find((ev) => id === ev.id);

//   return {
//     props: { id: 1 }, //{ data: eventData },
//   };
// }
