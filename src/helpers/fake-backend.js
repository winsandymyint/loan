import storage from './storage'
export function configureFakeBackend() {
    let dummyUsers = [
      {
        id: 1,
        email:'admin@gmail.com',
        name: 'test',
        password: 'test',
        role: 'admin'
      }
      ];
    let users = storage.get('users') ? JSON.parse(storage.get('users')) : dummyUsers
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.email === params.email && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            email: user.email,
                            name: user.username,
                            token: 'fake-jwt-token',
                            role: user.role
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Email or password is incorrect');
                    }

                    return;
                }

                // register
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.email === params.email;
                    });

                    if (!filteredUsers.length) {
                        // check loan
                        let responseJson = {
                            id: users[users.length - 1].id + 1,
                            email: params.email,
                            name: params.name,
                            loanType: params.loanType,
                            amount: params.amount,
                            password: params.password,
                            status: 'pending',
                            role: 'candidate',
                            token: 'fake-jwt-token'
                        };
                        users.push(responseJson)
                        localStorage.setItem('users', JSON.stringify(users));
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) });
                    } else {
                        // else return error
                        reject('Email or password is incorrect');
                    }

                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}
