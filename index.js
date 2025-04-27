const questions = [
    {ques: "2+2", ansarr:[2,3,4,5], corrans:4},
    {ques: "9*2", ansarr:[2,18,4,5], corrans:18},
    {ques: "5-2", ansarr:[2,3,4,5], corrans:3},
    {ques: "20/2", ansarr:[2,3,4,10], corrans:10},
    {ques: "70-64", ansarr:[2,6,4,10], corrans:6},
];

const containerdiv = document.getElementById('container');
const queslistdiv = document.getElementById('queslist');
const scorediv = document.getElementById('score');
const timerdiv = document.getElementById('timer');

let score = 0;
let duration = 300;
let interval;
timerdiv.innerHTML = timer();

function loadques() {
    questions.forEach((item, value) => {
        const quesdiv = document.createElement("div");
        quesdiv.classList.add('ques');
        quesdiv.innerHTML = `<p>${value+1}. ${item.ques} ?</p>
                    <label for="q${value+1}">
                        <input type="radio" name="q${value+1}" id="${item.ansarr[0]}">${item.ansarr[0]}
                    </label>
                    <label for="q${value+1}">
                        <input type="radio" name="q${value+1}" id="${item.ansarr[1]}">${item.ansarr[1]}
                    </label>
                    <label for="q${value+1}">
                        <input type="radio" name="q${value+1}" id="${item.ansarr[2]}">${item.ansarr[2]}
                    </label>
                    <label for="q${value+1}">
                        <input type="radio" name="q${value+1}" id="${item.ansarr[3]}">${item.ansarr[3]}
                    </label>`;
        queslistdiv.insertAdjacentElement('beforeend', quesdiv);
    
    });

    //submitbtn
    const submitbtn = document.createElement('button');
    submitbtn.id = 'submitbtn';
    submitbtn.innerText = 'Submit';
    queslistdiv.insertAdjacentElement('beforeend', submitbtn);

    submitbtn.addEventListener('click', ()=>{
        popup();
    })
}

function submitfunc() {
    questions.forEach((item, value) => {
        const list = document.getElementsByName(`q${value+1}`);

        for (let i = 0; i < list.length; i++) {            
            if (list[i].checked) {
                if (list[i].id == questions[value].corrans) {
                    score++;
                } 
            } else{
                list[i].disabled = true;
            }

            if (list[i].id == questions[value].corrans) {
                document.getElementsByName(`q${value+1}`)[i].parentElement.style.color = 'greenyellow';
            } 

            // if (!list[i].checked) {
            //     list[i].disabled = true;
            // }
        }         
    });

    console.log('Score:', score);
    scorediv.style.visibility = 'visible';
    scorediv.textContent = `${score}/${questions.length}`;

    const submitbtn = document.getElementById('submitbtn');
    if (submitbtn) {
        submitbtn.disabled = true;
    }
    // const allRadioButtons = document.querySelectorAll('input[type="radio"]');
    // allRadioButtons.forEach(button => {
    //     button.disabled = true;
    // });
}

function timer() {
    let min = Math.floor(duration/60);
    let sec = duration%60;
    duration--;

    (min == 0 && sec == 0) ? clearInterval(interval) : null;
    (min < 10) ? min = `0${min}` : null;
    (sec < 10) ? sec = `0${sec}` : null;
    (min == 0 && sec == 0) ? submitfunc(): null;

    timerdiv.innerHTML = `<h2 style="margin: 0;">${min}:${sec}</h2>`; 
    return `<h2 style="margin: 0;">${min}:${sec}</h2>`;
}

function countdown() {
    interval = setInterval(timer, 1000);  
}

function popup() {
    const backdrop = document.createElement('div');
    backdrop.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:99;";

    const modal = document.createElement('div');
    modal.style = "background:white; width:300px; margin:20px;border-radius:10px; padding:10px; place-items:center; position: fixed; top: 30%; background-color: white; z-index:100;";
    modal.id = 'delmodal';
    modal.innerHTML = `<h2>Confirmation</h2><p>Are you sure you want to submit?</p>`;

    const delyes = document.createElement('button');
    const delno = document.createElement('button');
    delyes.innerText = 'Yes';
    delno.innerText = 'No';
    delyes.style = 'margin: 0 10px;';
    delno.style = 'margin: 0 10px;';

    modal.appendChild(delyes);
    modal.appendChild(delno);
    containerdiv.insertAdjacentElement('beforeend', modal);
    document.body.insertAdjacentElement('afterBegin', backdrop);

    delyes.addEventListener('click', ()=>{
        submitfunc();
        clearInterval(interval);
        modal.remove();
        backdrop.remove();
    })
    delno.addEventListener('click', ()=>{
        modal.remove();
        backdrop.remove();
    })
}