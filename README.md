🚀 Full-Stack Customer Management App (React + Express + Axios)

This is a full-stack web application built with React.js (frontend) and Node.js/Express.js (backend).
The app demonstrates API communication using Axios and handles authentication, form submission, and error handling.

📌 Features

✅ React.js frontend with Axios for API requests

✅ Node.js/Express.js backend with REST APIs

✅ User authentication (Signup/Login)

✅ Responsive UI with Tailwind CSS / CSS

✅ Error handling for network and server errors

✅ CORS-enabled backend for cross-origin requests

🛠️ Tech Stack

Frontend

React.js (Vite or CRA)

Axios (API communication)

Tailwind CSS / CSS

Backend

Node.js

Express.js

CORS middleware

SQLite / MongoDB / PostgreSQL (choose your DB)

⚡ Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2️⃣ Backend Setup
cd server
npm install
Start the server:
npm start


The backend will run at:
👉 http://localhost:5000

3️⃣ Frontend Setup
cd client
npm install

Start the React app:
npm start

The frontend will run at:
👉 http://localhost:3000

🔗 API Endpoints (Example)
Method	Endpoint	Description
POST	/api/signup	User Registration
POST	/api/login	User Login
GET	/api/data	Fetch User Data
🐞 Common Issues & Fixes
❌ Axios Network Error

✅ Make sure:

Backend server is running (npm start in /backend)

API base URL in frontend matches backend (http://localhost:5000)

CORS is enabled in backend:

const cors = require("cors");
app.use(cors());

Screenshots:
customer manager :
<img width="1920" height="1080" alt="Screenshot (76)" src="https://github.com/user-attachments/assets/24b03fd3-bc04-4fe4-b9c1-3ad7eadfd27d" />

Add New Customer Form:
<img width="1920" height="1080" alt="Screenshot (78)" src="https://github.com/user-attachments/assets/67a9561f-e221-4ac0-a9d1-334ca355fd47" />

Existing customer details:
<img width="1920" height="1080" alt="Screenshot (77)" src="https://github.com/user-attachments/assets/d1e07e05-be7c-4c9e-8b8e-447908de0f99" />


📂 Project Structure
customer-management-app/
├── server/
│   ├── package.json
│   ├── index.js
│   ├── db.js
│   ├── routes/
│   │   ├── customers.js
│   │   └── addresses.js
│   └── README.md
└── client/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── App.js
        ├── api.js
        ├── styles.css
        ├── pages/
        │   ├── CustomerListPage.jsx
        │   ├── CustomerDetailPage.jsx
        │   └── CustomerFormPage.jsx
        └── components/
            ├── CustomerList.jsx
            ├── CustomerForm.jsx
            ├── AddressList.jsx
            └── AddressForm.jsx

📜 License

This project is licensed under the MIT License.
Name: Challa Samatha 
E-Mail: samathachowdary2004@gmail.com





