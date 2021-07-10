import { TTodoCard } from "./../types";
import TodoCard from "../TodoCard/TodoCard";
import "./Todolist.scss";

export default function Todolist(list: TTodoCard[]) {
  return `
    <div class="todo__list">
      ${
        !!list.length
          ? list.map(TodoCard).join(" ")
          : "No records, please add a new one"
      }
    </div>
  `;
}
