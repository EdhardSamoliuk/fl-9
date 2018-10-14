let form = document.forms.trackForm;
let latitude = form.elements[0];
let longitude = form.elements[1];
let track = form.elements[2];
let answer = document.getElementById('answer');

//Task 1
const http = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function () {
                if (xhr.status === 200 && xhr.readyState === XMLHttpRequest.DONE) {
                    let json = JSON.parse(xhr.response);
                    resolve(json);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = function (error) {
                reject(error);
            }
            xhr.send();
        })
    }
}

//Task2
track.addEventListener('click', function () {
    animation('load');
    answer.classList.remove('display');
    let url = `https://api.onwater.io/api/v1/results/${latitude.value},${longitude.value}`;
    let res = http.get(url);
    res.then(res => {
            if (res.water === true) {

                animation('water');
            } else {

                animation('land');
            }
            answer.classList.remove('display');
        })
        .catch(error => {
            answer.classList.add('display');
            console.error(error);
        })
})

function animation(event) {
    answer.className = 'answer display';
    answer.textContent = event;
    answer.classList.add(event);
}
