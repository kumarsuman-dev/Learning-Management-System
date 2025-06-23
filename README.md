# NIT-Warangal Learning Management System (LMS)

A web-based **Learning Management System** designed for Admins and Students to manage user accounts, upload and view lectures, assign and submit assignments, and track submissions — all using pure HTML, CSS, JavaScript, and localStorage (no backend required).

---

## Key Features

### 🧑‍🎓 Student Features
- Signup and login with user role selection
- View uploaded lectures and study materials
- View assignments and submit answers
- View profile info and session status

### 👨‍🏫 Admin Features
- Login as admin
- View the complete list of users
- Add or remove students/admins
- Upload assignments and lecture content
- View submissions made by students

### 🔐 Authentication
- Signup validation (password must be 8+ characters)
- User role based redirection (Admin → `admin.html`, Student → `user.html`)
- Session management using `localStorage`

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Browser localStorage API (no server required)

---
## How to Run

1. Clone or download this repository.
2. Open `index.html` in a browser.
3. Register as student/admin using `signup.html`.
4. Use your credentials to login.
5. Use the admin dashboard to upload lectures/assignments.
6. Students can view and submit from their dashboard.

