// https://gatepassfirestore.onrender.com/hod/login/john/12345

// Define the last two path variables
const username = "john";
const password = "12345";

// Construct the API URL
const apiUrl = `https://gatepassfirestore.onrender.com/hod/login/${username}/${password}`;

// Fetch data from the API and print the response
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Print the API response
    console.log("API Response:", data);

    // Print the stored variables
    console.log("Username:", username);
    console.log("Password:", password);
    console.log(data.desc)
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
