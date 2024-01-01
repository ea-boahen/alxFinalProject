let longitude
let latitude 

if ("geolocation" in navigator) {
	// Geolocation is available
	(async function() {
        try {
			const position = await new Promise((resolve, reject) => {
		        navigator.geolocation.getCurrentPosition(resolve, reject);
			});		  
		// The user's location is available in the 'position' object
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
        } catch (error) {
        // Handle errors here, such as when the user denies permission
        console.error("Error getting location: " + error.message);
      }
    })();
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
  