# 🎒 Campus Lost & Found Platform

An AI-Ready Full-Stack Campus Lost & Found Management System built using **Node.js, Express.js, SQLite, EJS, Bootstrap, and JavaScript**. The platform helps students and faculty report lost or found items, intelligently match items, submit ownership claims, communicate securely, and manage the entire recovery process through an admin dashboard.

---

## 📌 Project Overview

Campus Lost & Found Platform digitizes the traditional lost-and-found process by providing a centralized system where users can:

- Report lost items
- Report found items
- Upload item images
- Search reported items
- View intelligent match suggestions
- Submit ownership claims
- Manage profiles
- Receive notifications (ready for integration)
- Enable administrators to monitor and manage the entire system

The project is designed to be **AI-ready**, allowing future integration with Generative AI services like **Google Gemini** for intelligent item matching and image analysis.

---

# 🚀 Features

## 👤 User Module

- User Registration
- Secure Login
- Session Authentication
- User Profile Management
- Logout

---

## 🎒 Lost Item Management

- Report Lost Item
- Upload Item Image
- Edit Lost Item
- Delete Lost Item
- View Item Details
- Search Lost Items
- AI Ready Match Suggestions

---

## 📦 Found Item Management

- Report Found Item
- Upload Item Image
- Edit Found Item
- Delete Found Item
- View Item Details
- Search Found Items

---

## 🤝 Smart Matching System

The application automatically compares:

- Category
- Location
- Item Name

and generates a **Match Score (%)** for every possible found item.

Future versions will use AI-powered semantic matching.

---

## 📨 Claim Management

Users can:

- Request ownership
- Provide proof
- Contact finder
- Track claim status

Administrators can:

- Approve claims
- Reject claims

---

## 👨‍💼 Admin Module

- Admin Dashboard
- User Management
- Delete Users
- Change User Roles
- View Statistics
- Monitor Claims

---

## 📊 Analytics Dashboard

Interactive dashboard displaying:

- Total Users
- Total Lost Items
- Total Found Items
- Total Claims

Powered using **Chart.js**

---

## 🔍 Search System

Search items using:

- Item Name
- Category
- Location

---

## 🖼 Image Upload

Supports uploading images while reporting lost items.

Images are stored inside:

```
public/uploads/
```

---

## 📱 Responsive UI

Built using

- Bootstrap 5
- Bootstrap Icons
- Custom CSS

Supports:

- Desktop
- Laptop
- Tablet
- Mobile

---

# 🛠 Technology Stack

## Frontend

- HTML5
- CSS3
- Bootstrap 5
- Bootstrap Icons
- JavaScript
- EJS

---

## Backend

- Node.js
- Express.js

---

## Database

- SQLite

---

## Authentication

- Express Session
- bcrypt.js

---

## File Upload

- Multer

---

## Charts

- Chart.js

---

## Email (Ready)

- Nodemailer

---

## Future AI Integration

- Google Gemini API
- AI Image Matching
- AI Chatbot
- AI Smart Recommendations

---

# 📂 Project Structure

```
Campus-Lost-Found/
│
├── config/
│   └── database.js
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── views/
│   ├── partials/
│   ├── dashboard.ejs
│   ├── lostItems.ejs
│   ├── foundItems.ejs
│   └── ...
│
├── public/
│   ├── css/
│   ├── uploads/
│   └── images/
│
├── database/
│   ├── schema.sql
│   └── lost_found.db
│
├── app.js
├── server.js
├── package.json
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/Campus-Lost-Found.git
```

---

## Navigate

```bash
cd Campus-Lost-Found
```

---

## Install Packages

```bash
npm install
```

---

## Create .env

```env
PORT=3000

SESSION_SECRET=campus_lost_found_secret

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_app_password
```

---

## Start Server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

Open

```
http://localhost:3000
```

---

# 👥 User Roles

## Student/User

- Register
- Login
- Report Lost Item
- Report Found Item
- Search Items
- Submit Claim
- Update Profile

---

## Admin

- Dashboard
- Manage Users
- Approve Claims
- Reject Claims
- Monitor Statistics

---

# 🔐 Security Features

- Password Hashing (bcrypt)
- Session Authentication
- Role-Based Authorization
- Protected Routes
- File Upload Validation

---

# 📈 Future Enhancements

- 🤖 Google Gemini AI Integration
- AI Image Similarity Matching
- AI Chat Assistant
- Voice Search
- QR Code Verification
- Email Notifications
- Push Notifications
- Real-Time Chat using Socket.IO
- Dark Mode
- Docker Support
- CI/CD using GitHub Actions
- Cloud Deployment
- Progressive Web App (PWA)

---

# 🧪 Testing

The application has been manually tested for:

- User Registration
- Login
- Lost Item Reporting
- Found Item Reporting
- Search
- Claim Submission
- Admin Approval
- Image Upload
- Session Authentication

---

# 📄 License

This project is developed for educational purposes.

---

# 👨‍💻 Developer

**Mohammad Saif**

B.Tech Computer Science & Engineering

Vardhaman College of Engineering

---

# ⭐ If you like this project

Please consider giving this repository a **Star ⭐** on GitHub.