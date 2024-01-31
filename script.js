console.log("welcome to tic tak toe")
let turnaudio = new Audio("ting.mp3")
let turn = "X"
let isgameover = false;
// function to change the turn x
const changeTurn = ()=>{
    return turn === "X"? "0": "X"
} 

// fucntion to check for a win
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');  // isse sare ke sare boxtext aa gae 
    let wins = [    // agr (0,1,2), (3,4,5), (6,7,8), (0,3,6), (1,4,7), (2,5,8), (0,4,8), (2,4,6) sb mein win hoga
        [0, 1, 2, 5, 5, 0],   // the value 5,5 are x y coordinates to translate the line and 0 for rotate
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    // it conatins all the changes that has to be done if a person wins   
    wins.forEach(e =>{
        // agr pheli row mein sare rame elements ho toh ek win condition hai but voh blank ke equal nhi hone chahaiye
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== '')){
            //iska mtlb hai boxtext ka e[0] vla element ie either X or 0 is the winner
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " WON"
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px"
            document.querySelector('.line').style.width = "20vw";
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`    // here we added back ticks ie 1 ke sath kuki single ya double comma mein voh execute nhi ho rha tha
            // above command is to make a line when you win  
        }
    })
}

// game logic
// sare boxes pe onlick logic lagana hai 
let boxes = document.getElementsByClassName("box");
// sabse phele box lia phir jis bhi box text pe click kia uske ander ka boxtext

//element acts as an iterator over all the grids using box class 
Array.from(boxes).forEach(element =>{
    //to chnage the content of the box - tabhi element lia na ki document
    let boxtext = element.querySelector('.boxtext');

    // har ek box pe event listener lagaege ki jaise hi click kre toh kuch action perform kre
    element.addEventListener('click',()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;   // jab ek box khali hoga toh usmein turn variable daelge 
            turn = changeTurn();   // ab el bar turn variable daal dia uske baad hame change krna hoga turn ko   
            turnaudio.play();
            checkWin();
            // yeah check win ho nhi rha tha work kuki turn vala fire ho rhha tha tabhi gameover vala dala
            if(!isgameover){
                // game info ko chnage krna hai  
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    })
})

// add onclick listerner to reset button  
reset.addEventListener('click', ()=>{
    // sare ke sare boxtexts ko select krne ke lie hamne neche vali command use ki
    let boxtext = document.querySelectorAll('.boxtext');
    // aur phir har ek boxtext ko empty bana hai 
    Array.from(boxtext).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    isgameover=false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.line').style.width = "0vw";
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
})