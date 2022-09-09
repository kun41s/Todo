import TodoContract from "./components/todoContract";
import ConnectWallet from "./components/connectWallet";
import React from "react";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);

  async function connectWallet() {
    await TodoContract();
  }

  async function getTodoList() {
    if (!connectWallet) {
      alert("Please Connect your wallet");
    } else if (connectWallet) {
      const contract = await TodoContract();
      const getTodoList = await contract.getTask();
      // console.log(getTodoList);
      setTodo(getTodoList);
    }
  }

  function handleInputChange(event) {
    const newTodo = event.target.value;
    setInput(newTodo);
  }

  async function submitTodo(event) {
    event.preventDefault();
    console.log(input);
    const contract = await TodoContract();
    await contract.createTask(input);
  }

  getTodoList();

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>

      <div>
        <form onSubmit={submitTodo}>
          <label>
            <input
            type="text"
              onChange={handleInputChange}
              value={input}
              placeholder="Add Todo"
            />
          </label>
        </form>
        <div>
          <button type="button" onClick={submitTodo}>Add</button>
        </div>
      </div>

      {todo.map((todo, i) => {
        return (
          <div key={i}>
            <ul>
              <li>{todo}</li>
            </ul>
          </div>
        );
      })}

      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
}

export default App;
