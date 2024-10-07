import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { useState } from 'react';
import { ThemeContext, themes } from './themeContext';

function App() {
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
                        >
                            <div className="notes-header">
                                <button
                                    style={{
                                        background: currentTheme.background,
                                        color: currentTheme.foreground,
                                    }}
                                    onClick={() => setNotes(notes.filter(n => n.id !== note.id))}>x</button>
                                <button onClick={() => toggleLike(note.id)}>{favorites.includes(note.id) ? '❤️ ' : '🩶'}</button>
                            </div>
                            <h2 contentEditable={selectedNote === note.id}> {note.title} </h2>
                            <p contentEditable={selectedNote === note.id}> {note.content} </p>
                            <p contentEditable={selectedNote === note.id}> {note.label} </p>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>List of favorites</h2>
                    {favorites.map(id => (
                        <p>{dummyNotesList.find(x => x.id === id)?.title ?? "Not found"}</p>
                    ))}
                </div>
            </div>
        </ThemeContext.Provider>
    );
    /*return (
        <ThemeContext.Provider value={currentTheme}>
            <button onClick={toggleTheme}> Toggle Theme </button>
            <div className='app-container'
                style={{
                    background: currentTheme.background,
                    color: currentTheme.foreground,
                    padding: "20px",
                }}
            >
                <form className="note-form">
                    <div><input placeholder="Note Title"></input></div>

                    <div><textarea></textarea></div>

                    <div><button type="submit">Create Note</button></div>
                </form>
                <div className="notes-grid">
                    {dummyNotesList.map((note) => (
                        <div
                            key={note.id}
                            className="note-item"
                            style={{
                                background: currentTheme.background,
                                color: currentTheme.foreground,
                                padding: "20px",
                            }}
                        >

                            <div className="notes-header">
                                <button onClick={() => toggleLike(note.id)}>{favorites.includes(note.id) ? '❤️ ' : '🩶'}</button>
                                <button>x</button>
                            </div>
                            <h2> {note.title} </h2>
                            <p> {note.content} </p>
                            <p> {note.label} </p>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>List of favorites</h2>
                    {favorites.map(id => (
                        <p>{dummyNotesList.find(x => x.id === id)?.title ?? "Not found"}</p>
                    ))}
                </div>
            </div>
        </ThemeContext.Provider>
    );*/
}

export default App;
