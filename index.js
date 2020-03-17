var tempoSpam = 1000;
var jogo;
var divsNoDisplay = 0;
var pontos = 0;
var idd = 1;
var decrease = 50;
var flag = true;

function start(){
    document.getElementById("start").style.display = "none";
    document.getElementById("screen").style.display = "block";
    jogo = setInterval(start_game, tempoSpam);
    document.getElementById("pontos").style.display = "block";
    document.getElementById("virus-ativos").style.display = "block";

}

function start_game(){

    let newDiv = document.createElement('div');
    newDiv.id = idd;
    newDiv.setAttribute('onmousedown', `deleteDiv(${idd})`);
    newDiv.setAttribute('ontouchstart', `deleteDiv(${idd})`);
    newDiv.style.width = Math.ceil((Math.random() * 90) + 60)  + "px";
    newDiv.style.height = newDiv.style.width;
    newDiv.style.backgroundRepeat = "no-repeat";
    newDiv.style.backgroundSize = "cover";
    newDiv.style.backgroundImage = "url('src/images/corona_img.png')";
    let l = Math.ceil(Math.random() * (document.getElementById("screen").offsetWidth - 110));
    let t = Math.ceil(Math.random() * (document.getElementById("screen").offsetHeight - 150));
    newDiv.style.marginTop = t + "px";
    newDiv.style.marginLeft = l + "px";
    newDiv.style.position = "absolute";
    divsNoDisplay++;
    document.getElementById("screen").appendChild(newDiv);
    // document.getElementById(idd).addEventListener('mousedown', e => {
    //     e.target.style.display = "none";
    //     // element.parentNode.removeChild(element);
    //     pontos++;
    //     divsNoDisplay--;
    //     document.getElementById('pontos').innerHTML = `PONTOS:  ${pontos}`;
    //     document.getElementById('virus-ativos').innerHTML = `VÍRUS ATIVOS:  ${divsNoDisplay}`;
    // });
    idd++;

    if(tempoSpam > 100){
        tempoSpam -= decrease;
    }

    if(tempoSpam < 800){
        decrease = 40;
    }

    if(tempoSpam < 500){
        decrease = 5;
    }

    clearInterval(jogo);
    jogo = setInterval(start_game, tempoSpam);

    document.getElementById('pontos').innerHTML = `PONTOS:  ${pontos}`;
    document.getElementById('virus-ativos').innerHTML = `VÍRUS ATIVOS:  ${divsNoDisplay}`;
    
    if(divsNoDisplay == 15 && flag){
        document.getElementById('audioCardi').volume = 0.5;
        document.getElementById('audioCardi').play();
        tempoSpam = 300;
        flag = false;
    }

    // console.log(tempoSpam);

    if(divsNoDisplay == 50){
        clearInterval(jogo);
        for(let i = "1"; i < idd; i++){
            // console.log("i = ", i);
            let element = document.getElementById(i);
            element.removeAttribute("onclick");
            element.style.animationName = "fadeAway";
            element.style.animationDuration = "0.2s";
            element.style.animationFillMode = "forwards";
            element.style.animationPlayState = "running";
        }
        setTimeout(derrota, 200);
    }
}

function deleteDiv(idds){
    let element = document.getElementById(idds);
    element.style.display = "none";
    // element.parentNode.removeChild(element);
    pontos++;
    divsNoDisplay--;
    document.getElementById('pontos').innerHTML = `PONTOS:  ${pontos}`;
    document.getElementById('virus-ativos').innerHTML = `VÍRUS ATIVOS:  ${divsNoDisplay}`;
}


function derrota(){
    document.getElementById("pontos").style.display = "none";
    document.getElementById("virus-ativos").style.display = "none";
    document.getElementById("derrota").style.display = "block";
    document.getElementById('derrota-audio').volume = 0.1;
    document.getElementById("derrota-audio").play();
    document.getElementById("body").style.backgroundColor = "black";
    document.getElementById('ptnfinal').innerHTML = `PONTOS:  ${pontos}`;
    document.getElementById("ptnfinal").style.display = "block";
    document.getElementById("btn_fim").style.display = "block";

    for(let i = "1"; i < idd; i++){ 
        let element = document.getElementById(i);
        element.parentNode.removeChild(element);
    }
}


function inicio(){
    tempoSpam = 1000;
    jogo;
    divsNoDisplay = 0;
    pontos = 0;
    idd = 1;
    decrease = 50;
    flag = true;

    document.getElementById("start").style.display = "block";
    document.getElementById("screen").style.display = "none";
    clearInterval(jogo);
    document.getElementById('pontos').innerHTML = `PONTOS:  0`;
    document.getElementById('virus-ativos').innerHTML = `VÍRUS ATIVOS:  0`;
    document.getElementById('audioCardi').pause();
    document.getElementById('audioCardi').currentTime = 0.0;
    document.getElementById("pontos").style.display = "none";
    document.getElementById("virus-ativos").style.display = "none";
    document.getElementById("derrota").style.display = "none";
    document.getElementById("ptnfinal").style.display = "none";
    document.getElementById("btn_fim").style.display = "none";
    document.getElementById('derrota-audio').pause();
    document.getElementById('derrota-audio').currentTime = 0.0;
    document.getElementById("body").style.backgroundColor = "#ddc49f";
}