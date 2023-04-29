import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

export default function Todo() {
  return (
    <div className="todo-container">
      <div className="header">
        <img src={logo} alt="logo" className="logo"/>
      </div>
      <form className="todo-list">
        <ul>
          <TodoElements />
        </ul>
      </form>
    </div>
  )
}

function TodoElements() {
  const [todos, setTodos] = useState([{content: 'First Element', isComplete:false}])

  return (
    <>
    {
      todos.map((todo, i) => (
        <div className={`todo ${todo.isComplete && 'todo-is-completed'}`}>
          <div className={`checkbox ${todo.isComplete && 'checkbox-checked'}`} onClick={() => toggleCompleteState(i)}>
            {todo.isComplete && <span>&#x2714;</span>}
          </div>
          <input type="text" value={todo.content} onChange={(e) => handleEdit(e, i)} onKeyDown={(e) => handleKeyDown(e, i)}/>
        </div>
      ))
    }
    </>
  )

  function toggleCompleteState(i) {
    const newTodos = [...todos]

    newTodos[i].isComplete = !newTodos[i].isComplete
    setTodos(newTodos)
  }

  function handleEdit(e, i) {
    const newTodos = [...todos]

    newTodos[i].content = e.target.value

    setTodos(newTodos)
  }

  function handleKeyDown(e, i) {
    
    if (e.key === 'Enter') {
      createNewElement(e, i)
    }

    if (e.key === "Backspace" && todos[i].content === "") {
      e.preventDefault()
      DeleteElement(i)
    }
  }

  function DeleteElement(i) {
    if (i === 0 && todos.length === 1) {
      const newTodos = [...todos]
       newTodos[i].content = 'Insert first element'
      setTodos(newTodos)
      return
    } 
    setTodos(todos.slice(0, i).concat(todos.slice(i + 1, todos.length)))
    if (i === 0) {
      setTimeout(() => {
        document.forms[0].elements[i].focus();
     }, 0);
     return
    }
    setTimeout(() => {
           document.forms[0].elements[i - 1].focus();
        }, 0);
  }

  function createNewElement(e, i) {
    const newTodos = [...todos]

    newTodos.splice(i + 1, 0, {content: '', isComplete: false})
    setTodos(newTodos)
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus()
    }, 0);
  }
}