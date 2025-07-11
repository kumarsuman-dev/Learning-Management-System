let data = JSON.parse(localStorage.getItem("assignments")) || [];

class lectureList {
  constructor() {}

  showLectureList() {
    display(data);
    function display(data) {
      document.querySelector(".section").innerHTML = "";
      data.forEach((elem, index) => {
        let div = document.createElement("div");
        div.classList.add("lectures");
        div.innerHTML = `
          <div class="details">
            <span>${elem.title}</span>
            <button class="type">${elem.type}</button>
            <p>
              <b>${elem.instructor}</b> scheduled <b>Assignment problem's</b> at ${elem.schedule}
              - ${elem.time}
            </p>
            <p>
              <b>File:</b> <a href="${elem.fileUrl}" target="_blank">${elem.fileName}</a>
            </p>
          </div>
        `;
        let button = document.createElement("button");
        button.innerText = "Remove";
        button.setAttribute("id", "remove");
        button.addEventListener("click", () => {
          removeLecture(elem, index);
        });
        div.appendChild(button);
        document.querySelector(".section").append(div);
      });
    }
    function removeLecture(elem, index) {
      data.splice(index, 1);
      localStorage.setItem("assignments", JSON.stringify(data));
      display(data);
    }
  }

  addLectureList(title, type, instructor, schedule, fileName, fileUrl) {
    this.title = title;
    this.type = type;
    this.instructor = instructor;
    this.schedule = schedule;
    this.fileName = fileName;
    this.fileUrl = fileUrl;

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    this.time = time;

    data.push(this);
    localStorage.setItem("assignments", JSON.stringify(data));
    this.showLectureList();
  }
}

function showLecture() {
  let list = new lectureList();
  list.showLectureList();
}
showLecture();

function addLecture() {
  event.preventDefault();
  let title = document.getElementById("title").value;
  let type = document.getElementById("type").value;
  let instructor = document.getElementById("instructor").value;
  let schedule = document.getElementById("schedule").value;

  let fileInput = document.getElementById("file");
  let file = fileInput.files[0];

  if (!file) {
    alert("Please upload a file.");
    return;
  }

  let fileName = file.name;
  let fileUrl = URL.createObjectURL(file); // Create a temporary URL for the uploaded file.

  let lecture = new lectureList();
  lecture.addLectureList(title, type, instructor, schedule, fileName, fileUrl);
}

function showData() {
  let emailData = JSON.parse(localStorage.getItem("currentUser"));
  let userData = JSON.parse(localStorage.getItem("currentType"));
  document.querySelector(".guest").innerHTML = `
    <p>${emailData} (${userData})</p>
  `;
}
showData();
