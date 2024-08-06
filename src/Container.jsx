// Saves the list of todo items
import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./styles.css";
export default function Container() {
    const [todoItems, setTodoItems] = useState( localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : []);
    const [input, setInput] = useState("");
    console.log('Noob Girya!');
    

    function addItemToList(e) {
        if (e.key !== "Enter") return;
        if (input?.trim().length > 0) {
            let todos = [...todoItems, { id: uuid(), value: e.target.value, done: false }];
            setTodoItems(() => todos);
            setInput(() => "");
            localStorage.setItem("todo", JSON.stringify(todos))
        }
    }

    function handleChange(e) {
        setInput(() => e.target.value);
    }

    function toggleDone(todoItem) {
        let todos = todoItems.map(t => {
            if (t.id === todoItem.id) return {...t, done: !t.done};
            else return t;
        });
        setTodoItems(() => todos);
        localStorage.setItem("todo", JSON.stringify(todos))
    }

    function deleteItem(item) {
        let todos = [...todoItems].filter(t => t.id !== item.id);
        setTodoItems(() => todos);
        localStorage.setItem("todo", JSON.stringify(todos))
    }

    return (
        // Container for 1 card
        <div className="card-container">
            <div className="center">
                <input className="input-container" value={input} 
                    type="text" placeholder="+" onKeyDown={addItemToList} onChange={handleChange}>
                </input>
            </div>
            <ul className="todo-list">
                {todoItems.map(todoItem =>
                    <li key={todoItem.id} className="list-container"> 
                        <div className={`list-item ${todoItem.done ? "strike" : ""}`} onClick={() => toggleDone(todoItem)} >
                            {todoItem.value}
                        </div>  
                        <div className="list-item" onClick={() => deleteItem(todoItem)}>x</div>
                    </li>
                )}
            </ul>
        </div>
    );
}