import Button from "../Button/Button";
import "./Form.scss";

export default function Form(idEdit: string) {
  const text = !!idEdit ? "Edit" : "Add";
  return `
    <form class="form" id="form">
      <input type="text" class="form__input" id="formInputText" placeholder="${
        !!idEdit ? "" : "Add a new item..."
      }" />
      ${Button({ text, className: "form__button" })}
    </form>
  `;
}
