const form = document.querySelector("form"),
  emailInput = document.form.querySelector("#email");

// Email Validtion
function checkEmail() {
  const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailInput.value.match(emaiPattern)) {
    return document.form.classList.add("invalid"); //adding invalid class if email value do not mathced with email pattern
  }
  document.form.classList.remove("invalid"); //removing invalid class if email value matched with emaiPattern
}

// Calling Funtion on Form Sumbit
form.addEventListener("submit", (e) => {
//   e.preventDefault(); //preventing form submitting
  checkEmail();

  //calling function on key up
  emailInput.addEventListener("keyup", checkEmail);

  if (document.form.classList.contains("invalid")) {
    e.preventDefault();
  }
});
