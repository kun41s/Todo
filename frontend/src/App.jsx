import TodoContract from "./components/todoContract";
import ConnectWallet from "./components/connectWallet";
import React from "react";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [walletBtn, setWalletBtn] = useState(false);
  const [checkedBox, setCheckedBox] = useState(false);

  async function connectWallet() {
    const contract = await TodoContract();
    setWalletBtn(true);
    return contract;
  }

  async function getTodoList() {
    try {
      if (walletBtn === true) {
        const contract = await TodoContract();
        const getTodoList = await contract.getTask();
        // console.log(getTodoList);
        setTodoList(getTodoList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleInputChange(event) {
    const newTodo = event.target.value;
    setInput(newTodo);
  }

  async function submitTodo(event) {
    try {
      event.preventDefault();
      const contract = await TodoContract();
      await contract.createTask(input);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCheckedBox(event) {
    try {
      if (checkedBox === false) {
        const id = event.currentTarget.id;
        setCheckedBox(true);
        console.log(id, checkedBox);
        const contract = await TodoContract();
        await contract.updateTaskStatus(id);
      } else if (checkedBox === true) {
        const id = event.currentTarget.id;
        setCheckedBox(false);
        console.log(id, checkedBox);
        const contract = await TodoContract();
        await contract.updateTaskStatus(id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  getTodoList();

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>

      <div className="form">
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
          <button type="button" onClick={submitTodo}>
            Add
          </button>
        </div>
      </div>

      {todoList.map((todo, i) => {
        return (
          <div className={todoList} key={i}>
            <input
              value={todo}
              id={i}
              type="checkbox"
              onChange={handleCheckedBox}
            />
            <span>{todo}</span>
          </div>
        );
      })}

      {walletBtn === false ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
