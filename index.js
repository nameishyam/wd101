let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];

// Function to validate age
const isAgeValid = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  
  // Calculate age
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Adjust age if the birthday hasn't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age >= 18 && age <= 50; // Check if age is between 18 and 50
};

// Function to save user form entries
const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;

  const acceptedTermsAndConditions = document.getElementById("terms").checked;

  // Validate the date of birth
  if (!isAgeValid(dob)) {
    alert("You must be between 18 and 50 years old.");
    return; // Exit the function if age is invalid
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
      <td class="border border-gray-300 px-4 py-2">${entry.password}</td>
      <td class="border border-gray-300 px-4 py-2">${entry.dob}</td>
      <td class="border border-gray-300 px-4 py-2">${entry.acceptedTermsAndConditions ? "Yes" : "No"}</td>
    `;
    entriesBody.appendChild(row);
  });
};

// Display entries on page load
displayEntries();

document.getElementById("user-form").addEventListener("submit", saveUserForm);
