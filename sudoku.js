var arr=[[],[],[],[],[],[],[],[],[]]
for(var i=0;i<9;i++){
    for(var j=0;j<9;j++){
        arr[i][j]=document.getElementById(i*9+j);
    }
}
var board=[[],[],[],[],[],[],[],[],[]]
function FillBoard(board){
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
            if(board[i][j]!=0){
                arr[i][j].innerText=board[i][j]
            }else{
                arr[i][j].innerText=''
            }
        }
    }
}
let GetPuzzle=document.getElementById('GetPuzzle')
let SolvePuzzle=document.getElementById('SolvePuzzle')
GetPuzzle.onclick=function(){
    var xhrRequest=new XMLHttpRequest()
    xhrRequest.onload=function(){
        var response=JSON.parse(xhrRequest.response)
        console.log(response)
        board=response.board
        FillBoard(board)
    }
    xhrRequest.open("get","https://sugoku.onrender.com/board?difficulty=easy")
    xhrRequest.send()
}
SolvePuzzle.onclick=()=>{
    sudokuSolver(board,0,0,9);
};
function sudokuSolver(board,row,col,n){
    if(row==n){
        FillBoard(board)
        return true;
    }
    if(col==n){
        return sudokuSolver(board,row+1,0,n);
    }
    if(board[row][col]!=0){
        return sudokuSolver(board,row,col+1,n);
    }
    for(let digit=1;digit<=9;digit++){
        if(isSafe(board,row,col,digit,n)){
            board[row][col]=digit;
            let subAns=sudokuSolver(board,row,col+1,n);
            if(subAns){
                return true;
            }
            board[row][col]=0;
        }
    }
    return false;
}
function isSafe(board,row,col,digit,n){
        for(var i=0;i<n;i++){
            if(board[row][i]==digit){
                return false;
            }
        }
        for(var j=0;j<n;j++){
            if(board[j][col]==digit){
                return false;
            }
        }
        var rn=Math.sqrt(n);
        var sr=row-row%rn;
        var sc=col-col%rn;
        for(var i=sr;i<sr+rn;i++){
            for(var j=sc;j<sc+rn;j++){
                if(board[i][j]==digit){
                    return false;
                }
            }
        }
        return true;
    }
    function printSudoku(board){
        for(var i=0;i<9;i++){
            for(var j=0;j<9;j++){
                System.out.print(board[i][j]+" ");
            }
            System.out.println();
        }
        System.out.println();
    }