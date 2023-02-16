//Seletores dos inputs do Formulário
const fullName = {
  input: document.querySelector("#name"),
  label: document.querySelector("#label-name"),
  error: document.querySelector(".text-error-name"),
};
const phone = {
  input: document.querySelector("#phone"),
  label: document.querySelector("#label-phone"),
  error: document.querySelector(".text-error-phone"),
};
const email = {
  input: document.querySelector("#email"),
  label: document.querySelector("#label-email"),
  error: document.querySelector(".text-error-email"),
};
const number = {
  input: document.querySelector("#number"),
  label: document.querySelector("#label-number"),
  error: document.querySelector(".text-error-number"),
};
const form = document.querySelector("#form");
// Seletores da Página de Resultados
const content = document.querySelector(".content");
const question = document.querySelector(".question");
// Seletores do loader
const loaderContainer = document.querySelector(".loader-container");
const loader = document.querySelector(".loader");

const formPage = document.querySelector("#form-page");
const resultsPAge = document.querySelector("#results-page");

// Constantes Regex
const REGEX_LETTERS_ONLY = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
const REGEX_NAME_FORMAT =
  /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+ [A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
const REGEX_EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGEX_PHONE_FORMAT = /^\d{10,11}$/;

// Funções de Validação por Estilização
const setValidStyle = (label, border, error) => {
  label.setAttribute("style", "color: green");
  border.setAttribute("style", "border-color: green");
  error.textContent = "";
};

const setInvalidStyle = (label, border, error, errorMessage) => {
  label.setAttribute("style", "color: red");
  border.setAttribute("style", "border-color: red");
  error.innerHTML = `${errorMessage}`;
};

const setDefaultStyle = (label, border, error) => {
  label.setAttribute("style", "color: black");
  border.setAttribute("style", "border-color: none");
  error.textContent = "";
};
// Função de validação do Nome Completo
const validateFullNameInputField = () => {
  const trimmedFullName = fullName.input.value.trim();

  if (
    !trimmedFullName.match(REGEX_LETTERS_ONLY) &&
    trimmedFullName.length > 0
  ) {
    setInvalidStyle(
      fullName.label,
      fullName.input,
      fullName.error,
      "Por favor, utilize apenas letras e espaços."
    );
    return;
  }
  if (
    !trimmedFullName.match(REGEX_LETTERS_ONLY) ||
    !trimmedFullName.match(REGEX_NAME_FORMAT)
  ) {
    setDefaultStyle(fullName.label, fullName.input, fullName.error);
    return;
  }
  setValidStyle(fullName.label, fullName.input, fullName.error);
  fullName.input.removeEventListener("input", validateFullNameInputField);
};

// Funções de validação do Número de Telefone

const validatePhoneNumberInputField = () => {
  const number = phone.input.value.replace(/\D/g, "");
  const formattedNumber = number.replace(
    /^(\d{2})(\d{4,5})(\d{4}).*/,
    "($1) $2-$3"
  );
  phone.input.value = formattedNumber;
  if (number.length >= 10) {
    setValidStyle(phone.label, phone.input, phone.error);
  } else {
    setDefaultStyle(phone.label, phone.input, phone.error);
  }
};

// Funções de validação do Endereço de Email
const validateEmailInputField = () => {
  if (email.input.value.match(REGEX_EMAIL_FORMAT)) {
    setValidStyle(email.label, email.input, email.error);
  } else {
    setDefaultStyle(email.label, email.input, email.error);
  }
};

const checkValidateEmailInputField = () => {
  if (
    !email.input.value.match(REGEX_EMAIL_FORMAT) &&
    email.input.value.length > 0
  ) {
    setInvalidStyle(
      email.label,
      email.input,
      email.error,
      "Por favor, insira um endereço de email válido."
    );
  }
};

const validateNumberInputField = () => {
  if (number.input.value > 0 && number.input.value <= 999) {
    setValidStyle(number.label, number.input, number.error);
  } else if (number.input.value > 999) {
    setInvalidStyle(
      number.label,
      number.input,
      number.error,
      "Por favor, utilize apenas números entre 1 e 999"
    );
  } else {
    setDefaultStyle(number.label, number.input, number.error);
  }
};

// Função para salvar os valores dos inputs
const saveFormResponses = (event) => {
  event.preventDefault();

  let formData = JSON.parse(localStorage.getItem("formData") || "[]");

  formData = {
    fullName: fullName.input.value.toLowerCase(),
    phone: phone.input.value,
    email: email.input.value.toLowerCase(),
    number: number.input.value,
  };
  localStorage.setItem("formData", JSON.stringify(formData));
  window.location.href = "/result.html";
};

// Função para exibir os resultados
const formResponseResults = () => {
  const inputData = JSON.parse(localStorage.getItem("formData"));

  loaderContainer.style.display = "block";

  const fullName = inputData.fullName.trim();
  const phone = inputData.phone;
  const email = inputData.email;
  const number = inputData.number;

  if (inputData.number % 3 === 0) {
    loaderContainer.style.display = "none";
    const firstName = fullName.split(" ")[0];
    question.innerHTML = `O número ${number} é divisível por 3:`;
    content.innerHTML = `Primeiro Nome: <span style="text-transform: capitalize" >${firstName}</span>`;
  } else if (inputData.number % 5 === 0) {
    const dddPhone = phone.substring(2, 4);
    question.innerHTML = `O número ${number} é divisível por 5:`;
    content.innerHTML = `DDD do Telefone: <span>${dddPhone}</span>`;
  } else if (inputData.number % 7 === 0) {
    const domainIndex = email.indexOf("@");
    const domainLastIndex = email.lastIndexOf(".");
    const emailDomain = email.substring(domainIndex + 1, domainLastIndex);
    question.innerHTML = `O número ${number} é divisível por 7:`;
    content.innerHTML = `Domínio do Email: <span>${emailDomain}</span>`;
  } else {
    const nameLength = fullName.replace(/["]/g, "").split(" ").join("");
    const emailLength = email.replace(/[^a-zA-Z0-9]/g, "");
    question.innerHTML = `O número ${number} não é divisível por 3, por 5 ou por 7:`;
    content.innerHTML = `
    <ul>
      <li>Quantidade de letras do Nome Completo: </br><span>${nameLength.length}</span></li>
      <li>Quantidade de caracteres do email (exceto @ e pontos):</br><span>${emailLength.length}</span></li>
    </ul>
    `;
  }

  loaderContainer.style.display = "none";
};

// Eventos
if (fullName.input)
  fullName.input.addEventListener("input", validateFullNameInputField);
if (phone.input)
  phone.input.addEventListener("input", validatePhoneNumberInputField);
if (email.input) {
  email.input.addEventListener("input", validateEmailInputField);
  email.input.addEventListener("blur", checkValidateEmailInputField);
}
if (number.input)
  number.input.addEventListener("input", validateNumberInputField);
if (form) form.addEventListener("submit", saveFormResponses);
