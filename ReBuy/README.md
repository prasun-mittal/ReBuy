ReBuy — Pre-Loved Product Marketplace
ReBuy is a full-stack web application for discovering and listing pre-loved products. It helps people give useful items a second life by browsing available products or adding items they want to sell.
Features
- Browse products listed in the marketplace.
- Search products by name, description, category, or location.
- Filter products by category.
- View individual product details.
- List a product with its name, description, price, category, condition, location, and image URL.
- REST API built with Express.js.
- Store product data in MongoDB using Mongoose.
- Responsive React interface styled with Tailwind CSS.
Tech Stack
Frontend
- React
- Vite
- React Router
- Axios
- Tailwind CSS
Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS
Project Structure
ReBuy/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md
Prerequisites
Install the following before running the project:
- Node.js (includes npm)
- A MongoDB database, either a local MongoDB server or a MongoDB Atlas cluster
Getting Started
1. Clone the repository
git clone https://github.com/prasun-mittal/ReBuy.git
cd ReBuy
In the current repository layout, the application folders are inside the ReBuy/ subfolder. Enter it before running the backend or frontend commands:
cd ReBuy
If you have already downloaded the project, open the folder that contains backend/ and frontend/ in your terminal.
2. Configure the backend
cd backend
npm install
Create a .env file inside the backend/ directory:
MONGO_URI=your_mongodb_connection_string
PORT=5000
Replace your_mongodb_connection_string with your MongoDB connection string. For MongoDB Atlas, use the connection URI provided by your cluster. Keep the .env file private and do not commit database credentials to GitHub.

Start the backend:
npm run dev
The API will run on http://localhost:5000 when the database connection succeeds. Visit http://localhost:5000/ to check the backend status.
3. Configure and run the frontend
Open a second terminal in the project root and run:
cd frontend
npm install
npm run dev
Vite will display a local URL in the terminal, usually http://localhost:5173. Open that URL in your browser.

Keep both the backend and frontend terminals running while using the application.
Product API
The backend currently exposes these product endpoints:
Method	Endpoint	Description
GET	/api/products	Fetch all products, newest first
POST	/api/products	Create a product listing
GET	/api/products/:id	Fetch one product by its MongoDB ID


Example product payload
{
  "name": "Study Desk",
  "description": "A pre-loved desk in good condition",
  "price": 1500,
  "category": "Furniture",
  "condition": "Good",
  "location": "Mathura",
  "imageUrl": "https://example.com/desk.jpg"
}
Allowed product condition values are Like New, Good, and Fair.
Available Scripts
Backend (backend/)
- npm run dev — start the server with Nodemon.
- npm start — start the server with Node.js.
Frontend (frontend/)
- npm run dev — start the Vite development server.
- npm run build — create a production build.
- npm run preview — preview the production build locally.
- npm run lint — run Oxlint.
Troubleshooting
- MongoDB connection failed: Check that MONGO_URI is correct and that your MongoDB server or Atlas cluster is reachable.
- Products do not load: Confirm the backend is running on port 5000 and that the frontend can reach http://localhost:5000/api/products.
- Port already in use: Stop the other process using the port or choose an available backend port. If you change the backend port, update the API URL in the frontend code as well.
- Dependencies missing: Run npm install once inside each of the backend/ and frontend/ folders. You normally do not need to reinstall dependencies every time you start the project.
Contributing
1. Create a branch for your changes.
2. Make and test your changes locally.
3. Commit your work with a clear message.
4. Push your branch and open a pull request.
License
No project-specific license is currently specified.