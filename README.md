# API Rest Task Collection

This app it's a Rest API project for the *Business Applications Course* and it's build with Express, Typescript and Prisma. It's an app to task management and if you want to try it go to this [link](https://eva3-daniela-aedo.herokuapp.com/api/v1/info).

## Prerequisites

Configure your environment variables on `.env` file:

```text
DATABASE_URL="mysql://root:root@localhost/test"
JWT_SECRET="secret"
```

Install dependencies with:

```bash
npm install
```

Push DB changes with:

```bash
npx prisma db push
```

## How to use

The app has the following endpoints:

**GET** /api/v1/info
*Returns information about the app (name and version).*

**GET** /api/v1/ping
*Returns 200 code if the app is running.*

---

**POST** /api/v1/user/login
*Returns a JWT token if the credentials are correct.*

**Example request:**

*Method*: `POST`

*Endpoint: `/api/v1/user/login`*

*Body:*
```json
{
  "email": "name@email.com",
  "password": "password"
}
```

**Example succesfully response:**

*Status: `200`*

*Body:*
```json
{
  "token": "<jwt_token>"
}
```

**POST** /api/v1/user/register
*Returns the new user if email does not exists.*

**Example request:**

*Method*: `POST`

*Endpoint: `/api/v1/user/register`*

*Body:*
```json	
{
  "firstName": "marta",
  "lastName": "rosales", 
  "email": "marta@email.com",
  "password": "password"
}
```

**Example succesfully response:**

*Status: `201`*

*Body:*
```json
{
  "id": 1,
  "firstName": "marta",
  "lastName": "rosales", 
  "email": "marta@email.com"
}
```

---

**GET** /api/v1/tasks
*Returns all tasks.* **Requires Bearer Token at Authorization Header**

**Example request:**

*Method*: `GET`

*Endpoint: `/api/v1/tasks`*

**Example succesfully response:**

*Status: `200`*

*Body:*
```json
[
  {
    "id": 1,
    "title": "trabajo en jardin",
    "content": "podar y sembrar flores",
    "done": "false",
    "userId": 1,

    "id": 1,
    "title": "hacer reporte",
    "content": "detallar actividades del mes",
    "done": "true",
    "userId": 2
  }
]
```

**GET** /api/v1/tasks/:id
*Return a task by id.* **Requires Bearer Token at Authorization Header**

**Example request:**

*Method*: `GET`

*Endpoint: `/api/v1/tasks/1`*

**Example succesfully response:**

*Status: `200`*

*Body:*
```json
{
  "id": 1,
  "title": "trabajo en jardin",
  "content": "podar y sembrar flores",
  "done": "false",
  "userId": 1
}
```

**POST** /api/v1/tasks
*Create a new task for logged user.* **Requires Bearer Token at Authorization Header**

**Example request:**

*Method*: `POST`

*Endpoint: `/api/v1/tasks`*

*Body:*
```json
{
  "title": "tejer chaleco",
  "content": "comprar la lana"
}
```

**Example successfully response:**

*Status: `201`*

*Body:*
```json
{
  "id": 2,
  "title": "tejer chaleco",
  "content": "comprar la lana",
  "done": "false",
  "userId": 2
}
```

**PUT** /api/v1/tasks/:id
*Update a task by id.* **Requires Bearer Token at Authorization Header**

**Example request:**

*Method*: `PUT`

*Endpoint: `/api/v1/tasks/1`*

*Body:*
```json
{
  "id": 1,
  "title": "trabajo en jardin",
  "content": "podar y sembrar flores",
  "done": "true"
}
```

**Example successfully response:**
*Status: `204`*

**DELETE** /api/v1/tasks/:id
*Delete a task by id.* **Requires Bearer Token at Authorization Header**

**Example request:**

*Method*: `DELETE`

*Endpoint: `/api/v1/tasks/1`*

**Example successfully response:**

*Status: `204`*
