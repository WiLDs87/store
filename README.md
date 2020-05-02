# store API

#### Build basically with:
* Node
* Express
* Mongoose

#### Testing with:
* Jest
* Supertest

### Styling with:
* eslint
* prettier

---

## Routes

#### (POST) /users/authenticate
  ##### body:
    username: string
    password: string

#### (DELETE) /Products/:id remove a product
#### (GET) /Products/:id return a product
####(GET) /Products return a product list
  ##### body:
    name: string (optional)
    limit: number (optional)
    skip: number (optional)
#### (POST) /Products create a product
  ##### body:
    name: string (min 3 chars)
    description: string (optional)
    price: number
#### (DELETE) /Products/:id remove a product
  ##### body:
    name: string (min 3 chars)
    description: string
    price: number


Obs: for authenticated routes, use 'x-access-token' at headers with your token

