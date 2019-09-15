// вспомогательная функция-чернорабочий
// для выполнения промисов из generator
function* execute(generator, yieldValue, callback) {
    var next = generator.next(yieldValue);
    if (!next.done) {
        next.value.then(
            function (result) { execute(generator, result, callback); },
            function (err) { generator.throw(err); }
        );
    } else {
        // обработаем результат return из генератора
        if (callback) {
            callback(next.value);
        }
    }
}

function* getTestJson() {
    var url = 'https://nismaxim82.github.io/NativeJavascriptExamples/test.json';
    const response = yield fetch(url);
    const responseBody = yield response.json();
    return responseBody;
};

execute(getTestJson(), null, (data) => {
    console.log(data);
});
console.log('Asynchronious console log before received request result');