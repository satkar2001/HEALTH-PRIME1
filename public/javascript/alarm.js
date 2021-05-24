var alarmSound = new Audio();
        alarmSound.src = './alarm.mp3';
        var alarmTimer;

        function setAlarm(button) {
            var ms = document.getElementById('alarmTime').valueAsNumber;
            if(isNaN(ms)) {
                alert('Invalid Date');
                return;
            }

            var alarm = new Date(ms);
                        var alarmTime = new Date(alarm.getUTCFullYear(), alarm.getUTCMonth(), alarm.getUTCDate(),  alarm.getUTCHours(), alarm.getUTCMinutes(), alarm.getUTCSeconds());

                        var differenceInMs = alarmTime.getTime() - (new Date()).getTime();

                        if(differenceInMs < 0) {
                            alert('Specified time is already passed');
                            return;
                        }

                        alarmTimer = setTimeout(initAlarm, differenceInMs);
                        button.innerText = 'Cancel reminder';
                        button.setAttribute('onclick', 'cancelAlarm(this);');
                    };

                    function cancelAlarm(button) {
                        clearTimeout(alarmTimer);
                        button.innerText = 'Set remainder';
                        button.setAttribute('onclick', 'setAlarm(this);')
                    };

                    function initAlarm() {
                        alarmSound.play();
                        document.getElementById('alarmOptions').style.display = '';
                    };

                    function stopAlarm() {
                        alarmSound.pause();
                        alarmSound.currentTime = 0;
                        document.getElementById('alarmOptions').style.display = 'none';
                        cancelAlarm(document.getElementById('alarmButton'));
                    };
