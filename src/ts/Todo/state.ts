import createState from "../createState";
import type { TodoItem } from "../createState";

const { subscribe, getState, setState } = createState();

function getTodolist() {
  const { data } = getState();
  return data;
}

function setTodolist(list: TodoItem[]) {
  setState((state) => {
    return {
      ...state,
      data: list,
    };
  });
}

function getIdEdit() {
  const { idEdit } = getState();

  return idEdit;
}

function setIdEdit(id: string) {
  setState((state) => {
    return {
      ...state,
      idEdit: id,
    };
  });
}

function addTodoItem(todoItem: TodoItem) {
  setState((state) => {
    return {
      ...state,
      data: [...state.data, todoItem],
    };
  });
}

function editTodoItem({ id, content }: { id: string; content: string }) {
  setState((state) => {
    return {
      ...state,
      data: state.data.map((item) => {
        if (item.id !== id) {
          return item;
        }
        return {
          ...item,
          content,
        };
      }),
      idEdit: "",
    };
  });
}

function completeTodoItem(id: string) {
  setState((state) => {
    return {
      ...state,
      data: state.data.map((item) => {
        if (item.id !== id) {
          return item;
        }
        return {
          ...item,
          complete: !item.complete,
        };
      }),
    };
  });
}

function deleteTodoItem(id: string) {
  setState((state) => {
    return {
      ...state,
      data: state.data.filter((item) => item.id !== id),
    };
  });
}

export {
  subscribe,
  getIdEdit,
  getTodolist,
  setTodolist,
  setIdEdit,
  addTodoItem,
  editTodoItem,
  completeTodoItem,
  deleteTodoItem,
};
