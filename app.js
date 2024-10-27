let gameSeq=[];
let userSeq=[];
;let start=false;
let level=0;
let h3=document.querySelector("h3");
let btns = ["yellow", "red", "purple", "green"]; // Fix "purpul" to "purple"

document.addEventListener("keypress",function()
{
    if(start==false)
    {
        console.log("Game started");
        start=true;
        levelup();
    }

})
function btnflash(btn)
{
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);

}
function userflash(btn)
{
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);

}
function levelup()
{
    level++;
    h3.innerText=`level:${level}`;
    // chosse random button
    let ranidx=Math.floor(Math.random()*4);
    let randomcol=btns[ranidx];
    let ranbtn=document.querySelector(`.${randomcol}`);
    gameSeq.push(randomcol);
    console.log(gameSeq)
    btnflash(ranbtn);
}

function checkAns() {
    let idx = userSeq.length - 1; // Compare based on user's current length
    if (userSeq[idx] === gameSeq[idx]) {
        console.log("Same value");
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000); // Proceed to next level
            userSeq = []; // Clear user sequence for next level
        }
    } else {
        h3.innerText = "Game Over! Press any key to start a new game";
        console.log("Game Over");
        
        // Display final score
        let scoreElement = document.querySelector("#score");
        if (!scoreElement) {
            scoreElement = document.createElement("h2");
            scoreElement.setAttribute("id", "score");
            h3.after(scoreElement); // Insert the score element right after <h3>
        }
        scoreElement.innerText = `Your final score: ${level * 10}`;
        
        // Reset game state
        start = false;
        level = 0;
        gameSeq = [];
        userSeq = [];
    }
}


function btnpress()
{
    console.log(this);
    let btn=this;
    userflash(btn);
    userCol=btn.getAttribute("id");   
    console.log(userCol); 
    userSeq.push(userCol);
    checkAns();


}
let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns)
{
    btn.addEventListener("click",btnpress);
}

