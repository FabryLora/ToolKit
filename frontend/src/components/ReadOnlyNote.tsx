interface ReadOnlyNoteProps {
    title: string;
    description: string;
}

export default function ReadOnlyNote({
    title,
    description,
}: ReadOnlyNoteProps) {
    return (
        <div className="bg-primary-dark text-white p-2 rounded-md ">
            <h1 className="font-bold text-lg">{title}</h1>
            <p className="text-gray-500 max-h-[100px] overflow-auto">
                {description}
            </p>
        </div>
    );
}
