"use client";

import { useState } from "react";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/NoteModal/NoteModal";
import { useDebounce } from "use-debounce";
import { FetchNotesResponse } from "@/lib/api";

interface NotesClientProps {
  initialNotesData: FetchNotesResponse;
}

export default function NotesClient({ initialNotesData }: NotesClientProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //-----------------------FETCHING & SEARCHING NOTES
  const [debounseInputValue] = useDebounce(inputValue, 500);

  const notes = useQuery({
    queryKey: ["notes", debounseInputValue, currentPage],
    queryFn: () => fetchNotes(debounseInputValue, currentPage),
    placeholderData: keepPreviousData,
    initialData:
      !debounseInputValue && currentPage === 1 ? initialNotesData : undefined,
  });

  const totalPages = notes.data?.totalPages ?? 0;

  const handleSearchChange = (newSearch: string) => {
    setInputValue(newSearch);
    setCurrentPage(1);
  };

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <div>
            <SearchBox value={inputValue} onSearch={handleSearchChange} />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className={css.addbutton}
          >
            Create note +
          </button>
        </header>

        <NoteList notes={notes.data?.notes ?? []} />
        {totalPages > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </>
  );
}
