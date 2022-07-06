"use strict";
const visibilityIcon = document.querySelector(".icon-eye");
const userInput = document.querySelector(".login-input-user");
const passwordInput = document.querySelector(".login-password");
const ValiatinErrorMsg = document.querySelector(".validation_msg");
const confirmBtns = document.querySelector(".login__btn");
const form = document.querySelector(".signin");
const formPassword = document.querySelector(".signin_password");
const formForgetPassword = document.querySelector(".forgetPassword");
const btnname = document.querySelector("user");
// //////
const forgetpassbtn = document.getElementById("forgetpassbtn");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const closemodal = document.querySelector(".close-modal");
//
// ///////
// validation of username & password
const checkUsername = () => {
  let valid = false;
  const min = 3,
    max = 23;
  const username = userInput.value.trim();

  if (!isRequired(username)) {
    showError(userInput, "username cant be empty");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      userInput,
      `username must be between ${min} and ${max} characters`
    );
  } else {
    showSuccess(userInput);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;
  const min = 8,
    max = 25;
  const password = passwordInput.value.trim();

  if (!isRequired(password)) {
    showError(passwordInput, "password cant be empty");
  } else if (
    !isBetween(password.length, min, max) &&
    !isPasswordSecure(password)
  ) {
    showError(
      passwordInput,
      `password must be between at least ${min} characters
      must include at least 1 lowercase, 1 uppercase character, 1 number
       and 1 special character in (!@#$%^&*)
      `
    );
  } else {
    showSuccess(passwordInput);
    valid = true;
  }
  return valid;
};

// functions
const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;
const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

const showError = function (input, message) {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  ValiatinErrorMsg.textContent = message;
};

const showSuccess = function (input) {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  ValiatinErrorMsg.textContent = "";
};
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
const buttonevents = function () {
  if (confirmBtns.name === "continueButton") {
    form.addEventListener("submit", function (e) {
      if (checkUsername()) {
        form.setAttribute("action", "loginPassword.html");
      } else {
        e.preventDefault();
      }
    });
  } else if (confirmBtns.name === "confirmButton") {
    formPassword.addEventListener("submit", function (e) {
      if (checkPassword()) {
        formPassword.setAttribute("action", "");
      } else {
        e.preventDefault();
      }
    });
  } else if (confirmBtns.name === "forget") {
    forgetpassbtn.addEventListener("click", function (e) {
      if (checkUsername()) {
        e.preventDefault();
        openModal();
        closemodal.addEventListener("click", closeModal);
      } else {
        e.preventDefault();
      }
    });
  }
};
buttonevents();

// back link button to previous page
const backlinkEvent = function () {
  const backLinkEl = document.querySelector(".back__link");
  backLinkEl.setAttribute("href", document.referrer);
  backLinkEl.parentElement.onclick = function () {
    history.back();
    return false;
  };
};
backlinkEvent();

// password visibility
visibilityIcon.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    visibilityIcon.src = "img/eye-closed.png";
  } else {
    passwordInput.type = "password";
    visibilityIcon.src = "img/eye.png";
  }
});
// confirmbtn.addEventListener("click", function () {
//   if (passwordInput.value.length < 8) {
//     valiatinError.textContent = "pass must be more than8";
//   } else {
//     valiatinError.textContent = "";
//   }
// });

// const continueBtn = document.querySelector(".login__btn");
// continueBtn.addEventListener("click", function () {
//   window.location.href = "loginPassword.html";
// });
