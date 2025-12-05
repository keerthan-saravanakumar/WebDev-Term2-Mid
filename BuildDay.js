const startBtn = document.getElementById('startBtn');
   const timeDiv = document.getElementById('time');
const msgDiv = document.getElementById('msg');
  const beep = document.getElementById('beep');
function notify(title,body){
  if("Notification" in window){
    if(Notification.permission === "granted") {
      new Notification(title, { body });
    }else if(Notification.permission !== "denied") {
      Notification.requestPermission().then(p => {
        if(p === "granted") {
          new Notification(title, { body });
        } else{
          alert(title + "\n" + body);
      }
      });
    } else{
      alert(title + "\n" + body); }
  } else{
    alert(title + "\n" + body);
  }
}
function formatSeconds(s) {
  const mm = Math.floor(s / 60).toString().padStart(2, '0');
  const ss = (s % 60).toString().padStart(2, '0');
  return `${mm}:${ss}`;
}
startBtn.addEventListener('click', () => {
  msgDiv.textContent = "";
  let total = Number(document.getElementById('seconds').value);
  if(!total || total <= 0 || isNaN(total)) {
    msgDiv.textContent = "Please enter a valid number of seconds.";
    return;
  }
  if("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
  timeDiv.textContent = formatSeconds(total);
  const intervalId = setInterval(() => {
  total--;
    timeDiv.textContent = formatSeconds(total);
    if(total <= 0) {
      clearInterval(intervalId);
      beep.currentTime = 0;
      beep.play().catch(() => {});
      notify("Timer finished!", "Your countdown has reached 0 seconds.");
      alert("Time is up!");
      msgDiv.textContent = "Timer finished!";
    }
  }, 1000);
});
