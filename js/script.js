$(function() {
    $('.nav-btn').on('click', function() {
        $(this).toggleClass('open');
    });
});

$(window).ready(function() {
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
            $("#header").addClass('glass-effect');
        } else {
            $("#header").removeClass("glass-effect");
        }
    })
})

$(document).ready(function() {
    // Gender toggle logic
    $(".gender-btn").click(function() {
        $(".gender-btn").removeClass("active");
        $(this).addClass("active");
        $("#gender").val($(this).data("gender"));
    });

    // Form submission
    $("#bmiForm").on("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve input values
        const gender = $("#gender").val();
        const age = parseInt($("#age").val());
        const weight = parseFloat($("#weight").val());
        const height = parseFloat($("#height").val()) / 100; // Convert cm to meter
        const activity = parseInt($("#activity").val());

        // Validate inputs
        if (!gender) {
            alert("Please select your gender.");
            return;
        }

        if (isNaN(age) || age <= 0 || isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0 || !activity) {
            alert("Please fill in all fields correctly.");
            return;
        }

        // Calculate BMI
        const bmi = weight / (height * height);
        let bmiCategory = "";
        if (bmi < 18.5) {
            bmiCategory = "Underweight";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            bmiCategory = "Normal weight";
        } else if (bmi >= 25 && bmi < 29.9) {
            bmiCategory = "Overweight";
        } else {
            bmiCategory = "Obesity";
        }

        // Calculate BMR (Harris-Benedict Equation)
        let bmr = 0;
        if (gender === "Male") {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height * 100) - (5.677 * age);
        } else if (gender === "Female") {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height * 100) - (4.330 * age);
        }

        // Activity factor
        const activityFactors = {
            1: 1.2, // Sedentary
            2: 1.375, // Lightly Active
            3: 1.55, // Moderately Active
            4: 1.725, // Very Active
            5: 1.9 // Extra Active
        };
        const tdee = bmr * activityFactors[activity];

        // Display results in the result div
        const resultHtml = `
            <div class="p-3">
                <p><strong>BMI:</strong> ${bmi.toFixed(2)} (${bmiCategory})</p>
                <p><strong>BMR:</strong> ${bmr.toFixed(2)} kcal/day</p>
                <p><strong>TDEE:</strong> ${tdee.toFixed(2)} kcal/day</p>
            </div>
        `;
        $("#result").html(resultHtml);
    });
});