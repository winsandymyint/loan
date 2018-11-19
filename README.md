### Installation/Setup instructions

To install, run either `yarn install` or `npm install`.
This should cover you, but there may be additional dependancies that you may need (add them if thats the case).

#### Running

To run the server, run the `yarn start` or `npm start` command to get started. After that you can go to `localhost:3000`

#### Testing
To test, run the `yarn test` or `npm test`

### Overview

1. This app has 2 roles. `admin` and `candidate`
Admin account => email: `admin@gmail.com`, password: `test`
Login url: `http://localhost:3000/login`

2. Candidate need to register to apply loan from register page. Once admin approve candidate's loan application, he can submit weekly loan payment.
Registration url: `http://localhost:3000/register`

Admin need to approve loan application and can check weekly payment amount
