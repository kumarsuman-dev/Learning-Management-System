    document.addEventListener("DOMContentLoaded", () => {
      const assignmentList = document.getElementById("assignmentList");
      const totalStudentsEl = document.getElementById("totalStudents");
      const submittedStudentsEl = document.getElementById("submittedStudents");

      // Fetch assignment data and student details from localStorage
      const data = JSON.parse(localStorage.getItem("assignments")) || [];
      const students = JSON.parse(localStorage.getItem("students")) || []; // Assuming `students` is an array of all students

      function renderStats() {
        const totalStudents = students.length; // Total students
        const submittedStudents = data.filter((assignment) => assignment.userFileUrl).length; // Count of submissions

        totalStudentsEl.textContent = '5';
        submittedStudentsEl.textContent = submittedStudents;
      }

      function renderAssignments() {
        assignmentList.innerHTML = ""; // Clear the list

        data.forEach((assignment, index) => {
          const assignmentDiv = document.createElement("div");
          assignmentDiv.classList.add("assignment");

          const detailsDiv = document.createElement("div");
          detailsDiv.classList.add("details");
          detailsDiv.innerHTML = `
        <p><strong>Title:</strong> ${assignment.title}</p>
        <p><strong>Instructor:</strong> ${assignment.instructor}</p>
        <p><strong>Schedule:</strong> ${assignment.schedule}</p>
        <p><strong>User:</strong> ${assignment.userEmail
              ? `${assignment.userEmail}`
              : "No student submitted"
            }</p>
        <p><strong>User Upload:</strong> ${assignment.userFileUrl
              ? `<a href="${assignment.userFileUrl}" download="User_Solution_${assignment.title}">Download File</a>`
              : "No file uploaded"
            }</p>
      `;

          const actionButtonsDiv = document.createElement("div");
          actionButtonsDiv.classList.add("action-buttons");

          const uploadStatusButton = document.createElement("button");
          uploadStatusButton.classList.add("btn", "btn-success");
          uploadStatusButton.textContent = assignment.userFileUrl
            ? "Uploaded Successfully"
            : "No Upload Yet";
          uploadStatusButton.disabled = !assignment.userFileUrl;

          const checkSolutionButton = document.createElement("button");
          checkSolutionButton.classList.add("btn", "btn-primary");
          checkSolutionButton.textContent = "Check Solution";
          checkSolutionButton.disabled = !assignment.userFileUrl;

          // Add click event to check solution
          checkSolutionButton.addEventListener("click", () => {
            if (assignment.userFileUrl) {
              window.open(assignment.userFileUrl, "_blank"); // Open file in a new tab
            } else {
              alert("No solution uploaded for this assignment.");
            }
          });

          actionButtonsDiv.appendChild(uploadStatusButton);
          actionButtonsDiv.appendChild(checkSolutionButton);

          assignmentDiv.appendChild(detailsDiv);
          assignmentDiv.appendChild(actionButtonsDiv);

          assignmentList.appendChild(assignmentDiv);
        });
      }

      renderStats();
      renderAssignments();
    });


    function showData() {
      let emailData = JSON.parse(localStorage.getItem("currentUser"));
      let userData = JSON.parse(localStorage.getItem("currentType"));
      document.querySelector(".guest").innerHTML = `
    <p>${emailData} (${userData})</p>
  `;
    }
    showData();