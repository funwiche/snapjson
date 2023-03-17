# SnapJSON

This project provides various types of Restful API endpoints with JSON data to be used in developing the frontend without worrying about the backend.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install
```

Create a `.env` file and add the following variables:

```bash
DB_URL= # Database URL
ACCESS_TOKEN_SECRET= # JWT Secret
```

## Development Server

Start the development server on http://localhost:3001

```bash
# yarn
yarn dev

# npm
npm run dev
```

## Resources

SnaJSON provides various types of common resources for your frontend project:

- Users
- Products
- Orders
- Comments
- Quotes
- Todos
- Cities
- Countries
- Auth

## Example Code

Get posts

```javascript
fetch("https://snapjson.com/products")
  .then((res) => res.json())
  .then((json) => console.log(json));
```

Result

```json
{
  "items": [
    {
      "_id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "salesPrice": 477.85,
      "rating": 4.69,
      "brand": "Apple",
      "stock": 94,
      "category": "smartphones",
      "thumbnail": "https://snap-assets.vercel.app/images/products-1-thumbnail.jpg",
      "gallery": [
        "https://snap-assets.vercel.app/images/products-1-1.jpg",
        "https://snap-assets.vercel.app/images/products-1-2.jpg",
        "https://snap-assets.vercel.app/images/products-1-3.jpg",
        "https://snap-assets.vercel.app/images/products-1-4.jpg",
        "https://snap-assets.vercel.app/images/products-1-thumbnail.jpg"
      ]
    },
    { ...  },
   ],
  "total": 100,
  "limit": 12,
  "skip": 0
}
```
