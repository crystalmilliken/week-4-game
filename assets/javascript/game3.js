const images = [{
        name: "daChew.png",
        healthPoints: 120,
        attackPower: 4,
        counterAttack: 3
    },
    {
        name: "luke.png",
        healthPoints: 140,
        attackPower: 8,
        counterAttack: 10
    },
    {
        name: "mall.png",
        healthPoints: 160,
        attackPower: 10,
        counterAttack: 5
    },
    {
        name: "vader.png",
        healthPoints: 180,
        attackPower: 12,
        counterAttack: 3
    },
    {
        name: "yoda.png",
        healthPoints: 220,
        attackPower: 20,
        counterAttack: 30
    }
];

let starWarsGame = {
    fighter: "",
    defender: "",
    heartCount: 0,
    attack: 0,
    currentHealthPoints: 0,
    currentAttackPower: 0,
    currentCounterAttack: 0,
    defenderHealthPoints: 0,
    defenderAttackNumber: 0,
    defenderCounterAttack: 0,
    numberOfAttacks: 0,
    attackNumberIncrease: 0,
    calculatePercentage:0,
    start: function () {
        $("#information").html("Pick 2 characters, first one is you, second is your opponent. Then ATTACK!");
        for (let i = 0; i < images.length; i++) {
            let character = images[i].name;
            let path = `<img src="assets/images/${character}" name = ${character} class="charactersToChooseFrom" style="height:150px">`;
            let newDiv = `<div class="characterDivs" id="${character}">${path}</div>`;
            $("#list").append(newDiv);
            let name = document.getElementById(`${images[i].name}`);
            name.classList.add("change");
            let displayName = images[i].name.replace(".png", "");
            //Jquery doesn't have an option to change pseudo-Elements
            document.getElementById(`${images[i].name}`).setAttribute("dataA", displayName);
            document.getElementById(`${images[i].name}`).setAttribute("dataB", images[i].healthPoints)
        }
        
        let charactersToChoose = $(".charactersToChooseFrom");
        for (let i = 0; i < charactersToChoose.length; i++) {
            charactersToChoose[i].addEventListener("click", this.check.bind(this));
        }
        $("#attack").on("click", this.attackBadGuy.bind(this));
    },

    counterAttackGoodGuy: function () {
        
        let displayName = this.defender.replace(".png", "");
        displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
        this.currentHealthPoints = this.currentHealthPoints - this.defenderCounterAttack;
        this.calculatePercentage = this.currentHealthPoints / this.heartCount;
        let multiplier = (a)=>{
            for(let i =0;i < a;i++){
                    $("#hearts").append("<img src='assets/images/life.png' alt='life' style='height:50px'>");
                }
        }
         if (this.calculatePercentage > 0) {
             $("#hearts").html("");
            //this.calculatePercentage = Math.floor(this.calculatePercentage);
            if(this.calculatePercentage > 0 && this.calculatePercentage <= 1){
                multiplier(1);
            }else if(this.calculatePercentage >= 1 && this.calculatePercentage <= 2){
               multiplier(2);
            }else if(this.calculatePercentage >= 2 && this.calculatePercentage <= 3){
                multiplier(3);
            }else if(this.calculatePercentage >= 3 && this.calculatePercentage <= 4){
              multiplier(4);
            }
           }
        $("#attacker").html(`<div style="text-align:center;background-color:white; width:200px;margin-left:2em;float:left;margin-top:2em;"><h2>Attacker</h2><img src="assets/images/${this.fighter}" style="height:150px;border:thin solid green"><p style="padding-right:2em; ">This is you! --> ${this.currentHealthPoints}</p></div>`);
        $("#information").html(`You attacked with ${this.currentAttackPower},<br>${displayName} attacked you with ${this.defenderCounterAttack}`);
        //Determine points
        if (this.currentHealthPoints <= 0) {
            $("#hearts").html("<img src='assets/images/brokenlife.png' alt='life' style='height:50px'>");
               $("#attacker").html(`<div style="text-align:center;margin-left:2em;float:left;margin-top:2em;"><img src="assets/images/won.jpg" style="height:150px;border:thin solid green"></div>`);
                $("#vs").html("");
                $("#attacker").html(``);
                $("#defender").html(``);
                $("#information").html(`Bummer, don't quit your dy job!<br><button onclick="location.reload()">Start Over</button>`);
            
        } else if (this.defenderHealthPoints <= 0) {

            this.numberOfAttacks++;
            $("#defender").html(``);
            $("#information").html(`Pick another character, try and attack again!`);
            this.defender = "";
            if (images.length === this.numberOfAttacks + 1) {
                $("#attacker").html(`<div style="text-align:center;margin-left:2em;float:left;margin-top:2em;"><img src="assets/images/won.jpg" style="height:150px;border:thin solid green"></div>`);
                $("#vs").html("");
                $("#attacker").html(``);
                $("#information").html(`Sky's the limit for you, you won!<br><button onclick="location.reload()">Start Over</button>`);
            }
        }
    },

    attackBadGuy: function () {
        if (this.defender === "" || this.fighter === "") {
            alert("Pick 2 players first please")
        }else{
            this.defenderHealthPoints = this.defenderHealthPoints - this.currentAttackPower;
        if (this.attack > 0) {
            this.currentAttackPower = this.currentAttackPower + this.attackNumberIncrease;
        }
        //look at mutation
        this.attack++;
        $("#defender").html(`<div style="text-align:center;background-color:white; width:200px;float:left;margin-top:2em;"><h2>Defender</h2><img src="assets/images/${this.defender}" style="height:150px;border:thin solid red;"><p style="padding-right:2em;">The guy to beat! --> ${this.defenderHealthPoints}</p></div>`);
        this.counterAttackGoodGuy();
        }
        
    },

    check: function (e) {
        let chosen = e.currentTarget.name;
        if (this.fighter === "") {
            let attackerDiv = document.getElementById("attacker");
            for (let i = 0; i < images.length; i++) {
                let compare = images[i];
                if (chosen === compare.name) {
                    this.currentAttackPower = compare.attackPower;
                    this.attackNumberIncrease = compare.attackPower;
                    this.currentHealthPoints = compare.healthPoints;
                    this.currentCounterAttack = compare.counterAttack;
                    this.fighter = compare.name;
                    document.getElementById(`${chosen}`).style.display = "none";
                    attackerDiv.innerHTML = `<div style="text-align:center;background-color:white;float:left; width:200px;margin-left:2em;float:left;margin-top:2em;clear:after;"><h2>Attacker</h2><img src="assets/images/${chosen}" style="height:150px;border:thin solid green;padding:.5em"><p style="padding-right:2em; ">This is you! --> ${this.currentHealthPoints}</p></div>`;
                    this.heartCount = (images[i].healthPoints)/4;
                    this.calculatePercentage = this.currentHealthPoints / this.heartCount;
                    if (this.calculatePercentage > 0) {
                        this.calculatePercentage = Math.floor(this.calculatePercentage);
                        if(this.calculatePercentage === 1 || this.calculatePercentage === 2 || this.calculatePercentage === 3 || this.calculatePercentage === 4){
                            for(let i =0;i<this.calculatePercentage;i++){
                                $("#hearts").append("<img src='assets/images/life.png' alt='life' style='height:50px'>");
                            }
                        }
                    }
                }
            }
        } else if (this.defender === "") {
            for (let i = 0; i < images.length; i++) {
                let compare = images[i];
                let defenderDiv = document.getElementById("defender");
                if (chosen === compare.name) {
                    this.defenderAttackNumber = compare.attackPower;
                    this.defenderHealthPoints = compare.healthPoints;
                    this.defenderCounterAttack = compare.counterAttack;
                    this.defender = compare.name;
                    document.getElementById(`${chosen}`).style.display = "none";
                    defenderDiv.innerHTML = `<div style="text-align:center;background-color:white;float:left; width:200px;float:left;margin-top:2em;"><h2>Defender</h2><img src="assets/images/${chosen}" style="height:150px;border:thin solid red;padding:.5em"><p style="padding-right:2em;">The guy to beat! --> ${this.defenderHealthPoints}</p></div>`;
                    document.getElementById("vs").style.visibility = "visible";
                }
            }
        } else {
            alert("start a new game");
        }
    }
}

starWarsGame.start();