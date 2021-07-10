import "./Button.scss";
import { TButton } from "./../types";

export default function Button({ text, className, dataAttributes }: TButton) {
  return `
    <button class="button ${!!className ? className : ""}" ${
    dataAttributes ? dataAttributes.join(" ") : ""
  }>
      <span class="button__text">${text}</span>
    </button>
  `;
}
