
# ReBuy — Pre-Loved Product Marketplace

ReBuy is a full-stack web application that allows users to explore and list pre-loved products. It helps people buy and sell used products and give them a second life.

## Features

- Browse products available in the marketplace.
- Search and filter products by category.
- View individual product details.
- Create product listings with name, description, price, category, condition, location, and image.
- Manage user authentication.
- Support order-related functionality.
- Responsive and user-friendly interface.
- REST API for communication between the frontend and backend.
- MongoDB integration for storing application data.

## Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- CORS

## Project Structure

```text
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
├── package.json
└── README.md
```

## Prerequisites

Before running the project, make sure you have installed:

- [Node.js](https://nodejs.org/) (includes npm)
- MongoDB local server or a MongoDB Atlas account
- Git
- A code editor such as Visual Studio Code

## Getting Started

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/prasun-mittal/ReBuy.git
cd ReBuy
```

If the downloaded project contains another `ReBuy` folder with the `backend` and `frontend` directories, enter that folder before continuing.

### 2. Configure the Backend

Open a terminal in the project directory and run:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory.

Add the following configuration:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

For MongoDB Atlas, copy the connection string from your Atlas cluster and configure the required database access.

**Important:** Never upload your `.env` file or database credentials to GitHub.

### 3. Start the Backend Server

Inside the `backend` directory, run:

```bash
npm run dev
```

If the development script is unavailable, check `backend/package.json` for the available scripts.

When the server starts successfully, the API should be available at:

```text
http://localhost:5000
```

### 4. Configure and Run the Frontend

Open a second terminal in VS Code.

Navigate to the frontend directory from the project root:

```bash
cd frontend
npm install
npm run dev
```

Vite will display a local URL in the terminal, usually:

```text
http://localhost:5173
```

Open the displayed URL in your browser.

Keep both the backend and frontend terminals running while using the application.

## API Endpoints

The backend includes routes for authentication, products, and orders.

### Product APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Retrieve products |
| GET | `/api/products/:id` | Retrieve a product by ID |
| POST | `/api/products` | Create a product listing |

### Authentication and Order APIs

Authentication routes are defined in `authRoutes.js`, and order routes are defined in `orderRoutes.js`.

The exact endpoints and required request data depend on the implementation in those files.

## Environment Variables

Configure the following variables in `backend/.env`:

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `PORT` | Port used by the backend server |

Do not share your database connection string or other secrets publicly.

## Available Scripts

### Backend

Common scripts may include:

- `npm run dev` — start the development server.
- `npm start` — start the server normally.

Check `backend/package.json` to confirm the scripts available in your version.

### Frontend

Common Vite scripts include:

- `npm run dev` — start the development server.
- `npm run build` — create a production build.
- `npm run preview` — preview the production build.

Check `frontend/package.json` for the available scripts.

## Troubleshooting

### MongoDB Connection Error

- Verify that `MONGO_URI` is correct.
- Make sure your MongoDB server or Atlas cluster is accessible.
- Check your Atlas network access and database user permissions.

### Frontend Cannot Connect to Backend

- Make sure the backend is running.
- Verify the API URL configured in the frontend.
- Check the browser console and backend terminal for errors.

### Missing Dependencies

Run `npm install` inside the relevant `backend` or `frontend` directory.

You normally do not need to run `npm install` every time you start the project.

### Port Already in Use

Stop the process using the port or configure another available port. Update the frontend API configuration if necessary.

## Contributing

Contributions are welcome!

1. Fork or clone the repository.
2. Create a separate branch for your changes.
3. Implement and test your changes.
4. Commit your changes with a descriptive message.
5. Push your branch to GitHub.
6. Open a pull request for review.

Example:

```bash
git switch -c feature/your-feature
git add .
git commit -m "Describe your changes"
git push -u origin feature/your-feature
```

## License

No project-specific license has been specified yet.

---

**ReBuy — Give pre-loved products a second life.**
