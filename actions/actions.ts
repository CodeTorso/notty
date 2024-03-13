"use server"

import { revalidatePath } from "next/cache";

export async function create(formData: FormData): Promise<void> {

  const title = formData.get("title");
  const content = formData.get("content");

  await fetch("http://127.0.0.1:8090/api/collections/notes/records", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Title: title,
      Content: content,
    }),
  });

  revalidatePath('/notes')
}

