let starWarsGame = {
    fighter: "",
    defender:"",
    attack:0,
    currentHealthPoints: 0,
    currentAttackPower: 0,
    currentCounterAttack: 0,
    defenderHealthPoints: 0,
    defenderAttackNumber: 0,
    defenderCounterAttack: 0,
    numberOfAttacks: 0,
    images: [
        {name:"daChew.png", healthPoints:120, attackPower:4, counterAttack:3}, 
        {name:"luke.png", healthPoints:140, attackPower:8, counterAttack:10}, 
        {name:"mall.png", healthPoints:160, attackPower:10, counterAttack:5}, 
        {name:"vader.png", healthPoints:180, attackPower:12, counterAttack:3}, 
        {name:"yoda.png", healthPoints:220, attackPower:20, counterAttack:30}],
    attackNumberIncrease: 0,
    counterAttackGoodGuy: function(){
        console.log(this)
        let displayName = this.defender.replace(".png","");
        displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
        this.currentHealthPoints =  this.currentHealthPoints - this.defenderCounterAttack;
        document.getElementById("attacker").innerHTML = `<div style="text-align:center;background-color:white; width:200px;margin-left:2em;float:left;margin-top:2em;"><h2>Attacker</h2><img src="assets/images/${this.fighter}" style="height:150px;border:thin solid green"><p style="padding-right:2em; ">This is you! --> ${this.currentHealthPoints}</p></div>`;
        document.getElementById("information").innerHTML = `You attacked with ${this.currentAttackPower},<br>${displayName} attacked you with ${this.defenderCounterAttack}`;
        //Determine points
        if(this.currentHealthPoints <= 0){
            alert("you lost")
        }else if(this.defenderHealthPoints <= 0){
            this.numberOfAttacks++;
            document.getElementById("defender").innerHTML = ``;
            document.getElementById("information").innerHTML = `Pick another character, try and attack again!`;
            this.defender = "";
            if(this.images.length === this.numberOfAttacks +1){
                document.getElementById("attacker").innerHTML = `<div style="text-align:center;margin-left:2em;float:left;margin-top:2em;"><img src="assets/images/won.jpg" style="height:150px;border:thin solid green"></div>`;
                document.getElementById("vs").innerHTML = "";
               
                document.getElementById("attacker").innerHTML = ``;
                document.getElementById("information").innerHTML = `Sky's the limit for you, you won!<br><button onclick="location.reload()">Start Over</button>`;
            }
        }
    },
    attackBadGuy: function (){
        
            if(this.defender === "" || this.fighter === ""){
                alert("Pick 2 players first please")
            }
            
                    this.defenderHealthPoints =  this.defenderHealthPoints - this.currentAttackPower;
                    if(this.attack > 0){
                        this.currentAttackPower = this.currentAttackPower + this.attackNumberIncrease;
                    }
                    //look at mutation
                    this.attack++;
                    document.getElementById("defender").innerHTML = `<div style="text-align:center;background-color:white; width:200px;float:left;margin-top:2em;"><h2>Defender</h2><img src="assets/images/${starWarsGame.defender}" style="height:150px;border:thin solid red;"><p style="padding-right:2em;">The guy to beat! --> ${starWarsGame.defenderHealthPoints}</p></div>`;
                    this.counterAttackGoodGuy();
    },
    check: function(e){
            let target = e.target;
            let chosen = e.target.name;
            let fighter = starWarsGame.fighter;
            if(fighter === ""){
                let attackerDiv = document.getElementById("attacker");
                for(let i = 0; i < starWarsGame.images.length; i ++){
                let compare = starWarsGame.images[i];
                    if(chosen === compare.name){
                        starWarsGame.currentAttackPower = compare.attackPower;
                        starWarsGame.attackNumberIncrease = compare.attackPower;
                        starWarsGame.currentHealthPoints = compare.healthPoints;
                        starWarsGame.currentCounterAttack = compare.counterAttack;
                        starWarsGame.fighter = compare.name;
                        document.getElementById(`${chosen}`).style.display = "none";
                        attackerDiv.innerHTML = `<div style="text-align:center;background-color:white;float:left; width:200px;margin-left:2em;float:left;margin-top:2em;clear:after;"><h2>Attacker</h2><img src="assets/images/${chosen}" style="height:150px;border:thin solid green;padding:.5em"><p style="padding-right:2em; ">This is you! --> ${starWarsGame.currentHealthPoints}</p></div>`;

                    }
                }
            }else if(starWarsGame.defender === ""){
                for(let i = 0; i < starWarsGame.images.length; i ++){
                let compare = starWarsGame.images[i];
                let defenderDiv = document.getElementById("defender");
                    if(chosen === compare.name){
                        starWarsGame.defenderAttackNumber = compare.attackPower;
                        starWarsGame.defenderHealthPoints = compare.healthPoints;
                        starWarsGame.defenderCounterAttack = compare.counterAttack;
                        starWarsGame.defender = compare.name;
                        document.getElementById(`${chosen}`).style.display = "none";
                        defenderDiv.innerHTML = `<div style="text-align:center;background-color:white;float:left; width:200px;float:left;margin-top:2em;"><h2>Defender</h2><img src="assets/images/${chosen}" style="height:150px;border:thin solid red;padding:.5em"><p style="padding-right:2em;">The guy to beat! --> ${starWarsGame.defenderHealthPoints}</p></div>`;
                        document.getElementById("vs").style.visibility = "visible";
                    }
                }
            }else{
                alert("start a new game");
            }
           
            
    },
    start: function(){
                
                document.getElementById("information").innerHTML = "Pick 2 characters, first one is you, second is your opponent. Then ATTACK!";
                for(let i = 0; i < this.images.length; i++){
                    let character = this.images[i].name;
                    let path = `<img src="assets/images/${character}" name = ${character} class="charactersToChooseFrom" style="height:150px">`;
                    let newDiv = `<div class="characterDivs" id="${character}">${path}</div>`
                    $("#list").append(newDiv);
                     let name = document.getElementById(`${this.images[i].name}`);
                    name.classList.add("change");
                    let displayName = this.images[i].name.replace(".png","");
                    document.getElementById(`${this.images[i].name}`).setAttribute("dataA", displayName);
                    document.getElementById(`${this.images[i].name}`).setAttribute("dataB", this.images[i].healthPoints)
                }
                let charactersToChoose = document.getElementsByClassName("charactersToChooseFrom");
                    for(let i = 0; i<charactersToChoose.length; i++){
                        charactersToChoose[i].addEventListener("click", this.check);
                    }
                $("#attack").on("click",this, function(obj){
                    console.log(obj)
                    starWarsGame.attackBadGuy(obj);
                });
                
            }
}
starWarsGame.start();