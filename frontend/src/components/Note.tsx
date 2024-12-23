import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import EditableNote from "./EditableNote";
import ReadOnlyNote from "./ReadOnlyNote";

export default function Note({ id }: { id: string }) {
    const [editable, setEditable] = useState(false);
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="w-full flex flex-col gap-2 p-3"
        >
            {editable ? (
                <EditableNote />
            ) : (
                <ReadOnlyNote description="description" title="title" />
            )}
        </div>
    );
}
