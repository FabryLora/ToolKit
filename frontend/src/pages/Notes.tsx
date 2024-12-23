import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Note from "../components/Note";
import NoteContainer from "../components/NoteContainer";
export default function Notes() {
    const containers = ["A", "B", "C"];
    const [parent, setParent] = useState(null);
    const draggableMarkup = <Note id="draggable" />;

    const handleDragEnd = (ev) => {
        const { over } = ev;
        setParent(over ? over.id : null);
    };

    return (
        <div className="flex justify-center items-center h-screen gap-10">
            <DndContext onDragEnd={handleDragEnd}>
                {containers.map((id) => (
                    <NoteContainer key={id} id={id}>
                        {parent === id ? draggableMarkup : "drop Here"}
                    </NoteContainer>
                ))}

                {parent === null ? draggableMarkup : null}
            </DndContext>
        </div>
    );
}
