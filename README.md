URL Shortener Microservice
A robust URL Shortener backend service built using Node.js and Express, providing core URL shortening functionality along with basic analytics for shortened links.

🚀 Features
✅ Create short URLs with custom shortcode option

✅ Auto-generated shortcode if none is provided

✅ Default link validity: 30 minutes (can be customized)

✅ Redirection to the original URL using short link

✅ Click tracking with timestamp, source, and location

✅ Detailed statistics for each shortened URL

✅ Custom logging middleware (logs every API request)

✅ In-memory database (can be extended to MongoDB or SQL)

🛠️ Tech Stack
Node.js - JavaScript runtime environment

Express.js - Web framework

Nanoid - Unique shortcode generator

Day.js - Date and time handling

📂 Project Structure
pgsql
Copy
Edit
url-shortener/
│── controllers/
│    └── urlController.js
│── middleware/
│    └── logger.js
│── routes/
│    └── urlRoutes.js
│── server.js
│── README.md
│── package.json
⚙️ Installation & Setup
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
Install dependencies

bash
Copy
Edit
npm install
Start the server

bash
Copy
Edit
node server.js
Server will run at: http://localhost:5000

📌 API Endpoints
1️⃣ Create a Short URL
POST /shorturls

Body (JSON):

json
Copy
Edit
{
  "url": "https://example.com/long-url",
  "validity": 30,
  "shortcode": "abcd1"
}
Response:

json
Copy
Edit
{
  "shortLink": "http://localhost:5000/abcd1",
  "expiry": "2025-07-29T12:30:00Z"
}
2️⃣ Redirect to Original URL
GET /:code

Example: http://localhost:5000/abcd1 → Redirects to original URL

3️⃣ Get Short URL Statistics
GET /shorturls/:code

Response:

json
Copy
Edit
{
  "originalUrl": "https://example.com/long-url",
  "createdAt": "2025-07-29T12:00:00Z",
  "expiry": "2025-07-29T12:30:00Z",
  "totalClicks": 2,
  "clickDetails": [
    {
      "timestamp": "2025-07-29T12:10:00Z",
      "source": "direct",
      "location": "::1"
    }
  ]
}
✅ Future Improvements
Persistent database support (MongoDB, PostgreSQL)

User authentication and personal dashboards

Rate limiting and analytics dashboard

Expired link cleanup automation

📜 License
This project is licensed under the MIT License.

