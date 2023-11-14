document.addEventListener('DOMContentLoaded', function () {
  var day = document.getElementById('day');
  var month = document.getElementById('month');
  var year = document.getElementById('year');
  var errorMessages = document.querySelectorAll('.error');
  var btn = document.getElementById('btn');
  var outputYears = document.getElementById('output-year');
  var outputMonths = document.getElementById('output-month');
  var outputDays = document.getElementById('output-day');
  var labels = document.querySelectorAll('.lab label');

  btn.addEventListener('click', function (event) {
    event.preventDefault();

    // Reset label colors and borders
    labels.forEach((label) => {
      label.style.color = '';
    });

    [day, month, year].forEach((input) => {
      input.style.border = '1px solid hsl(0, 1%, 44%)';
    });

    // Hide error messages
    errorMessages.forEach((error) => {
      error.style.display = 'none';
    });

    // Check if any of the inputs is empty
    if (day.value === '' || month.value === '' || year.value === '') {
      labels.forEach((label) => {
        label.style.color = 'hsl(0, 100%, 67%)';
      });
      [day, month, year].forEach((input) => {
        input.style.border = '1px solid hsl(0, 100%, 67%)';
      });
      errorMessages.forEach((error) => {
        error.style.display = 'block';
      });
    } else {
      var inputDay = parseInt(day.value, 10);
      var inputMonth = parseInt(month.value, 10);
      var inputYear = parseInt(year.value, 10);
      var birthdate = new Date(`${inputYear}-${inputMonth}-${inputDay}`);
      var today = new Date();

      // Validate the selected month and adjust the maximum days accordingly
      var maxDaysInMonth = new Date(inputYear, inputMonth, 0).getDate();

      if (
        isNaN(inputDay) ||
        inputDay <= 0 ||
        inputDay > maxDaysInMonth ||
        isNaN(inputMonth) ||
        inputMonth <= 0 ||
        inputMonth > 12 ||
        isNaN(inputYear) ||
        inputYear <= 0 ||
        inputYear > today.getFullYear() ||
        isNaN(birthdate.getTime()) ||
        birthdate > today
      ) {
        // Highlight labels and borders in case of an error
        labels.forEach((label) => {
          label.style.color = 'hsl(0, 100%, 67%)';
        });

        [day, month, year].forEach((input) => {
          input.style.border = '1px solid hsl(0, 100%, 67%)';
        });

        // Display specific error messages
        if (isNaN(inputDay) || inputDay <= 0 || inputDay > maxDaysInMonth) {
          errorMessages[0].innerText = `Must be a valid day`;
          errorMessages[0].style.display = 'block';
        }
        if (isNaN(inputMonth) || inputMonth <= 0 || inputMonth > 12) {
          errorMessages[1].innerText = 'Must be a valid month';
          errorMessages[1].style.display = 'block';
        }
        if (
          isNaN(inputYear) ||
          inputYear <= 0 ||
          inputYear > today.getFullYear()
        ) {
          errorMessages[2].innerText = 'Must be a valid year';
          errorMessages[2].style.display = 'block';
        }
      } else {
        // Calculate and display age
        var ageInMilliseconds = today - birthdate;
        var ageDate = new Date(ageInMilliseconds);

        outputYears.textContent = ageDate.getUTCFullYear() - 1970;
        outputMonths.textContent = ageDate.getUTCMonth();
        outputDays.textContent = ageDate.getUTCDate() - 1;
      }
    }
  });
});
