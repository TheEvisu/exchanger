const baseUrl = 'http://data.fixer.io/api/latest?access_key=25ab1bb1b5af85de3a0e1b8e0ef0a17e';

const from = document.getElementById('theFirst');
const to = document.getElementById('theSecond');
const button = document.getElementById('convert');
const money = document.getElementById('money');
const toValue = document.getElementById('toValue');

let exchanger = '';
let theFirst = '';
let theSecond = '';
//currency pair creation
fetch(`${baseUrl}`)
    .then(response => response.json())
    .then(data => {
        const exchanger = data.rates;
//first currency
        for (let list of Object.keys(exchanger)) {
            const first = document.getElementById('theFirst');
            const option = document.createElement('option');
            option.setAttribute('value', list);
            option.appendChild(document.createTextNode(list));
            first.appendChild(option);
        }
//second currency
        for (let list of Object.keys(exchanger)) {
            const second = document.getElementById('theSecond');
            const option = document.createElement('option');
            option.setAttribute('value', list);
            option.appendChild(document.createTextNode(list));
            second.appendChild(option);
        }
    })


button.onclick = () => {
    fetch(`${baseUrl}`)
        .then(response => response.json())
        .then(data => {
            const res = document.createElement('h2');
            exchanger = data.rates;
            for (let value in exchanger
                ) {
                if (value === from.value) {
                    theFirst = exchanger[value];
                }
            }
            for (let value in exchanger
                ) {
                if (value === to.value) {
                    theSecond = exchanger[value];
                }
            }

            const total = (money.value / theFirst) * theSecond;

            if (total) {
                res.appendChild(document.createTextNode(`${total.toFixed(2)} ${to.value}`));
            } else {
                res.appendChild(document.createTextNode('Oops ... where is the meaning?'));
            }

            if (toValue.firstElementChild) {
                toValue.firstElementChild.remove();
            }
            toValue.appendChild(res);

        })
        .catch(e => console.log(e));
}

