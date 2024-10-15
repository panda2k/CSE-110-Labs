import { render, screen, fireEvent } from "@testing-library/react";
import { dummyNotesList } from "./constants";
import { StickyNotes } from "./stickyNotes";
test("renders create note form", () => {
    render(<StickyNotes />);
    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
});

describe("Create StickyNote", () => {
    test("renders create note form", () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText("Create Note");
        expect(createNoteButton).toBeInTheDocument();
    });

    test("creates a new note", () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });
});

describe("Read StickyNote", () => {
    test("All sticky notes can read", () => {
        render(<StickyNotes />)
        dummyNotesList.forEach(n => {
            expect(screen.getByText(n.title)).toBeInTheDocument();
            expect(screen.getByText(n.content)).toBeInTheDocument();
            expect(screen.getByTestId(`note-label-${n.id}`)).toBeInTheDocument();
        })
    });
})

describe("Update StickyNote", () => {
    test("Sticky note title updates", () => {
        render(<StickyNotes />)
        const editNote = dummyNotesList[0];
        screen.getByText(editNote.title).innerHTML = "Updated title"
        expect(screen.getByText("Updated title")).toBeInTheDocument();
    });
    test("Sticky note title updates", () => {
        render(<StickyNotes />)
        const editNote = dummyNotesList[0];
        screen.getByText(editNote.content).innerHTML = "Updated content"
        expect(screen.getByText("Updated content")).toBeInTheDocument();
    });
    test("Sticky note title updates", () => {
        render(<StickyNotes />)
        const editNote = dummyNotesList[0];
        screen.getByTestId(`note-label-${editNote.id}`).innerHTML = "Updated label"
        expect(screen.getByText("Updated label")).toBeInTheDocument();
    });
})

describe("Delete StickyNote", () => {
    test("Sticky note deletes", () => {
        const { queryByTestId } = render(<StickyNotes />)
        const editNote = dummyNotesList[0];

        fireEvent.click(screen.getByTestId(`note-delete-${editNote.id}`))
        expect(queryByTestId(`note-item-${editNote.id}`)).toBeNull();
    });

    test("Deleted note is unfavorited", () => {
        const { queryByTestId } = render(<StickyNotes />)
        const editNote = dummyNotesList[0];
        fireEvent.click(screen.getByTestId(`note-like-${editNote.id}`))
        expect(screen.getByTestId(`favorites-${editNote.id}`)).toBeInTheDocument()
        fireEvent.click(screen.getByTestId(`note-delete-${editNote.id}`))
        expect(queryByTestId(`note-item-${editNote.id}`)).toBeNull();
        expect(queryByTestId(`favorites-${editNote.id}`)).toBeNull();
    })
})

describe("Like StickyNote", () => {
    test("Sticky note likes and unlikes", () => {
        const { queryByTestId } = render(<StickyNotes />)
        const editNote = dummyNotesList[0];

        expect(queryByTestId(`favorites-${editNote.id}`)).toBeNull();
        fireEvent.click(screen.getByTestId(`note-like-${editNote.id}`))
        expect(screen.getByTestId(`favorites-${editNote.id}`)).toBeInTheDocument()
    });
})
