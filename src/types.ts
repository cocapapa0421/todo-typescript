export type TButtonTag = "button" | "a";
export type TListener = () => void;
export type TUnsubscribe = () => void;
export type TStatus = "idle" | "request" | "success" | "failure";
export type TDispatch<T extends any> = (state: T) => T;
export interface TTodoCard {
  id: string;
  content: string;
  complete: boolean;
  createdDate?: string;
}

export interface TTodoState {
  status: TStatus;
  data: TTodoCard[];
  idEdit: string;
}

export interface TButton {
  text: string;
  className?: string;
  dataAttributes?: string[];
}
