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