type Listener = () => void;
export type Status = "idle" | "request" | "success" | "failure";
export type TodoItem = {
  readonly id: string;
  content: string;
  complete: boolean;
};
export type State = {
  data: TodoItem[];
  status: Status;
  idEdit: string;
  callback?(): () => void;
};

class Store {
  private state: State;
  private listeners: Listener[];

  constructor(state: State) {
    this.state = state;
    this.listeners = [];

    this.subscribe = this.subscribe.bind(this);
    this.setState = this.setState.bind(this);
    this.getState = this.getState.bind(this);
  }

  private handleListener() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }

  public subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  public setState(state: State | ((state: State) => State)) {
    const prevState = this.state;
    if (typeof state === "function") {
      this.state = state(prevState);
    } else {
      this.state = state;
    }

    this.handleListener();
  }

  public getState() {
    return this.state;
  }
}

function createState() {
  const initialState: State = {
    data: [],
    status: "idle",
    idEdit: "",
  };

  const store = new Store(initialState);
  return store;
}

export default createState;
