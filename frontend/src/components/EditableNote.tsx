export default function EditableNote() {
    return (
        <>
            <input
                className="text-white bg-transparent border border-secondary rounded-md px-2 py-1"
                placeholder="Title..."
                type="text"
                name=""
                id=""
            />
            <textarea
                className="text-white bg-transparent border border-secondary rounded-md px-2 py-1"
                placeholder="Description..."
                name=""
                id=""
            ></textarea>
            <button
                /* onClick={() => setEditable(false)} */
                className="font-bold bg-secondary py-1 px-3 rounded-md text-primary"
            >
                Save
            </button>
        </>
    );
}
