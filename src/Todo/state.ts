import { TTodoState, TTodoCard } from "./../types";
import createState from "../createState";

const initialState: TTodoState = {
  status: "idle",
  data: [],
  idEdit: "",
};

const { subscribe, getState, setState } = createState(initialState);

function getTodoState() {
  return getState();
}

function setTodolist(list: TTodoCard[]) {
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

function setIdEdit(idEdit: string) {
  setState((state) => {
    return {
      ...state,
      idEdit,
    };
  });
}

function addTodoItem(item: TTodoCard) {
  setState((state) => {
    return {
      ...state,
      data: [...state.data, item],
    };
  });
}

function editTodoItem({ id, content }: Omit<TTodoCard, "complete">) {
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
  getTodoState,
  setTodolist,
  setIdEdit,
  addTodoItem,
  editTodoItem,
  completeTodoItem,
  deleteTodoItem,
};
