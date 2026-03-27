## express-nosql (MongoDB) shop demo

Server-rendered Express app (EJS) with a shop flow backed by **MongoDB**: products, cart, and orders. Includes an “admin” area for creating/editing/deleting products.

### Tech stack

- **Node.js + Express**
- **MongoDB** (via the official `mongodb` driver)
- **EJS** templates + static assets in `public/`

### Project structure

- **`app.js`**: app bootstrap (middleware, routes, DB connect, server start)
- **`routes/`**: route definitions (`admin`, `shop`)
- **`controllers/`**: controller handlers
- **`models/`**: MongoDB models (`Product`, `User`)
- **`util/database.js`**: MongoDB connection helper (`mongoConnect`, `getDb`)
- **`views/`**: EJS templates (shop + admin)
- **`public/`**: CSS/JS assets


### Prerequisites

- Node.js installed
- A MongoDB database (Atlas or local)

### Setup

Install dependencies:

```bash
npm install
```

Start the app (dev):

```bash
npm start
```

Then open:

- **Shop**: `http://localhost:3000/`


To run the app successfully, make sure your database has a `users` document with that `_id`, or update the id in `app.js` to match an existing user.


```js
use <your_db_name>
db.users.insertOne({
  _id: ObjectId("69c549d76325656e336b726a"),
  name: "Demo User",
  email: "demo@example.com",
  cart: { items: [] }
})
```

### Routes (pages)

#### Shop

- **GET `/`**: shop home (product grid)
- **GET `/products`**: product list
- **GET `/products/:productId`**: product detail
- **GET `/cart`**: cart
- **POST `/cart`**: add product to cart (`productId`)
- **POST `/cart-delete-item`**: remove product from cart (`productId`)
- **POST `/create-order`**: create order from current cart
- **GET `/orders`**: order history

#### Admin

- **GET `/admin/add-product`**: add-product form
- **POST `/admin/add-product`**: create product (`title`, `imageUrl`, `price`, `description`)
- **GET `/admin/products`**: admin product list
- **GET `/admin/edit-product/:productId?edit=true`**: edit-product form
- **POST `/admin/edit-product`**: update product (includes `productId`)
- **POST `/admin/delete-product`**: delete product (`productId`)

### Data model notes

- **Products** are stored in the `products` collection. Each product includes `title`, `price`, `description`, `imageUrl`, and `userId`.
- **Users** are stored in the `users` collection. Cart lives under `user.cart.items[]` with `{ productId, quantity }`.
- **Orders** are stored in the `orders` collection. Each order stores `items` (product snapshots + quantity) and a minimal `user` object.

### Scripts

- **`npm start`**: run with `nodemon` (`app.js`)

