// worlds simpliest crud
var textarea = document.querySelector('#notes')
var notes = []
var currentNote = 0

document.getElementById('new').addEventListener('click', function(e) {
    e.preventDefault()
    notes.push('')
    textarea.value = ''
    currentNote = notes.length - 1
})

document.getElementById('delete').addEventListener('click', function(e) {
    e.preventDefault()
    if(notes.length == 0){
        return
    } 
    if(notes.length == 1){
        notes = ['']
        textarea.value = ''
        currentNote = 0
        localStorage.setItem('notes', JSON.stringify(notes))
        updateList()
        return
    }
    notes.splice(currentNote, 1)
    currentNote = notes.length - 1
    textarea.value = notes[currentNote]
    localStorage.setItem('notes', JSON.stringify(notes))
    updateList()
})

function updateList(){
    document.querySelector('#all').innerHTML = ""
    for(let note of notes){
        let a = document.createElement('a')
        a.href = '#'
        a.textContent = note
        a.addEventListener('click', function(e) {
            e.preventDefault()
            textarea.value = note
            currentNote = notes.indexOf(note)
        })
        document.querySelector('#all').appendChild(a)
    }
}

if(localStorage.getItem('notes') !== null) {
    notes = JSON.parse(localStorage.getItem('notes'))
    textarea.value = notes[0]
    currentNote = notes.length - 1
    updateList()
} else {
    notes.push('')
    localStorage.setItem('notes', JSON.stringify(notes))
}

textarea.addEventListener('input', (e) => {
    notes[currentNote] = e.target.value
    localStorage.setItem('notes', JSON.stringify(notes))
    updateList()
})

let focusmode = false

if(localStorage.getItem('focusmode') !== null) {
    focusmode = JSON.parse(localStorage.getItem('focusmode'))
    if(focusmode){
        toggleFocusmode()
    }
}

function toggleFocusmode(){
    document.querySelector('.below').classList.toggle('hidden')
    document.querySelector('.root').classList.toggle('vcenter')
    document.getElementById('oneline').classList.toggle('hidden')
    document.getElementById('twoline').classList.toggle('hidden')
    document.querySelector('.visible-on-collapse').classList.toggle('hidden')
}

document.getElementById("togglebottom").addEventListener('click', function(e) {
    e.preventDefault()
    toggleFocusmode()
    localStorage.setItem('focusmode', JSON.stringify(!focusmode))
})