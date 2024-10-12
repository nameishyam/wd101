let userEntries = [];
window.onload = () => {
  localStorage.removeItem("user-entries");
};
const isAgeValid = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age >= 18 && age <= 55;
};
const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndConditions = document.getElementById("terms").checked;
  if (!isAgeValid(dob)) {
    alert("You must be between 18 and 50 years old.");
    return;
  }
  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndConditions,
  };
  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};
const displayEntries = () => {
  const entriesBody = document.getElementById("entries-body");
  entriesBody.innerHTML = ""; // Clear existing entries
  userEntries.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border border-gray-300 px-4 py-2">${entry.name}</td>
      <td class="border border-gray-300 px-4 py-2">${entry.email}</td>
      <td class="border border-gray-300 px-4 py-2">${entry.password}</td>
      <td class="border border-gray-300 px-4 py-2">${entry.dob}</td>
      <td class="border border-gray-300 px-4 py-2">${
        entry.acceptedTermsAndConditions ? "true" : "false"
      }</td>
    `;
    entriesBody.appendChild(row);
  });
};
document.getElementById("user-form").addEventListener("submit", saveUserForm);