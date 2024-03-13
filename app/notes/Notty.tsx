"use client";

import { create } from "@/actions/actions";
import Link from "next/link";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { useOptimistic } from "react";

type Tnote = {
  id: String;
  Title: String;
  Content: String;
  created: String;
};

type NottyPropsType = { notes: Tnote[] };

function Notty({ notes }: NottyPropsType) {
  const [optimisticNotes, addOptimisticNote] = useOptimistic(
    notes,
    (state, newNote) => {
      return [...state, newNote];
    }
  );

  const ref = useRef<HTMLFormElement>(null);
  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="py-10 flex justify-center">
        <div className="border-2 border-gray-600 py-5 px-2 w-96 max-w-[95vw]">
          <h1 className="pb-4">Create new Note</h1>
          <form
            ref={ref}
            action={async (formData) => {
              ref.current?.reset();
              const title = formData.get("title");
              const content = formData.get("content");
              addOptimisticNote({ title, content });
              await create(formData);
            }}
            className="flex flex-col gap-4"
          >
            <input
              className="border-[1px] border-gray-400 py-1 px-2 rounded-sm"
              name="title"
              placeholder="Enter title"
              required
            />
            <textarea
              className="border-[1px] border-gray-400 py-1 px-2 rounded-sm"
              placeholder="Enter the note"
              name="content"
              required
            />
            <SubmitButton></SubmitButton>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {optimisticNotes.map((note: Tnote) => (
          <Note note={note}></Note>
        ))}
      </div>
    </div>
  );
}

type noteProps = {
  note: {
    id: String;
    Title: String;
    Content: String;
    created: String;
  };
};

function Note({ note: { id, Title, Content } }: noteProps) {
  return (
    <div className="py-2 px-4 rounded-sm border-2 border-gray-600 bg-slate-300">
      <Link href={"/notes/" + id}>
        <h2 className="text-xl font-semibold">{Title}</h2>
        <h3>{Content}</h3>
      </Link>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="border-2 py-2 rounded-md border-white bg-slate-700 text-white hover:border-black hover:text-black hover:bg-slate-50 transition-all "
      type="submit"
    >
      {/* {pending ? "Saving..." : "Create Note!"} */}
      Create Note!
    </button>
  );
}

export default Notty;
