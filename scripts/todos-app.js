'use strict'

const filters = {
    searchText: '',
    completedFlag: false
}

let todos = getExistingTodos()
renderAll(todos, filters)

document.querySelector('#new-todo').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderAll(todos, filters)
})

// addition of new todo do list and rendering whole page with form submit 
    document.querySelector('#new-form').addEventListener('submit', (e) => {
        e.preventDefault()
        addTodo(e.target.elements.newTodo.value)
        renderAll(todos, filters)
        e.target.elements.newTodo.value = ''
    })


document.querySelector('#hide-done').addEventListener('change', (e) => {
    document.querySelector('#to-dos').innerHTML = ''
    filters.completedFlag = e.target.checked
    renderAll(todos, filters)
})






