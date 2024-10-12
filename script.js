let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndConditions = document.getElementById("terms").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndConditions,
  };

  userEntries.push(entry);

  localStorage.setItem("user-entries", JSON.stringify(userEntries));

  // Optional: Clear the form after saving
//   event.target.reset();
};

document.getElementById("user-form").addEventListener("submit", saveUserForm);
