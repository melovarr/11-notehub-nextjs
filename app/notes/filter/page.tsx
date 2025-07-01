import { fetchNotes } from "@/lib/api";
import NotesClient from "../Notes.client";

interface Props {
  params: {
    tag: string;
  };
}

export default async function FilterPage({ params }: Props) {
  const tag = params.tag;
  const initialNotesData = await fetchNotes("", 1, tag === "all" ? undefined : tag);

  return <NotesClient initialNotesData={initialNotesData} tag={tag} />;
}