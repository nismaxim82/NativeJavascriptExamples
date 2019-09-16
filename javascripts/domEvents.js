if (!Array.prototype.from) {
    Array.prototype.from = function (set) {
        var result = [];
        set.forEach(function (r) {
            result.push(r);
        });
        return result;
    }
}

console.log(window.location);

const eventCounts = Array.from(document.querySelectorAll('*'))
    .reduce(function (pre, dom) {
        var clks = getEventListeners(dom).click;
        pre += clks ? clks.length || 0 : 0;
        return pre;
    }, 0);

console.log(eventCounts);