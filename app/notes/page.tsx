import Notty from "./Notty";

type Tnote = {
  id: String;
  Title: String;
  Content: String;
  created: String;
};

async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.items as Tnote[];
}

async function page() {
  const notes = await getNotes();
  return (
    <Notty notes={notes} />
  );
}



export default page;
