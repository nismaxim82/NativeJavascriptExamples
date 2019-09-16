const selector = '*';
const event = 'click';

console.log(window.location);

const getEventsBySelector = (selector = '*', event = 'click') => {
    Array.from(document.querySelectorAll(selector))
        .reduce((pre, dom) => {
            const clks = getEventListeners(dom)[event];
            pre += clks ? clks.length || 0 : 0;
            return pre;
        }, 0);
}

console.warn('Execute code below in the google dev tools to receive listed events count for your selector');
let funcText = getEventsBySelector.toString();
const excludeText = 'function getEventsBySelector(selector = \'*\', event = \'click\') {';
funcText = funcText.substring(funcText.indexOf(excludeText) + excludeText.length);
funcText = funcText.replace('selector', `'${selector}'`);
funcText = funcText.replace('event', `'${event}'`);
funcText = funcText.substring(0, funcText.length - 1);
console.log(funcText);