//Seletores da Página de Formulário
const inputName = document.querySelector("#name");
const labelName = document.querySelector("#label-name");
const inputPhone = document.querySelector("#phone");
const labelPhone = document.querySelector("#label-phone");
const inputEmail = document.querySelector("#email");
const labelEmail = document.querySelector("#label-email");
const inputNumber = document.querySelector("#number");
const labelNumber = document.querySelector("#label-number");
const submit = document.querySelector("#submit");
const form = document.querySelector("#form");
//Seletores da Página de Resultados
const resultsPage = document.querySelector("#results-page");
const content = document.querySelector(".content");
const question = document.querySelector(".question");
const inputData = JSON.parse(localStorage.getItem("formData"));

// Constantes Regex
const REGEX_LETTERS_ONLY = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
const REGEX_NAME_FORMAT =
  /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+ [A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
const REGEX_EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Funções
const letterOnlyValidation = () => {
  const inputNameTrim = inputName.value.trim();

  if (!inputNameTrim.match(REGEX_LETTERS_ONLY) && inputNameTrim.length > 0) {
    labelName.setAttribute("style", "color: red");
    inputName.setAttribute("style", "border-color: red");
    labelName.innerHTML = "Nome Completo </br>(Utilize apenas letras)";
  } else if (
    !inputNameTrim.match(REGEX_LETTERS_ONLY) ||
    !inputNameTrim.match(REGEX_NAME_FORMAT)
  ) {
    labelName.setAttribute("style", "color: black");
    inputName.setAttribute("style", "border-color: none");
    labelName.innerHTML = "Nome Completo";
  } else {
    labelName.setAttribute("style", "color: green");
    inputName.setAttribute("style", "border-color: green");
    labelName.innerHTML = "Nome Completo";
  }
};

const PhoneMask = (event) => {
  let number = event.target.value.replace(/\D/g, "");

  number = number.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  number = number.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  number = number.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  number = number.replace(/^(\d*)/, "$1");

  event.target.value = number;

  if (number.length >= 14) {
    labelPhone.setAttribute("style", "color: green");
    inputPhone.setAttribute("style", "border-color: green");
  } else {
    labelPhone.setAttribute("style", "color: black");
    inputPhone.setAttribute("style", "border-color: none");
  }
};

const isEmailValidation = () => {
  if (inputEmail.value.match(REGEX_EMAIL_FORMAT)) {
    labelEmail.setAttribute("style", "color: green");
    inputEmail.setAttribute("style", "border-color: green");
    labelEmail.innerHTML = "Email";
  } else {
    labelEmail.setAttribute("style", "color: black");
    inputEmail.setAttribute("style", "border-color: none");
    labelEmail.innerHTML = "Email";
  }
};

const isNumberValidation = () => {
  if (inputNumber.value > 0 && inputNumber.value <= 999) {
    labelNumber.setAttribute("style", "color: green");
    inputNumber.setAttribute("style", "border-color: green");
  } else if (inputNumber.value > 0 && inputNumber.value > 999) {
    labelNumber.setAttribute("style", "color: red");
    inputNumber.setAttribute("style", "border-color: red");
  } else {
    labelNumber.setAttribute("style", "color: black");
    inputNumber.setAttribute("style", "border-color: none");
  }
};

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

const formResponseResults = () => {
  const formatName = JSON.stringify(inputData.name.trim());
  const formatPhone = JSON.stringify(inputData.phone);
  const formatEmail = JSON.stringify(inputData.email);
  const formatnumber = JSON.stringify(inputData.number);

  if (inputData.number % 3 === 0) {
    const firstName = formatName.split(" ")[0].replace(/["]/g, "");
    question.innerHTML = `O número ${formatnumber} é divisível por 3:`;
    content.innerHTML = `Primeiro Nome: <span>${firstName}</span>`;
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
    question.innerHTML = `O número ${formatnumber} não é divisível por 3, 5 ou por 7:`;
    content.innerHTML = `
    <ul>
      <li>Quantidade de letras do Nome Completo: </br><span>${nameLength.length}</span></li>
      <li>Quantidade de caracteres do email (exceto @ e pontos):</br><span>${emailLength.length}</span></li>
    </ul>
    `;
  }
};

// Eventos
inputName.addEventListener("keyup", letterOnlyValidation);
inputPhone.addEventListener("keyup", PhoneMask);
inputEmail.addEventListener("keyup", isEmailValidation);
inputNumber.addEventListener("keyup", isNumberValidation);
form.addEventListener("submit", saveFormResponses);
