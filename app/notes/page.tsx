import Link from "next/link";
import CreateNote from "./CreateNote";

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
  console.log(notes);

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {notes.map((note) => (
          <Note note={note}></Note>
        ))}
      </div>
      
      <CreateNote />
    </div>
  );
}

function Note({ note }: any) {
  const { id, Title, Content, created } = note || {};
  return (
    <div className="py-2 px-4 rounded-sm border-2 border-gray-600 bg-slate-300">
      <Link href={"/notes/" + id}>
        <h3 className="text-sm">{id}</h3>
        <h2 className="text-xl font-semibold">{Title}</h2>
        <h3>{Content}</h3>
        <h3>{created}</h3>
      </Link>
    </div>
  );
}

export default page;
