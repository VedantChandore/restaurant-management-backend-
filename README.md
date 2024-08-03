Here is the README file for your restaurant management backend project:

---

# Restaurant Management Backend

This project is a backend system for a restaurant management application. It provides routes for user and admin functionalities, including signup, signin, menu management, and ordering food. The backend is built using Node.js, Express, and MongoDB.

## Features

- Admin functionalities:
  - Signup
  - Signin
  - Manage menu (add items, view items)
- User functionalities:
  - Signup
  - Signin
  - View menu
  - Order food

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Zod (for data validation)
- JSON Web Token (JWT) for authentication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/VedantChandore/basic-backend-restaurant-management.git
   ```

2. Navigate to the project directory:

   ```bash
   cd basic-backend-restaurant-management
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   node index.js
   ```

## API Routes

### Admin Routes

- **Signup**:
  - URL: `/admin/signup`
  - Method: `POST`
  - Body:
    ```json
    {
      "username": "adminUsername",
      "password": "adminPassword",
      "restaurant_name": "RestaurantName"
    }
    ```

- **Signin**:
  - URL: `/admin/signin`
  - Method: `POST`
  - Body:
    ```json
    {
      "username": "adminUsername",
      "password": "adminPassword"
    }
    ```

- **Add Menu Item**:
  - URL: `/admin/menu`
  - Method: `POST`
  - Headers: `Authorization: Bearer <token>`
  - Body:
    ```json
    {
      "itemName": "ItemName",
      "itemType": "ItemType",
      "itemPrice": 100
    }
    ```

- **View Menu**:
  - URL: `/admin/menu`
  - Method: `GET`
  - Headers: `Authorization: Bearer <token>`

### User Routes

- **Signup**:
  - URL: `/user/signup`
  - Method: `POST`
  - Body:
    ```json
    {
      "username": "userUsername",
      "password": "userPassword",
      "email": "userEmail"
    }
    ```

- **Signin**:
  - URL: `/user/signin`
  - Method: `POST`
  - Body:
    ```json
    {
      "username": "userUsername",
      "password": "userPassword"
    }
    ```

- **View Menu**:
  - URL: `/user/menu`
  - Method: `GET`
  - Headers: `Authorization: Bearer <token>`

- **Order Food**:
  - URL: `/user/order`
  - Method: `POST`
  - Headers: `Authorization: Bearer <token>`
  - Body:
    ```json
    {
      "itemName": "ItemName"
    }
    ```

## Project Structure

```
├── index.js
├── db
│   └── index_db.js
├── middlewares
│   ├── admin_middleware.js
│   └── user_middleware.js
└── package.json
```

- **index.js**: Main server file where routes are defined.
- **db/index_db.js**: Database connection and schema definitions.
- **middlewares/admin_middleware.js**: Middleware for authenticating admin.
- **middlewares/user_middleware.js**: Middleware for authenticating user.
- **package.json**: Project metadata and dependencies.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.

---

