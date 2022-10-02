// for the screen color
document.getElementById("main").style.backgroundColor="skyblue";
// for the title
document.getElementById("demo").style.textAlign="center";
document.getElementById("demo").style.fontSize="30px";
document.getElementById("demo").style.color="white";
document.getElementById("demo").style.backgroundColor="black";
document.getElementById("demo").style.border="1px solid black";
document.getElementById("demo").style.margin="0px";
document.getElementById("demo").style.padding="0px";
document.getElementById("demo").style.width="500px";
document.getElementById("demo").style.position="relative";
document.getElementById("demo").style.left="270px";
// document.getElementById("demo").style.top="270px";
document.getElementById("demo").innerHTML="Change Background color";
// for button
document.getElementById("button1").style.width="250px";
document.getElementById("button1").style.height="50px";
document.getElementById("button1").style.position="relative";
document.getElementById("button1").style.left="380px";
document.getElementById("button1").style.top="100px";
document.getElementById("button1").innerHTML="Change color";
document.getElementById("button1").style.fontSize="30px";
document.getElementById("button1").style.backgroundColor="grey";
var count=0;
var c=0;
function Change_color()
{
    c=Math.floor(Math.random() * 4); 
    console.log(c);
    if(c==0)
    {
        document.getElementById("main").style.backgroundColor="blue";
    }
    else if(c==1)
    {
        document.getElementById("main").style.backgroundColor="skyblue";
    }
    else if(c==2)
    {
        document.getElementById("main").style.backgroundColor="green";
    }
    else if(c==3)
    {
        document.getElementById("main").style.backgroundColor="pink";
    }
}