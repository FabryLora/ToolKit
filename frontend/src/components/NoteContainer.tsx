import { useDroppable } from "@dnd-kit/core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NoteContainerProps {
    children: React.ReactNode;
    id: string;
}

export default function NoteContainer({ children, id }: NoteContainerProps) {
    const { isOver, setNodeRef } = useDroppable({ id: id });
    const style = {
        backgroundColor: isOver ? "green" : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex flex-col border-8 rounded-md border-primary-dark w-[300px] h-[500px] items-start"
        >
            {/* Title and delete button */}
            <div className="w-full bg-primary-dark pb-2 pl-2 flex flex-row items-center justify-between pr-2">
                <input
                    type="text"
                    className="text-secondary font-bold text-2xl bg-transparent outline-none w-full"
                    value={"Notes"}
                />
                <button>
                    <FontAwesomeIcon icon={faTrash} size="lg" color="#eb5e28" />
                </button>
            </div>
            {children}
        </div>
    );
}
