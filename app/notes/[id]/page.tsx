type Tnote = {
  id: String;
  Title: String;
  Content: String;
  created: String;
};


async function getNote(id: string): Promise<Tnote> {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${id}`,
    {cache: "no-store"}
  );
  const data = await res.json();
  return data;
}

async function page({ params }: any) {
  const note = await getNote(params.id);
  console.log(`http://127.0.0.1:8090/api/collections/notes/records/${params.id}`);
  return <Note note={note}></Note>;
}

export default page;

function Note({ note }: any) {
  const { id, Title, Content, created } = note || {};
  return (
    <div className="py-2 px-4 rounded-sm border-2 border-gray-600 bg-slate-300">
        <h3 className="text-sm">{id}</h3>
        <h2 className="text-xl font-semibold">{Title}</h2>
        <h3>{Content}</h3>
        <h3>{created}</h3>
    </div>
  );
}