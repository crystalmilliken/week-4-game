let starWarsGame = {
    start: function(){
        const images = [
        {name:"daChew.png", healthPoints:120, attackPower:4, counterAttack:3}, 
        {name:"luke.png", healthPoints:140, attackPower:8, counterAttack:10}, 
        {name:"mall.png", healthPoints:160, attackPower:10, counterAttack:5}, 
        {name:"vader.png", healthPoints:180, attackPower:12, counterAttack:3}, 
        {name:"yoda.png", healthPoints:220, attackPower:20, counterAttack:30}];
        let fighter =  "",
            defender = "",
            attack = 0,
            currentHealthPoints = 0,
            currentAttackPower = 0,
            currentCounterAttack = 0,
            defenderHealthPoints = 0,
            defenderAttackNumber = 0,
            defenderCounterAttack = 0,
            numberOfAttacks = 0;
            attackNumberIncrease = 0;
                document.getElementById("information").innerHTML = "Pick 2 characters, first one is you, second is your opponent. Then ATTACK!";
                for(let i = 0; i < images.length; i++){
                    let character = images[i].name;
                    let path = `<img src="assets/images/${character}" name = ${character} class="charactersToChooseFrom" style="height:150px">`;
                    let newDiv = `<div class="characterDivs" id="${character}">${path}</div>`
                    $("#list").append(newDiv);
                     let name = document.getElementById(`${images[i].name}`);
                    name.classList.add("change");
                    let displayName = images[i].name.replace(".png","");
                    document.getElementById(`${images[i].name}`).setAttribute("dataA", displayName);
                    document.getElementById(`${images[i].name}`).setAttribute("dataB", images[i].healthPoints)
                }
                let charactersToChoose = document.getElementsByClassName("charactersToChooseFrom");
                    for(let i = 0; i<charactersToChoose.length; i++){
                        charactersToChoose[i].addEventListener("click", function(){check(this)});
                        
                    }
                $("#attack").on("click", function(){attackBadGuy()});
        let counterAttackGoodGuy = function(){
            let displayName = defender.replace(".png","");
            displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
            currentHealthPoints =  currentHealthPoints - defenderCounterAttack;
            document.getElementById("attacker").innerHTML = `<div style="text-align:center;background-color:white; width:200px;margin-left:2em;float:left;margin-top:2em;"><h2>Attacker</h2><img src="assets/images/${fighter}" style="height:150px;border:thin solid green"><p style="padding-right:2em; ">This is you! --> ${currentHealthPoints}</p></div>`;
            document.getElementById("information").innerHTML = `You attacked with ${currentAttackPower},<br>${displayName} attacked you with ${defenderCounterAttack}`;
            //Determine points
            if(currentHealthPoints <= 0){
                alert("you lost")
            }else if(defenderHealthPoints <= 0){
                numberOfAttacks++;
                document.getElementById("defender").innerHTML = ``;
                document.getElementById("information").innerHTML = `Pick another character, try and attack again!`;
                defender = "";
                if(images.length === numberOfAttacks +1){
                    document.getElementById("attacker").innerHTML = `<div style="text-align:center;margin-left:2em;float:left;margin-top:2em;"><img src="assets/images/won.jpg" style="height:150px;border:thin solid green"></div>`;
                    document.getElementById("vs").innerHTML = "";
                
                    document.getElementById("attacker").innerHTML = ``;
                    document.getElementById("information").innerHTML = `Sky's the limit for you, you won!<br><button onclick="location.reload()">Start Over</button>`;
                }
            }
         }  
        let attackBadGuy = function (){
            if(defender === "" || fighter === ""){
                alert("Pick 2 players first please")
            }
            defenderHealthPoints =  defenderHealthPoints - currentAttackPower;
            if(attack > 0){
                currentAttackPower = currentAttackPower + attackNumberIncrease;
            }
            //look at mutation
            attack++;
            document.getElementById("defender").innerHTML = `<div style="text-align:center;background-color:white; width:200px;float:left;margin-top:2em;"><h2>Defender</h2><img src="assets/images/${defender}" style="height:150px;border:thin solid red;"><p style="padding-right:2em;">The guy to beat! --> ${defenderHealthPoints}</p></div>`;
            counterAttackGoodGuy();
        }  
        let check = function(e){
            let chosen = e.name;
            if(fighter === ""){
                let attackerDiv = document.getElementById("attacker");
                for(let i = 0; i < images.length; i ++){
                let compare = images[i];
                    if(chosen === compare.name){
                        currentAttackPower = compare.attackPower;
                        attackNumberIncrease = compare.attackPower;
                        currentHealthPoints = compare.healthPoints;
                        currentCounterAttack = compare.counterAttack;
                        fighter = compare.name;
                        document.getElementById(`${chosen}`).style.display = "none";
                        attackerDiv.innerHTML = `<div style="text-align:center;background-color:white;float:left; width:200px;margin-left:2em;float:left;margin-top:2em;clear:after;"><h2>Attacker</h2><img src="assets/images/${chosen}" style="height:150px;border:thin solid green;padding:.5em"><p style="padding-right:2em; ">This is you! --> ${currentHealthPoints}</p></div>`;
                    }
                }
            }else if(defender === ""){
                for(let i = 0; i < images.length; i ++){
                let compare = images[i];
                let defenderDiv = document.getElementById("defender");
                    if(chosen === compare.name){
                        defenderAttackNumber = compare.attackPower;
                        defenderHealthPoints = compare.healthPoints;
                        defenderCounterAttack = compare.counterAttack;
                        defender = compare.name;
                        document.getElementById(`${chosen}`).style.display = "none";
                        defenderDiv.innerHTML = `<div style="text-align:center;background-color:white;float:left; width:200px;float:left;margin-top:2em;"><h2>Defender</h2><img src="assets/images/${chosen}" style="height:150px;border:thin solid red;padding:.5em"><p style="padding-right:2em;">The guy to beat! --> ${defenderHealthPoints}</p></div>`;
                        document.getElementById("vs").style.visibility = "visible";
                    }
                }
            }else{
                alert("start a new game");
            }
           
            
    }
            }
}

starWarsGame.start();