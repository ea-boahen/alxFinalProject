function formatDateToArrayWithDay(date) {
  // Ensure that the input is a Date object
  if (!(date instanceof Date)) {
    throw new Error('Invalid input. Please provide a valid Date object.');
  }

  // Define arrays of weekday and month names
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Get the components of the date
  const year = date.getFullYear();
  const month = date.getMonth(); // Months are zero-based
  const day = date.getDate();
  
  // Get the day of the week and month in words
  const dayOfWeek = weekdays[date.getDay()];
  const monthInWords = months[month];

  // Create an array with the date components
  const dateArray = [year, monthInWords, day, dayOfWeek];

  return dateArray;
}

function convertUnixTimestampToDateTime(timestamp) {
  return new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
}

function submitForm() {
  // Get values from the form
  var firstname = $('#firstname').val();
  var lastname = $('#lastname').val();
  var contact = $('#contact').val();
  var email = $('#email').val();

  // Construct JSON data
  var jsonData = {
      "firstname": firstname,
      "lastname": lastname,
      "contact": contact,
      "email": email,
      "long": longitude,
      "lat": latitude
  };

  // Perform AJAX POST request
  $.ajax({
      type: "POST",
      url: "https://www.bcodesolutions.tech:5000/api/v1/persons",
      contentType: "application/json",
      data: JSON.stringify(jsonData),
      success: function(response) {
          console.log("Success:", response);
          // Handle success response as needed
      },
      error: function(error) {
          console.error("Error:", error);
          // Handle error as needed
      }
  });
}
