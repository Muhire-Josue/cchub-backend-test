# cchub-backend-test
Technical assessment for a CCHub backend developer role.

### API Link

##### Localhost: http://localhost:3000
##### Documentation: https://documenter.getpostman.com/view/3997258/UzBju8a2

### Requirements

- `Nodejs v10 or later versions` - a JavaScript run-time environment that executes JavaScript code outside of a browser
- `POSTGRES` - a database management system for data persistence
- `IDE` - Also known as code editor, applications that allows developers to write code

### SETUP

First clone the project on your machine:

```
git clone git@github.com:Muhire-Josue/cchub-backend-test.git
```

Install all necessary node packages

```
npm install
```

Add variable environment

```
Create .env file in the root folder of the project, reference in .env.example for the variable environment needed to run and test the project.
```

To start the app

```
npm run dev
```

To run tests

```
npm test
```

Open it using your favorite IDE,
like ([vs code](https://code.visualstudio.com/download)) to view the codebase.

### API ENDPOINTS

| API                           | Methods | Description             |
| ----------------------------- | ------- | ----------------------- |
| `/`                           | GET     | Welcome message         |
| `api/v1/assets/`             | POST    | Create an asset          |
| `api/v1/assets/:id`              | GET    | Get an asset by id      |
| `api/v1/assets/:id`                    | PUT    | Update asset score             |
| `api/v1//assets/score/average?type=video&score_type=score_type_2`        | GET     | Get score type average  |


### How can it be manually tested

- using [postman](https://www.getpostman.com/downloads/)

### Other technologies used

- `NPM OR YARN` - a package manager for the JavaScript programming language
- `Git` - version-control system for tracking changes in source code during software development

### Unit tests screenshot
![Screen Shot 2022-06-17 at 1 22 43 PM](https://user-images.githubusercontent.com/37122177/174296588-bdbf6599-4c9a-408d-aec5-dde06a8d961b.png)


