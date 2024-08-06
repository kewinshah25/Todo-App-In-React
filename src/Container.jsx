// Saves the list of todo items
import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./styles.css";
export default function Container() {
    const [todoItems, setTodoItems] = useState( localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : []);
    const [input, setInput] = useState("");
    console.log(todoItems);
    

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

    return (
        // Container for 1 card
        <div className="card-container">
            <div className="center">
                <input value={input} type="text" placeholder="+" onKeyDown={addItemToList} onChange={handleChange}></input>
            </div>
            <ul className="todo-list">
                {todoItems.map(todoItem =>
                    <li onClick={() => toggleDone(todoItem)} key={todoItem.id} className="list-container"> <span className={`list ${todoItem.done ? "strike" : ""}`}>{todoItem.value}</span> </li>
                )}
            </ul>
        </div>
    );
}