let data = JSON.parse(localStorage.getItem("assignments")) || [];

class lectureList {
  constructor() {}

  showLectureList() {
    display(data);

    function display(data) {
      document.querySelector(".section").innerHTML = ""; // Clear the section
      data.forEach((elem, index) => {
        let div = document.createElement("div");
        div.classList.add("lectures");

        div.innerHTML = `
          <div class="details">
            <span>${elem.title}</span>
            <button class="type">${elem.type}</button>
            <p><b>${elem.instructor}</b> scheduled <b>${elem.category || "Assignment problem's"}</b> 
              at ${elem.schedule} - ${elem.time}</p>
            ${
              elem.fileUrl
                ? `<a href="${elem.fileUrl}"  download="${elem.fileName}_assignment" class="download-link">Download Assignment</a>`
                : `<p class="no-file">No file uploaded</p>`
            }
          </div>
          <div>
            <label for="upload-${index}">Upload Your Solution:</label>
            <input type="file" id="upload-${index}" class="user-file-input" data-index="${index}" accept=".pdf,.docx,.zip" />
            ${
              elem.userFileUrl
                ? `<a href="${elem.userFileUrl}" download="User_Solution_${elem.title}" class="user-download-link"> Assignment Uploaded</a>`                
                : `<p class="no-user-file">No Assignment Uploaded</p>`
            } 
          </div>
        `;

        document.querySelector(".section").append(div);
      });

      // Add event listeners for user file uploads
      document.querySelectorAll(".user-file-input").forEach((input) => {
        input.addEventListener("change", (event) => {
          let index = event.target.getAttribute("data-index");
          handleUserFileUpload(event, index);
        });
      });
    }

    function handleUserFileUpload(event, index) {
      let fileInput = event.target;
      if (fileInput.files.length > 0) {
        let userFileUrl = URL.createObjectURL(fileInput.files[0]); // Create blob URL
        data[index].userFileUrl = userFileUrl; // Add user file to the assignment data
        localStorage.setItem("assignments", JSON.stringify(data)); // Update localStorage
        showLecture(); // Re-render the list
      }
    }
  }

  filterByTitle(value) {
    let filteredData = value === "All" ? data : data.filter((elem) => elem.title === value);
    display(filteredData);
  }

  filterByDate(value) {
    let filteredData = data.filter((elem) => elem.schedule === value);
    display(filteredData);
  }

  addAssignment(title, type, instructor, schedule, file) {
    const newAssignment = {
      title,
      type,
      instructor,
      schedule,
      time: new Date().toLocaleTimeString(),
      fileUrl: file || null, // Store the uploaded file URL
      userFileUrl: null, // Placeholder for user-uploaded file URL
    };

    data.push(newAssignment);
    localStorage.setItem("assignments", JSON.stringify(data));
    this.showLectureList();
  }
}

function showLecture() {
  let list = new lectureList();
  list.showLectureList();
}

showLecture();

function showData() {
  let emailData = JSON.parse(localStorage.getItem("currentUser"));
  let userData = JSON.parse(localStorage.getItem("currentType"));
  document.querySelector(".guest").innerHTML = `<p>${emailData} (${userData})</p>`;
}

showData();

function filterTitle() {
  let value = document.getElementById("title").value;
  let list = new lectureList();
  list.filterByTitle(value);
}

function filterDate() {
  let value = document.getElementById("schedule").value;
  let list = new lectureList();
  list.filterByDate(value);
}

function resetFilter() {
  window.location.reload();
}

function addAssignment(event) {
  event.preventDefault(); // Prevent form submission reload
  let title = document.getElementById("title").value;
  let type = document.getElementById("type").value;
  let instructor = document.getElementById("instructor").value;
  let schedule = document.getElementById("schedule").value;
  let fileInput = document.getElementById("file");

  let file = null;
  if (fileInput.files.length > 0) {
    file = URL.createObjectURL(fileInput.files[0]); // Create a blob URL for the file
  }

  let list = new lectureList();
  list.addAssignment(title, type, instructor, schedule, file);
}
