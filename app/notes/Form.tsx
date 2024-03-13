"use client";

import { create } from "@/actions/actions";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

function Form() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    
    <form
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
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
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="border-2 py-2 rounded-md border-white bg-slate-700 text-white hover:border-black hover:text-black hover:bg-slate-50 transition-all "
      type="submit"
    >
      {pending ? "Saving..." : "Create Note!"}
    </button>
  );
}

export default Form;
