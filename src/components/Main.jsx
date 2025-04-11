import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Main() {
  const [inputText,setInputText] = useState("");
  const [todolist,setTodolist] = useState([]);
  const [editText,setEditText] = useState("");
  //テキストをTodoに入れるのではなく、text,id,checkboxの要素を持ったオブジェクトをTodoの配列に格納するように変更する。
  
  const handleText = (e) => {
    setInputText(e.target.value);
  }
  
  const handleClick = () => {
    const newTodo = {
      id:uuidv4(),
      text:inputText,
      checkbox:false,
    }
    const newTodolist = [newTodo,...todolist];
    setTodolist(newTodolist);
    setInputText("");
  }

  const handleEditText = (id,value) => {
    const item = todolist.find(item => item.id === id);
    setEditText(value);
    item.text = value;
  }

  const handleDelete = (id) => {
    const newTodolist = [...todolist];
    const deletedTodolist = newTodolist.filter((item, index) => (item.id !== id));
    setTodolist(deletedTodolist);
  }
  return (
    <main className={styles.main}>
      <div className={styles.textbox}>
        <input className={styles.textbox_content} type="text" onChange={handleText} value={inputText}/>
        <button className={styles.textbox_content} onClick={handleClick}>追加</button>
      </div>
      <ul>
        { todolist.map((item) => {
          return(
            <li className={styles.list} key={item.id}>
              <input className={styles.textbox_content} type="checkbox" />
              <input className={styles.textbox_content} type="text" value={item.text} onChange={(e) => {handleEditText(item.id,e.target.value)}}></input>
              <button className={styles.textbox_content} onClick={() => handleDelete(item.id)}>削除</button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
