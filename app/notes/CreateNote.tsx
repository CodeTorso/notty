import Form from "./Form";

function CreateNote() {
  return (
    <div className="flex justify-center">
      <div className="border-2 border-gray-600 py-5 px-2 w-96 max-w-[95vw]">
        <h1 className="pb-4">Create new Note</h1>
        <Form />
      </div>
    </div>
  );
}

export default CreateNote;
