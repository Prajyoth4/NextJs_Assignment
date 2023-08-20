export default function Page({ id }) {
  console.log("Page", id);
  return <h1>Dashboard for {id}</h1>;
}

export async function getStaticPaths() {
  //const data = await import('/data/data.json');
  //const allEvents = data.allEvents;
  let allEvents = [];
  for (let i = 0; i < 20; i++) {
    allEvents.push(i);
  }
  console.log(allEvents);

  const allPaths = allEvents.map((ele) => {
    return {
      params: {
        //cat: path.city,
        id: ele.toString(),
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log("Context", context);
  const id = context.params.id;
  //const { allEvents } = await import('/data/data.json');
  //const eventData = allEvents.find((ev) => id === ev.id);

  return {
    props: { id: 1 }, //{ data: eventData },
  };
}
