// Increment
var c=0;
function Decrement()
{
    c--;
    document.getElementById("digit").innerHTML=c;
}
function Increment()
{
    c++;
    document.getElementById("digit").innerHTML=c;
}
function Reset()
{
    c=0;
    document.getElementById("digit").innerHTML=c;
    console.log("button is pressed");
}