const fs = require('fs')
const chalk = require('chalk')

const getNotes = function(){
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note Added!'));
    } else {
        console.log(chalk.red.inverse('Title Already Taken! Try with some other name'));
    }    
}

const removeNote = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => note.title !== title)
    
    // saveNotes(notesToKeep)
    // if(notes.length === notesToKeep.length){
    //     console.log(chalk.red.inverse('No Note Found!'));
    // } else {
    //     console.log(chalk.green.inverse('Note Removed!'));
    // }

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed!'));
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No Note Found!'));
    }

}

const listNotes = () => {
    const notes = loadNotes()
    if(notes.length === 0){
        console.log(chalk.red.inverse('Nothing to show! Add some notes first'))    
    } else {
        console.log('********************************')
        console.log(chalk.white.inverse('All Notes: '))
        console.log('********************************')
        notes.forEach( note => console.log('-> ' + note.title) )
        console.log('********************************')
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((n) => n.title === title)

    if (note){
        console.log('********************************')
        console.log(chalk.white.inverse('Note Title: ' + note.title))
        console.log('********************************')
        console.log('Note Body: ')
        console.log(note.body)
    }else {
        console.log(chalk.red.inverse('No Note Found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(error){
        return []
    }
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}