import { TTodoCard } from "./../types";
import "./Todo.scss";
import { v4 as uuidv4 } from "uuid";
import {
  subscribe,
  getIdEdit,
  getTodoState,
  setTodolist,
  setIdEdit,
  addTodoItem,
  editTodoItem,
  completeTodoItem,
  deleteTodoItem,
} from "./state";
import Form from "../Form/Form";
import Todolist from "../Todolist/Todolist";

class Todo {
  private els: HTMLDivElement;
  private inputTetxElement!: HTMLInputElement;

  constructor(selector: string, todoList: TTodoCard[]) {
    this.els = document.querySelector(selector) as HTMLDivElement;
    subscribe(this.update.bind(this));
    setTodolist(todoList);
    this.update();
  }

  private handleDOM() {
    const idEdit = getIdEdit();
    const todoElement = document.querySelector(".todo") as HTMLDivElement;
    const formElement = todoElement.querySelector("#form") as HTMLFormElement;
    this.inputTetxElement = todoElement.querySelector(
      "#formInputText"
    ) as HTMLInputElement;
    const editElements = Array.from(
      document.querySelectorAll(".edit")
    ) as HTMLButtonElement[];
    const completeElements = Array.from(
      document.querySelectorAll(".complete")
    ) as HTMLButtonElement[];
    const deleteElements = Array.from(
      document.querySelectorAll(".delete")
    ) as HTMLButtonElement[];

    formElement.addEventListener(
      "submit",
      !!idEdit
        ? this.handleEditTodoItem.bind(this)
        : this.handleAddTodoItem.bind(this)
    );

    editElements.forEach((element) =>
      element.addEventListener("click", this.handleSetIdEdit.bind(this))
    );
    completeElements.forEach((element) =>
      element.addEventListener("click", this.handleCompleteTodoItem.bind(this))
    );
    deleteElements.forEach((element) =>
      element.addEventListener("click", this.handleDeleteTodoItem.bind(this))
    );
  }

  private handleAddTodoItem(event: Event) {
    event.preventDefault();
    const { value: content } = this.inputTetxElement;
    if (!content) {
      return;
    }
    const item: TTodoCard = {
      id: uuidv4(),
      content,
      complete: false,
    };
    addTodoItem(item);
  }

  private handleEditTodoItem(event: Event) {
    event.preventDefault();
    const { value: content } = this.inputTetxElement;
    if (!content) {
      return;
    }
    const idEdit = getIdEdit();
    editTodoItem({ id: idEdit, content });
  }

  private handleSetIdEdit(event: MouseEvent) {
    const id = this.getAttribute(event);
    if (!id) {
      return;
    }
    setIdEdit(id);
    this.inputTetxElement.focus();
  }

  private handleCompleteTodoItem(event: MouseEvent) {
    const id = this.getAttribute(event);
    if (!id) {
      return;
    }
    completeTodoItem(id);
  }

  private handleDeleteTodoItem(event: MouseEvent) {
    const id = this.getAttribute(event);
    if (!id) {
      return;
    }
    deleteTodoItem(id);
  }

  private getAttribute(event: MouseEvent, attribute: string = "data-id") {
    const targetEl = event.currentTarget as HTMLElement;
    const id = targetEl.getAttribute(attribute);
    return id;
  }

  private render() {
    const { idEdit, data } = getTodoState();
    let html = `
      <div class="todo">
        ${Form(idEdit)}
        <div class="todo__head grid">
          <div class="todo__head-status">Status</div>
          <div class="todo__head-content">Task Name</div>
          <div class="todo__head-actions">Actions</div>
        </div>
        ${Todolist(data)}
      </div>
    `;

    this.els.innerHTML = html;
  }

  private update() {
    this.render();
    this.handleDOM();
  }
}

export default Todo;
