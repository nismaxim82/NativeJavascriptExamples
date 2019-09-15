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

execute(getTestJson(), null, function(data) {
    console.log(data);
});
console.log('Asynchronious console log before received request result');