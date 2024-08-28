// initialisations
const alarm = document.getElementById('alarm');
const alarmsList = document.getElementById('alarms-list');
const Setalarm=document.getElementById('set-alarm');
let alarms=[];

// to get current time
function updateClock() {
    const now = new Date();
    const hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

    const crntTime = 
        `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${ampm}`;
    alarm.textContent = crntTime;

    checkAlarms(crntTime);
}
setInterval(updateClock,1000);

// to check alarm is ready to tick....
function checkAlarms(currentTime) {
    alarms.forEach((alarm, i) => {
        if (alarm === currentTime) {
            alert('Alarm is ringing!');
            renderAlarmsList();
        }
    });
}

// setting alarm 
function setAlarm() {
    const hour = document.getElementById('hour').value;
    const minute = document.getElementById('min').value;
    const second = document.getElementById('sec').value;
    const period = document.getElementById('period').value;


    if (hour < 1 || hour > 12 || minute < 0 || minute > 59 || second < 0 || second > 59) {
        alert('Please enter a valid time.\nHours: 1-12\nMinutes: 0-59\nSeconds: 0-59');
        return;
    }


    const alarmTime =  `${hour.padStart(2,'0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')} ${period}`;

    alarms.push(alarmTime);
    renderAlarmsList();
    hour="";
    minute="";
    second="";
    period="AM";
}

// Alarm Lists
function renderAlarmsList() {
    alarmsList.innerHTML = '';
    alarms.forEach((alarm, i) => {
        const li = document.createElement('li');
        li.textContent = alarm;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.addEventListener('click', () => {
            alarms.splice(i, 1);
            renderAlarmsList();
        });

        li.appendChild(deleteBtn);
        alarmsList.appendChild(li);
    });
}

Setalarm.addEventListener('click', setAlarm);


