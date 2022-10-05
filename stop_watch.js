let millisecond=0;
let second=0;
let minute=0;
let hour=0;
let startdate= new Date();
let enddate = new Date();
let i=0;
let interval=null;

function timer()
{
    millisecond++;
    document.getElementById("digit").innerHTML=` ${hour} : ${minute} : ${second} : ${millisecond}`;
    if(millisecond==10)
    {
        millisecond=0;
        second++;
    }
    if(second==60)
    {
        second=0;
        minute++;
    }
    if(minute==60)
    {
        hour++;
        minute=0;
    }
}
function start()
{
    if(interval)
    {
        return;
    }
    interval = setInterval(timer,100);
    // console.log("start");
}

function stop()
{
    clearInterval(interval);
    interval=null;
}

function reset()
{
    stop();
    millisecond=0;
    second=0;
    minute=0;
    hour=0;
    document.getElementById("digit").innerHTML="0 : 0 : 0 : 0";
}