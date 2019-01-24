window.onload = function() {
    game = new Game("#canvas");
    document.querySelector("#start-buttom").onclick = function() {
        document.querySelector("#start-container").style.display = "none";
        document.querySelector("#canvas").style.display = "block";
        startGame()
    }
};

function startGame() {
    
}