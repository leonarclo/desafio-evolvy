//Seletores da Página de Formulário
const inputName = document.querySelector("#name");
const labelName = document.querySelector("#label-name");
const textErrorName = document.querySelector(".text-error-name");
const inputPhone = document.querySelector("#phone");
const labelPhone = document.querySelector("#label-phone");
const inputEmail = document.querySelector("#email");
const labelEmail = document.querySelector("#label-email");
const textErrorEmail = document.querySelector(".text-error-email");
const inputNumber = document.querySelector("#number");
const labelNumber = document.querySelector("#label-number");
const textErrorNumber = document.querySelector(".text-error-number");
const submit = document.querySelector("#submit");
const form = document.querySelector("#form");
// Seletores da Página de Resultados
const content = document.querySelector(".content");
const question = document.querySelector(".question");
// Seletor do objeto com o valor dos inputs
const inputData = JSON.parse(localStorage.getItem("formData"));

// Constantes Regex
const REGEX_LETTERS_ONLY = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
const REGEX_NAME_FORMAT =
  /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+ [A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
const REGEX_EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGEX_PHONE_FORMAT = /^\d{10,11}$/;

// Funções de validação visual
const validStyle = (label, border) => {
  label.setAttribute("style", "color: green");
  border.setAttribute("style", "border-color: green");
};

const invalidStyle = (label, border) => {
  label.setAttribute("style", "color: red");
  border.setAttribute("style", "border-color: red");
};

const defaultStyle = (label, border) => {
  label.setAttribute("style", "color: black");
  border.setAttribute("style", "border-color: none");
};

// Funções de validação dos inputs
const fullNameValidation = () => {
  const inputNameTrim = inputName.value.trim();

  if (!inputNameTrim.match(REGEX_LETTERS_ONLY) && inputNameTrim.length > 0) {
    invalidStyle(labelName, inputName);
    textErrorName.innerHTML = "Por favor, utilize apenas letras e espaços.";
  } else if (
    !inputNameTrim.match(REGEX_LETTERS_ONLY) ||
    !inputNameTrim.match(REGEX_NAME_FORMAT)
  ) {
    defaultStyle(labelName, inputName);
    textErrorName.innerHTML = "";
  } else {
    validStyle(labelName, inputName);
    textErrorName.innerHTML = "";
  }
};

let number;
const phoneValidation = () => {
  number = inputPhone.value.replace(/\D/g, "");
  if (number.length >= 10) {
    validStyle(labelPhone, inputPhone);
    number.length === 10
      ? (number = number.replace(/^(\d\d)(\d{4})(\d{4}).*/, "($1) $2-$3"))
      : (number = number.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3"));
  } else {
    defaultStyle(labelPhone, inputPhone);
  }
  inputPhone.value = number;
};

const emailValidation = () => {
  if (inputEmail.value.match(REGEX_EMAIL_FORMAT)) {
    validStyle(labelEmail, inputEmail);
    textErrorEmail.innerHTML = "";
  } else {
    defaultStyle(labelEmail, inputEmail);
    textErrorEmail.innerHTML = "";
  }
};

const checkEmailValidation = () => {
  if (
    !inputEmail.value.match(REGEX_EMAIL_FORMAT) &&
    inputEmail.value.length > 0
  ) {
    invalidStyle(labelEmail, inputEmail);
    textErrorEmail.innerHTML = "Por favor, insira um email válido.";
  }
};

const numberValidation = () => {
  if (inputNumber.value > 0 && inputNumber.value <= 999) {
    validStyle(labelNumber, inputNumber);
  } else if (inputNumber.value > 0 && inputNumber.value > 999) {
    invalidStyle(labelNumber, inputNumber);
  } else {
    defaultStyle(labelNumber, inputNumber);
  }
};

// Função para salvar os valores dos inputs
const saveFormResponses = (event) => {
  event.preventDefault();
  if (
    inputName.value &&
    inputPhone.value &&
    inputEmail.value &&
    inputNumber.value
  ) {
    let formData = JSON.parse(localStorage.getItem("formData") || "[]");

    formData = {
      name: inputName.value.toLowerCase(),
      phone: inputPhone.value,
      email: inputEmail.value.toLowerCase(),
      number: inputNumber.value,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
    window.location.href = "/result.html";
  }
};

// Função para exibir os resultados
const formResponseResults = () => {
  const formatName = JSON.stringify(inputData.name.trim());
  const formatPhone = JSON.stringify(inputData.phone);
  const formatEmail = JSON.stringify(inputData.email);
  const formatnumber = JSON.stringify(inputData.number);

  if (inputData.number % 3 === 0) {
    const firstName = formatName.split(" ")[0].replace(/["]/g, "");
    question.innerHTML = `O número ${formatnumber} é divisível por 3:`;
    content.innerHTML = `Primeiro Nome: <span style="text-transform: capitalize" >${firstName}</span>`;
  } else if (inputData.number % 5 === 0) {
    const dddPhone = formatPhone.substring(2, 4);
    question.innerHTML = `O número ${formatnumber} é divisível por 5:`;
    content.innerHTML = `DDD do Telefone: <span>${dddPhone}</span>`;
  } else if (inputData.number % 7 === 0) {
    const domainIndex = formatEmail.indexOf("@");
    const domainLastIndex = formatEmail.lastIndexOf(".");
    const emailDomain = formatEmail.substring(domainIndex + 1, domainLastIndex);
    question.innerHTML = `O número ${formatnumber} é divisível por 7:`;
    content.innerHTML = `Domínio do Email: <span>${emailDomain}</span>`;
  } else {
    const nameLength = formatName.replace(/["]/g, "").split(" ").join("");
    const emailLength = formatEmail.replace(/[^a-zA-Z0-9]/g, "");
    question.innerHTML = `O número ${formatnumber} não é divisível por 3, por 5 ou por 7:`;
    content.innerHTML = `
    <ul>
      <li>Quantidade de letras do Nome Completo: </br><span>${nameLength.length}</span></li>
      <li>Quantidade de caracteres do email (exceto @ e pontos):</br><span>${emailLength.length}</span></li>
    </ul>
    `;
  }
};

// Eventos
inputName.addEventListener("input", fullNameValidation);
inputPhone.addEventListener("input", phoneValidation);
inputEmail.addEventListener("input", emailValidation);
inputEmail.addEventListener("blur", checkEmailValidation);
inputNumber.addEventListener("input", numberValidation);
form.addEventListener("submit", saveFormResponses);
