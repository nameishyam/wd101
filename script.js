let userEntries = [];

// Clear local storage on page load
window.onload = () => {
  localStorage.removeItem("user-entries");
};

// Function to save user form entries
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
  displayEntries(); // Call the function to display entries in the table
};

// Function to display user entries in the table
const displayEntries = () => {
  const entriesBody = document.getElementById("entries-body");
  entriesBody.innerHTML = ""; // Clear existing entries
  userEntries.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border border-gray-300 px-4 py-2">${entry.name}</td>
      <td class="border border-gray-300 px-4 py-2">${entry.email}</td>
      <td class="border border-gray-300 px-4 py-2">${entry.dob}</td>
      <td class="border border-gray-300 px-4 py-2">${
        entry.acceptedTermsAndConditions ? "Yes" : "No"
      }</td>
    `;
    entriesBody.appendChild(row);
  });
};

document.getElementById("user-form").addEventListener("submit", saveUserForm);
