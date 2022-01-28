const fs = require('fs');
const { up } = require('inquirer/lib/utils/readline');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const readFileVar = util.promisify(fs.readFile);
const writeFileVar = util.promisify(fs.writeFile);

class Notes {
    read() {
        return readFileVar("db/db.json", "utf-8");
    };

    write(note) {
        return writeFileVar('db/db.json', JSON.stringify(note))
    }
    getNote() {
        return this.read()
            .then(notes => {
                let parseNotes
                try {
                    parseNotes = [].concat(JSON.parse(notes))
                } catch (err) {
                    parseNotes = [];
                } 
                return parseNotes;
            });
    };
    createNewNote(note) {
        const { title, text } = note;
        // if title and text don't exist yell at them
        const newNote = { title, text, id:uuidv4() };
        return this.getNote()
        .then(notes => [...notes, newNote])
        .then(updatedNotes => this.write(updatedNotes))
        .then(() => newNote);
    };
    removeNote(id) {
        return this.getNote()
        .then(notes => notes.filter(note => note.id !== id))
        .then(updatedNotes => this.write(updatedNotes))
    }
}


module.exports = new Notes()