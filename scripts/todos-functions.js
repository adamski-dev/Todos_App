'use strict'

// Read existing todos from local storage

const getExistingTodos = () => {

    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }
}

// Remove todo from the list
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if(todoIndex > -1){
        todos.splice(todoIndex, 1)
    }
}

// Toggle the completed value for a given todo
const toggleTodo = function(id){
    const todo = todos.find((todo) => todo.id === id)

    if (todo){
        todo.completed = !todo.completed
    }
}

// Render All option from the course with filters active

const renderAll = (todos, filters) => {
    const todoElement = document.querySelector('#to-dos')
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.completedFlag || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todoElement.innerHTML = ''
    todoElement.appendChild(generateSummaryDOM(incompleteTodos))

    if(filteredTodos.length > 0){
        filteredTodos.forEach((todo) => {
            todoElement.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageElement = document.createElement('p')
        messageElement.classList.add('empty-message')
        messageElement.textContent = 'No todos to show'
        todoElement.appendChild(messageElement)
    }
    
}

// Generate the DOM element for an individual todo
const generateTodoDOM = (todo) => {

    const todoElement = document.createElement('label')
    const containerElement = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    //setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerElement.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderAll(todos, filters)
    })

    //setup todo text
    todoText.textContent = todo.text
    containerElement.appendChild(todoText)

    //Setup container
    todoElement.classList.add('list-item')
    containerElement.classList.add('list-item__container')
    todoElement.appendChild(containerElement)

    //setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoElement.appendChild(removeButton)

    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderAll(todos, filters)
    })

    return todoElement
}

// Generate the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    // displaying number of incomplete todos as h2 tag 
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    const plural = incompleteTodos.length === 1 ? '' : 's'

    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
    return summary
}

// Save todos to local Storage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Addition of new todo
const addTodo = (newTodo) => {

    if(newTodo !== '' && newTodo.trim(' ')){
        todos.push({
            id: uuidv4(),
            text: newTodo, 
            completed: false
        })
        saveTodos(todos)
    }
}