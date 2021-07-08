import type { TodoItem } from "./../createState";
import {
  subscribe,
  getIdEdit,
  getTodolist,
  setTodolist,
  setIdEdit,
  addTodoItem,
  editTodoItem,
  completeTodoItem,
  deleteTodoItem,
} from "./state";

class Todolist {
  private els: HTMLDivElement;
  private inputTetxElement!: HTMLInputElement;

  constructor(selector: string, todoList: TodoItem[]) {
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
    const todoItem: TodoItem = {
      id: Date.now().toString(),
      content,
      complete: false,
    };
    addTodoItem(todoItem);
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
    const targetEl = event.currentTarget as HTMLButtonElement;
    const id = targetEl.getAttribute(attribute);
    return id;
  }

  private renderForm() {
    const idEdit = getIdEdit();

    return `
      <form id="form">
        <input type="text" id="formInputText" placholder="${
          !!idEdit ? "" : "Add a new item..."
        }" />
        <button id="formButton">${!!idEdit ? "Edit" : "Add"}</button>
      </form>
    `;
  }

  private renderTodoItem(item: TodoItem) {
    return `
      <li>
        <span style="color: ${item.complete ? "red" : "inherit"}">${
      item.content
    }</span>
        <span class="button-groups">
          <button class="button edit" data-id="${item.id}">Edit</button>
          <button class="button complete" data-id="${item.id}">Complete</button>
          <button class="button delete" data-id="${item.id}">Delete</button>
        </span>
      </li>
    `;
  }

  private renderApp(list: TodoItem[]) {
    const html = `
      <div class="todo">
        ${this.renderForm()}
        <ul class="todo__list">
          ${list.map(this.renderTodoItem).join(" ")}
        </ul>
      </div>
    `;

    this.els.innerHTML = html;
  }

  private update() {
    const list = getTodolist();
    this.renderApp(list);
    this.handleDOM();
  }
}

export default Todolist;
