// function that will iterate through all yields and promises
function execute(generator, yieldValue, callback) {
    var next = generator.next(yieldValue);
    if (!next.done) {
        next.value.then(
            function (result) { execute(generator, result, callback); },
            function (err) { generator.throw(err); }
        );
    } else {
        // if callback specified then process the return result to the callback
        if (callback) {
            callback(next.value);
        }
    }
}

function* getTestJson() {
    var url = 'https://nismaxim82.github.io/NativeJavascriptExamples/data/test.json';
    var response = yield fetch(url);
    var responseBody = yield response.json();
    return responseBody;
};

function* registerUser({ login, password }) {
    // for our test example it will return all our users, 
    // in the real api it will be server side check user exist in the database or other data source
    var url = 'https://nismaxim82.github.io/NativeJavascriptExamples/data/checkUserExists.json';
    var response = yield fetch(url);
    var users = yield response.json();
    // check is user with login MyTestLogin already exists
    if (users.some(function (user) {
        return user.Login === login;
    })) {
        console.error('User \'' + login + '\' already exists. Please change your login.');
        login += '2';
        execute(registerUser({login, password}));
    } else {
        // call register api, we call json result with static data for our test
        url = 'https://nismaxim82.github.io/NativeJavascriptExamples/data/registerUser.json';
        response = yield fetch(url);
        var registerResult = yield response.json();
        if (!registerResult.Success) {
            console.error(registerResult.ErrorMessage);
        } else {
            console.log('User \'' + login + '\' successfully registered');
        }
    }
}

execute(getTestJson(), null, function (data) {
    console.log(data);
});
console.log('Asynchronious console log before receive response from the \'getTestJson\' function');

// example of call linked apis
execute(registerUser({ login: 'MyTestLogin', password: '123' }));