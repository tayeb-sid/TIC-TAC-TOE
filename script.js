const board = document.getElementById("board");
const WINNING_COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cells = document.getElementsByClassName("cell");
const restart = document.getElementsByClassName("message-container")[0];
const message =document.getElementById("message");
const restartBtn =document.getElementById("restartBtn");

CurrentCellClass="Xcell";
WIN = false;

function startGame(){

    board.childNodes.forEach(child => {
        child.addEventListener("click",selectCell,{once: true})
    });
}
startGame();

function selectCell(e){
    if(board.className == "x") e.target.classList.add("Xcell");
    else e.target.classList.add("Ocell");
    checkForWin();
    showMessage(CurrentCellClass);
    switchTurns();
}
function switchTurns(){
    if(board.classList.contains("x")) {
        board.classList.replace("x","o");
        CurrentCellClass="Ocell"
    }
    else {
        board.classList.replace("o","x");
        CurrentCellClass="Xcell";
    }
    

}

function checkForWin(){
    WINNING_COMBINATIONS.forEach(combination =>{
        if(checkSameClass(board.children[combination[0]],board.children[combination[1]],board.children[combination[2]],CurrentCellClass)){
            WIN = true;
        } 
    })
    
}
//checks if the 3 cells are in the same class
function checkSameClass(elt1,elt2,elt3,cls){
    return elt1.classList.contains(cls) && elt2.classList.contains(cls) &&elt3.classList.contains(cls)
}

function checkForDraw(){
    // cells dosn't have the every method so we destructure it and make it an array by adding [... ]
    return [...cells].every(cell=>{
        return cell.classList.contains("Xcell") || cell.classList.contains("Ocell");
    })
}
function showMessage(cellClass){
    if(WIN){   
        if(cellClass == "Xcell") message.innerText = "X won !";
        else message.innerText= "O won !";
        restart.classList.remove("hide");
    }
    if(checkForDraw() && !WIN){
        message.innerText ="DRAW !"
        restart.classList.remove("hide");

    }}

//restorer tout
function resetBoard(){
    for(let i =0; i<cells.length; i++){
        cells[i].classList.remove("Xcell");
        cells[i].classList.remove("Ocell");
        cells[i].removeEventListener("click",selectCell);
    }
    WIN = false;

}
restart.addEventListener("click",()=>{
    restart.classList.add("hide");
    resetBoard();
    //recommencer 
    startGame();
})