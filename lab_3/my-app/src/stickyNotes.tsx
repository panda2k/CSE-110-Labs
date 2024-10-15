import './App.css';
import { Label } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { useState } from 'react';
import { ThemeContext, themes } from './themeContext';

export const StickyNotes = () => {
    const [favorites, setFavorites] = useState<number[]>([]);
    const [notes, setNotes] = useState(dummyNotesList);
    const initialNote = {
        id: -1,
        title: "",
        content: "",
        label: Label.personal,
    };
    const [createNote, setCreateNote] = useState(initialNote);
    const createNoteHandler = (e: any) => {
        e.preventDefault();
        const nextId = Math.max(...notes.map(n => n.id)) + 1;
        setNotes([...notes, { ...createNote, id: nextId }]);
    }

    const [selectedNote, setSelectedNode] = useState<number>(-1);

    const toggleLike = (id: number) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter(x => x !== id).sort());
        } else {
            setFavorites([...favorites, id].sort());
        }
    }

    const [currentTheme, setCurrentTheme] = useState(themes.light);

    const toggleTheme = () => {
        setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };

    return (
        <ThemeContext.Provider value={currentTheme}>
            <button onClick={toggleTheme}> Toggle Theme </button>
            <div
                className='app-container'
                style={{
                    background: currentTheme.background,
                    color: currentTheme.foreground,
                    padding: "20px",
                }}
            >
                <form className="note-form" onSubmit={createNoteHandler}>
                    <div>
                        <input
                            placeholder="Note Title"
                            onChange={(event) =>
                                setCreateNote({ ...createNote, title: event.target.value })}
                            required>
                        </input>
                    </div>

                    <div>
                        <textarea
                            placeholder="Note Content"
                            onChange={(event) =>
                                setCreateNote({ ...createNote, content: event.target.value })}
                            required>
                        </textarea>
                    </div>

                    <div>
                        <select
                            onChange={(event) =>
                                setCreateNote({ ...createNote, label: event.target.value as Label })}
                            required>
                            <option value={Label.personal}>Personal</option>
                            <option value={Label.study}>Study</option>
                            <option value={Label.work}>Work</option>
                            <option value={Label.other}>Other</option>
                        </select>
                    </div>

                    <div><button type="submit">Create Note</button></div>
                </form>

                <div className="notes-grid">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className="note-item"
                            onClick={() => setSelectedNode(note.id)}
                            style={{
                                background: currentTheme.background,
                                color: currentTheme.foreground,
                                padding: "20px",
                            }}
                            data-testid={`note-item-${note.id}`}
                        >
                            <div className="notes-header">
                                <button
                                    style={{
                                        background: currentTheme.background,
                                        color: currentTheme.foreground,
                                    }}
                                    data-testid={`note-delete-${note.id}`}
                                    onClick={() => { setNotes(notes.filter(n => n.id !== note.id)); setFavorites(favorites.filter(id => id !== note.id)) }}>x</button>
                                <button data-testid={`note-like-${note.id}`} onClick={() => toggleLike(note.id)}>{favorites.includes(note.id) ? '❤️ ' : '🩶'}</button>
                            </div>
                            <h2 data-testid={`note-title-${note.id}`} contentEditable={selectedNote === note.id}> {note.title} </h2>
                            <p data-testid={`note-body-${note.id}`} contentEditable={selectedNote === note.id}> {note.content} </p>
                            <p data-testid={`note-label-${note.id}`} contentEditable={selectedNote === note.id}> {note.label} </p>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>List of favorites</h2>
                    {favorites.map(id => (
                        <p data-testid={`favorites-${id}`}>{dummyNotesList.find(x => x.id === id)?.title ?? "Not found"}</p>
                    ))}
                </div>
            </div>
        </ThemeContext.Provider>
    );

}
