
window.addEventListener("DOMContentLoaded", () => {
  let scrollPos = 0;
  const mainNav = document.getElementById("mainNav");
  const headerHeight = mainNav.clientHeight;
  window.addEventListener("scroll", function () {
    const currentTop = document.body.getBoundingClientRect().top * -1;
    if (currentTop < scrollPos) {
      // Scroll Up
      if (currentTop > 0 && mainNav.classList.contains("is-fixed")) {
        mainNav.classList.add("is-visible");
      } else {
        console.log(123);
        mainNav.classList.remove("is-visible", "is-fixed");
      }
    } else {
      // Scroll Down
      mainNav.classList.remove(["is-visible"]);
      if (
        currentTop > headerHeight &&
        !mainNav.classList.contains("is-fixed")
      ) {
        mainNav.classList.add("is-fixed");
      }
    }
    scrollPos = currentTop;
  });


  $("#g2test-booking").submit((event) => {
    const yearRegex = /^\d{4}$/;
    const numericRegex = /^\d*$/;
    const nameRegex = /^[A-Za-z]+$/;
    const alphaNumRegex = /^[A-Za-z0-9]{8}$/;
    const carPlateRegex = /^[A-Za-z0-9]{6,8}/;
    let isValid = true;

    const fname = $.trim($("#fname").val());
    const lname = $.trim($("#lname").val());
    const license = $.trim($("#license").val());
    const age = parseInt($.trim($("#age").val()));
    const dob = $.trim($("#dob").val());
    const carMake = $.trim($("#carMake").val());
    const carModel = $.trim($("#carModel").val());
    const carYear = parseInt($.trim($("#carYear").val()));
    const carPlateNumber = $.trim($("#carPlateNumber").val());

    // check if First name is empty or not Check if it contain only letters
    if (fname === "") {
      $("#fnameError").text("Please enter your first name");
      isValid = false;
    } else if (!nameRegex.test(fname)) {
      $("#fnameError").text("Letters only");
      isValid = false;
    } else {
      isValid = true;
      $("#fnameError").text("");
    }

        // check if First name is empty or not Check if it contain only letters

    if (lname === "") {
      $("#lnameError").text("Please enter your last name");
      isValid = false;
    } else if (!nameRegex.test(lname)) {
      $("#lnameError").text("Letters only");
      isValid = false;
    } else {
      isValid = true;
      $("#lnameError").text("");
    }

    // check if license is empty or not
    // Check that license should be alphanumeric and length should be only 8 character
    if (license === "") {
      $("#licenseError").text("Please enter your license number");
      isValid = false;
    } else if (!alphaNumRegex.test(license)) {
      $("#licenseError").text("Maximum 8 Alphanumeric allowed");
      isValid = false;
    } else {
      isValid = true;
      $("#licenseError").text("");
    }

    // check if age is empty or not
    // Check that age should be only integer
    if (isNaN(age)) {
      $("#ageError").text("Please enter your age");
      isValid = false;
    } else if (!numericRegex.test(age)) {
      $("#ageError").text("Only number allowed");
      isValid = false;
    } else {
      isValid = true;
      $("#ageError").text("");
    }

    // check if dob is empty or not
    if (dob === "") {
      $("#dobError").text("Please enter your DOB");
      isValid = false;
    } else {
      isValid = true;
      $("#dobError").text("");
    }

    // Check if car make is empty or not
    if (carMake === "") {
      $("#carMakeError").text("Please enter your car make");
      isValid = false;
    } else {
      isValid = true;
      $("#carMakeError").text("");
    }

    // Check if car model is empty or not
    if (carModel === "") {
      $("#carModelError").text("Please enter your car model");
      isValid = false;
    } else {
      isValid = true;
      $("#carModelError").text("");
    }

    // Check if car year is empty or not
    if (isNaN(carYear)) {
      $("#carYearError").text("Please enter year");
      isValid = false;
    } else if (!yearRegex.test(carYear)) {
      $("#carYearError").text("Only number allowed and YYYY format");
      isValid = false;
    } else {
      isValid = true;
      $("#carYearError").text("");
    }

    // check if number plate is empty or not
    // Check that car plate number should be only alphanumeric
    if (carPlateNumber === "") {
      $("#carPlateNumberError").text("Please enter your car number plate");
      isValid = false;
    } else if (!carPlateRegex.test(carPlateNumber)) {
      $("#carPlateNumberError").text("Maximum 8 characters allowed");
      isValid = false;
    } else {
      isValid = true;
      $("#carPlateNumberError").text("");
    }

    if (!isValid) {
      event.preventDefault();
    }
  });

  // Functionality added for form validation - G test page
  $("#gTest-booking").submit((event) => {
    // Regex for validation
    const alphaNumRegex = /^[A-Za-z0-9]{8}/;
    let isValid = true;

    // store value in const variable
    const license = $.trim($("#license").val());

    // Check that license is empty or not and should be alphanumeric and length should be only 8 character
    if (license === "") {
      $("#licenseError").text("Please enter your license number");
      isValid = false;
    } else if (!alphaNumRegex.test(license)) {
      $("#licenseError").text("Maximum 8 Alphanumeric allowed");
      isValid = false;
    } else {
      isValid = true;
      $("#licenseError").text("");
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
});

async function postRequest(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer", 
    body: JSON.stringify(data), 
  });
  return response.json();
}
