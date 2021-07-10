import { TListener, TDispatch, TUnsubscribe } from "./types";

class Store<StateT> {
  private state: StateT;
  private listeners: TListener[];

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

  public subscribe(listener: TListener) {
    this.listeners.push(listener);

    const unsubscribe: TUnsubscribe = () => {
      this.listeners = this.listeners.filter(
        (listener_) => listener_ !== listener
      );
    };

    return unsubscribe;
  }

  public setState(state: StateT | TDispatch<StateT>) {
    const prevState = this.state;
    if (typeof state === "function") {
      const dispatch = state as TDispatch<StateT>;
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
