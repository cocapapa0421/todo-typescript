export type Listener = () => void;
export type Dispatch<StateT extends any> = (state: StateT) => StateT;

class Store<StateT> {
  private state: StateT;
  private listeners: Listener[];

  constructor(state: StateT) {
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

  public setState(state: StateT | Dispatch<StateT>) {
    const prevState = this.state;
    if (typeof state === "function") {
      const dispatch = state as Dispatch<StateT>;
      this.state = dispatch(prevState);
    } else {
      this.state = state;
    }

    this.handleListener();
  }

  public getState() {
    return this.state;
  }
}

function createState<StateT extends any = any>(initialState: StateT) {
  const store = new Store(initialState);
  return store;
}

export default createState;
