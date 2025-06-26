"use client";

import css from "./NoteDetails.module.css";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Loader from "@/app/loading";
import NoteError from "./error";

const NoteDetailsClient = () => {
  const { id } = useParams();

  const {
    data: note,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(Number(id)),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;

  if (isError) return <NoteError error={error} />;

  if (!note) return <p>Note not found</p>;

  const date = new Date(note.createdAt);
  const formatetDate = date.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formatetDate}</p>
      </div>
    </div>
  );
};
export default NoteDetailsClient;
