'use strict';
import {fetchReceptArray} from './fetch.js';

const brewBtn = document.querySelector('.brew_btn');
const closeBtn = document.querySelector('.close_btn');
const recipeBtn = document.querySelector('.extra_btn');

const recipeWrap = document.querySelector('.recipe');

const container = document.querySelector('.recipe-container');
const container2 = document.querySelector('.recipe-container2');
const brewWrap = document.querySelector('.brew');

const nextBtn = document.querySelector('.next_btn');
const submitBtn = document.querySelector('.submit_btn');
const backBtn = document.querySelector('.back_btn');
const startBrewingBtn = document.querySelector('.start_btn');

const moutSoort = document.querySelector('.mout_soort');
const hopSoort = document.querySelector('.hop_soort');
const maischSchema = document.querySelector('.maisch_schema');
const kiesRecept = document.querySelector('#kiesRecept');

const tempDisp = document.querySelector('.temp');

const maltList = ['EBC3','EBC7','EBC15','EBC50','EBC150','EBC350','EBC900','EBC1200','tarwe','gerst','haver','mais','rijst']



// receptArr laden van de server!!!//
// async await load//
// voorlopig deze array//
const receptArray = []

/// DOM functions///

recipeBtn.addEventListener('click', function(){
    container.classList.toggle('hidden');
    container.classList.toggle('on');
})


closeBtn.addEventListener('click', function(){
    console.log(temp1);
});

nextBtn.addEventListener('click', function(){

    moutSoort.innerHTML = '';
    hopSoort.innerHTML = '';
    maischSchema.innerHTML= '';

    const moutAantal = document.querySelector('#mout_aantal').value;
    const hopAantal = document.querySelector('#hop_aantal').value;
    const cycliAantal = document.querySelector('#maisch_cycli').value;
  
    for(let i = moutAantal; i >= 1 ; i-- ){
    let moutHtml =   `<label for="moutsoort${i}">
                    Moutsoort ${i}
                    <select id="moutsoort${i}" name="moutsoort${i}">
                    <option value="ECB3">ECB 3</option>
                    <option value="ECB7">ECB 7</option>
                    <option value="ECB15">ECB 15</option>
                    <option value="ECB50">ECB 50</option>
                    <option value="ECB150">ECB 150</option>
                    <option value="ECB350">ECB 350</option>
                    <option value="ECB900">ECB 900</option>
                    <option value="ECB1200">ECB 1200</option>
                    <option value="tarwe">tarwe</option>
                    <option value="gerst">gerst</option>
                    <option value="haver">haver</option>
                    <option value="maïs">maïs</option>
                    <option value="rijst">rijst</option>
                    <input type="text" name="moutsoort${i}_kg" id="moutsoort${i}_kg" placeholder=" ... in kg">
                    </label>`;

    moutSoort.insertAdjacentHTML('afterbegin', moutHtml);

    };

    for(let i = hopAantal; i >= 1 ; i-- ){
    let hopHtml = `<label for="hop_soort${i}">
                        <span>Hop Soort ${i}:</span>
                        <select id="hop_soort${i}" name="hop_soort${i}">
                        <option value="Aramis">Aramis</option>
                            <option value="hellertau blanc">Hellertau Blanc</option>
                            <option value="Saaz">Saaz</option>
                            <option value="styrian golding">Styrian Golding</option>
                            <option value="Target">Target</option>
                        </select>
                    </label>
                    <label for="hop_soort${i}_in">
                        <span>Kooktijd:</span>
                        <input type="text" name="hop_gewicht${i}" id="hop_gewicht${i}" placeholder=" ... gewicht in gram">
                        <input type="text" name="hop_alfa${i}" id="hop_alfa${i}" placeholder=" ... alfa-waarde">
                        <input type="text" name="hop_soort${i}_in" id="hop_soort${i}_in" placeholder=" ... in min na start">
                        <input type="text" name="hop_soort${i}_uit" id="hop_soort${i}_uit" placeholder=" ... uit min na start">
                    </label>`
                    hopSoort.insertAdjacentHTML('afterbegin', hopHtml);
    };

    for(let i = cycliAantal; i >= 1 ; i-- ){
        let maischHtml = `<label for="cycli${i}">
                            <span>Maisch cyclus ${i}:</span>
                            <input type="text" name="cycli${i}" id="cycli${i}_temp" placeholder=" ... temp in C° ">
                            <input type="text" name="cycli${i}" id="cycli${i}_tijd" placeholder=" ... tijd in min">
                            </label>`
                    maischSchema.insertAdjacentHTML('afterbegin', maischHtml);
        };

    nextBtn.classList.toggle('hidden');
    container2.classList.toggle('hidden');
    nextBtn.classList.toggle('on');
    container2.classList.toggle('on');


                        
})


backBtn.addEventListener('click', function(){
    nextBtn.classList.toggle('hidden');
    container2.classList.toggle('hidden');
    nextBtn.classList.toggle('on');
    container2.classList.toggle('on');
    
    removeChild();
    
})


const removeChild = function(){
    setTimeout(function(){
        moutSoort.innerHTML = '';
        hopSoort.innerHTML = '';
        maischSchema.innerHTML= '';
    },1000) 
};

////////////////////////////////////
////MAAK RECEPT OBJECT///
//////////////////////////////////////////

submitBtn.addEventListener('click', function(){

    const newRecept = {};
    const hopArr = [];
    const moutArr = [];
    const cycliArr = [];

    newRecept.naam = document.querySelector('#recept_naam').value;
    newRecept.type = document.querySelector('#soort_bier').value;
    newRecept.maischWater =Number(document.querySelector('#maisch_water').value);
    newRecept.spoelWater = Number(document.querySelector('#spoel_water').value);
    newRecept.kookTijd = Number(document.querySelector('#kooktijd').value);

    const hopAantal = document.querySelector('#hop_aantal').value;
    const moutAantal = document.querySelector('#mout_aantal').value;
    const maischCycli = document.querySelector('#maisch_cycli').value;

    ///// INSERT FOUTMELDING BIJ VERKEERDE WAARDEN
    // if(hopIn )

    for(let i = 1;  i<=hopAantal ; i++){
        const hop = document.querySelector(`#hop_soort${i}`).value;
        const hopAlfa= document.querySelector(`#hop_alfa${i}`).value;
        const hopGewicht = document.querySelector(`#hop_gewicht${i}`).value;
        const hopIn = document.querySelector(`#hop_soort${i}_in`).value;
        const hopUit = document.querySelector(`#hop_soort${i}_uit`).value;
        hopArr.push({soort: hop, alfa:hopAlfa, gewicht:hopGewicht, in: hopIn  ,uit: hopUit});
    }
    newRecept.hops = hopArr;

    for(let i = 1;  i<=moutAantal ; i++){
        const moutSoort = document.querySelector(`#moutsoort${i}`).value;
        const moutKg = document.querySelector(`#moutsoort${i}_kg`).value;
        moutArr.push({soort: moutSoort, gewicht: moutKg});
    }
    newRecept.mouts = moutArr;

    for(let i = 1;  i<=maischCycli ; i++){
        const maischTemp = document.querySelector(`#cycli${i}_temp`).value;
        const maischTijd = document.querySelector(`#cycli${i}_tijd`).value;
        cycliArr.push({temp: maischTemp, tijd: maischTijd});
    }
    newRecept.cycli = cycliArr;

////////////////////////////////////////////////////////////////
//   VERSTUREN JSON NAAR SERVER//
///////////////////////////////////////////////////////
    const jsonFile = JSON.stringify(newRecept);
    const paraVerzending = {
        headers:{
            "content-type":"application/json; charset=UTF-8"
        },
        body: jsonFile,
        method:"POST"
    };
    fetch('http://localhost:1880/receptIn',paraVerzending)
    .then(data=>data.json())
    .then(res=>console.log(res))
    .catch(error=>console.log(error));



    // const req = new XMLHttpRequest()
    // req.open("GET",`http://192.168.0.171:1880/receptIn?${ newRecept }`,true);
    // req.send();

    //Verstuur JSON naar node red wanneer er op de submitknop wordt geduwd
    //

    // const promise = new Promise((resolve,reject)=>{
    //     fetch('https://jsonplaceholder.typicode.com/todos/1')
    // })
    
    // promise.then(response => response.json())
    // .then(data => console.log(data))
    // .catch(console.log('error'));
        

    // fetch('192.168.0.15:1880', {
    //     method: 'POST',
    //     headers: {
    //     },
    //     body: data
    // })
    // .then(response => {
    //     console.log(response)
    // })
    // .catch(err => {
    //     console.log(err)
    // })
    

    //// Verzenden van recept naar server////
});



///////////////////////////////////
//    BROUWEN APP
//////////////////////////////////
// brewbtn activeert: 
// api lijst van recepten, wordt verwerkt in keuze menu 
// er kan een keuze gemaakt worden, deze wordt verstuurd naar nodered
//
//
//
brewBtn.addEventListener('click', function(){
    brewWrap.classList.toggle('hidden');
    brewWrap.classList.toggle('on');
    //receptArray is een array gemaakt van alle recepten in nodered
    // dus fetch deze array
    fetchReceptArray()
        .then( res=> res.filter(item=>item!= null))
        .then( res=> res.forEach(recept=> {
        let receptKeuzeHtml = `<option value="${recept.naam}">${recept.naam}</option>`;
        kiesRecept.insertAdjacentHTML('afterbegin', receptKeuzeHtml);
    }));
   

});




///////////////////////////////////
//////////////////////////////////

// CREATE CLASS FOR RECIPE

//////////////////////////////
//////////////////////////////


class Recipe {

    control = {
        standaardMinimumOpwarmTank: 20,
        standaardVolumeOpwarmtank: 70,
        standaardOvershootMoutToevoeging: 3,
        standaardVoorsprongOpwarmTijd:5,
        standaardLaatsteMaischTemp:80
        };
    process = {
        currentStep: 0,
        totalSteps: 0,
        finished: false
        };
    steps = [];
    step = {
        doel: "",
        boodschap:["",""],
        outputs:{
            kraan1: 0, 
            kraan2: 0, 
            kraan3: 0, 
            kraan4: 0,
            kraan5: 0, 
            vuur: 0,
            kookVuur: 0, 
            weerstand: 0,
            pomp: 0, 
            boodschap1: '', 
            boodschap2: '',
            alarm: false
        }
    };

    constructor(recept){
        this.recept=recept;
    };

    get aantalMout(){return this.recept.mouts.length};
    get aantalHops(){return this.recept.hops.length};
    get aantalCycli(){return this.recept.cycli.length};
    get vulOpwarmTank1(){return this.recept.maischWater + this.control.standaardMinimumOpwarmTank};
    get vulOpwarmTank2(){return this.control.standaardVolumeOpwarmtank - this.recept.maischWater };
    get moutTekst(){return this.recept.mouts.map((mout,i)=> `mout ${i+1}: ${mout.soort} gewicht: ${mout.gewicht} kg`).join('\n')};
    get hopTekst(){return this.recept.hops.map((hop,i)=> `hop ${i+1}: ${hop.soort} gewicht: ${hop.gewicht} kg`).join('\n')};
    get kookTekst(){return this.recept.hops.map((hop,i)=> `Voeg hop ${i+1}: ${hop.soort} (${hop.gewicht}g) toe na ${hop.in} en verwijder na ${hop.uit}`).join('\n')}
    get zuursel(){undefined};
    get startTemperatuur() {return this.recept.cycli[0].temp};
    get lastStep(){return this.steps[this.steps.length-1]};
    get totaalAantalStappen(){return this.steps.length}
    get maischWater(){return this.recept.maischWater}


    _setBoodschap(lastStep){
        lastStep.outputs.boodschap1 = lastStep.boodschap[0];
        lastStep.outputs.boodschap2 = lastStep.boodschap[1];
    };

    createSteps(){
        
        //////////////////STEP1////////////////////////
        this.steps.push({
            doel:'vul opwarmtank',
            boodschap:[`Vul de opwarmTank met ${this.vulOpwarmTank1}L water`,`druk daarna op de knop`], 
            outputs: {
            kraan1: 0, 
            kraan2: 0, 
            kraan3: 0, 
            kraan4: 0,
            kraan5: 0, 
            vuur: 0, 
            weerstand: 0, 
            pomp: 0, 
            boodschap1: "", 
            boodschap2: ""
            },
            condities: ["button"]
        });
        
        this._setBoodschap(this.lastStep);

        //////////////////STEP2/////////////////////////

        this.steps.push({
          doel: 'Maischvat vullen',
          boodschap: [
            'kraan 1 open, zet dan pomp aan',
            `Vul maischtank met ${this.maischWater}L, zet de pomp uit en druk daarna op de knop`,
          ],
          outputs: {
            kraan1: 1,
            kraan2: 0,
            kraan3: 0,
            kraan4: 0,
            kraan5: 0,
            vuur: 0,
            weerstand: 0,
            pomp: 1,
            boodschap1: '',
            boodschap2: '',
          },
          condities: ['button'],
        });

        this._setBoodschap(this.lastStep);

        //////////////////STEP3/////////////////////////
        
        this.steps.push({
          doel: 'Vul opwarmtank 2de keer',
          boodschap: [
            'Zet de pomp uit, zet kraan1 dicht',
            `Vul opwarmTank tot ${this.vulOpwarmTank2}L, druk daarna op de knop`,
          ],
          outputs: {
            kraan1: 0,
            kraan2: 0,
            kraan3: 0,
            kraan4: 0,
            kraan5: 0,
            vuur: 0,
            weerstand: 0,
            pomp: 0,
            boodschap1: '',
            boodschap2: '',
          },
          condities: ['button']
        });

        this._setBoodschap(this.lastStep);

        //////////////////STEP4/////////////////////////

        this.steps.push({
            doel:'Opwarmen opwarmtank tot 10°C boven gewenst',
            boodschap:["Zet gasvuur aan stand 2 en Zet weerstand aan",`Maak klaar: ${this.moutTekst}
            ${this.hopTekst}`], 
            outputs:
            {kraan1: 0, 
            kraan2: 0, 
            kraan3: 0, 
            kraan4: 0,
            kraan5: 0, 
            vuur: 2, 
            weerstand: 1, 
            pomp: 0, 
            boodschap1: '', 
            boodschap2: ''
            },
            condities: [{temp: this.recept.cycli[0].temp}]
        });

        this._setBoodschap(this.lastStep);

        //////////////////STEP5/////////////////////////

        this.steps.push({
            doel:'Maischtank opwarmen',
            boodschap:[`Zet kraan 2 open en de pomp aan`,`Blijf verwarmen`], 
            outputs:
            {kraan1: 0, 
            kraan2: 1, 
            kraan3: 0, 
            kraan4: 0,
            kraan5: 0, 
            vuur: 2, 
            weerstand: 1, 
            pomp: 1, 
            boodschap1: '', 
            boodschap2: ''
            },
            condities: [{temp:`${this.startTemperatuur} + ${this.standaardOvershootMoutToevoeging}`}]  // conditie = gewenste cyclitemp + standaard overshoot bij voor de mout wordt toegevoegd
            })

        this._setBoodschap(this.lastStep);
        
        //////////////////STEP6/////////////////////////

        let newStep = {...this.step};
        
        newStep.doel = "Voeg mout toe";
        newStep.boodschap = ["voeg mout toe", "Druk daarna op de knop"];
        newStep.outputs.alarm = true; //alarm van 5seconden eerste keer
        newStep.outputs.kraan2 = 1; 
        newStep.outputs.pomp = 1; 
        newStep.outputs.vuur = 2; 
        newStep.outputs.weerstand = 1;
        newStep.condities = ['button'];
        
        this.steps.push(newStep);

        this._setBoodschap(this.lastStep);

        //////////////////STEP7/////////////////////////

        newStep = {...this.step};

        newStep.doel = "temperatuur stabilisatie na toevoeging mout";
        newStep.boodschap = ["Verwarm niet te fors, ga geleidelijk naar de gewenste temperatuur", `De gewenste temperatuur is ${this.startTemperatuur}°C`];
        newStep.outputs.alarm = true; //alarm van 5seconden eerste keer
        newStep.outputs.kraan2 = 1; 
        newStep.outputs.pomp = 1; 
        newStep.outputs.vuur = 1; 
        newStep.outputs.weerstand = 1;
        newStep.condities = [{temp:this.startTemperatuur}]; // conditie = start temperatuur cycli 1
        
        this.steps.push(newStep);

        this._setBoodschap(this.lastStep);

        //////////////////STEP8/////////////////////////
       
        newStep = {...this.step};

        newStep.doel = "Eerste meting zuurtegraad";
        newStep.boodschap = ["Doe een meting van de zuurtegraad en pas aan met melkzuur of brouwzout, druk op de knop en de maischtijd gaat in", `De gewenste zuurtegraad ligt tussen 5.2pH en 5.6pH `];
        newStep.outputs.alarm = false; //alarm van 5seconden eerste keer
        newStep.outputs.kraan2 = 1; 
        newStep.outputs.pomp = 1; 
        newStep.outputs.vuur = 0; 
        newStep.outputs.weerstand = 1;
        newStep.condities = ['button'];
        
        this.steps.push(newStep);

        this._setBoodschap(this.lastStep);

        
        //////////////////STEP9/////////////////////////
        //////////// MAISCHSTAPPEN LOOP  ///////////////


        this.recept.cycli.forEach((cycli,i) => {
            
            newStep = {...this.step};
            
            newStep.doel = `Maischstap ${i+1}a`;
            newStep.boodschap = ["Hou temperatuur in de gaten", `De gewenste temperatuur is ${cycli.temp}°C`];
            newStep.outputs.alarm = true; //alarm van 5seconden eerste keer
            newStep.outputs.kraan2 = 1; 
            newStep.outputs.pomp = 1; 
            newStep.outputs.vuur = 0; 
            newStep.outputs.weerstand = 1;
            newStep.condities = [`timer - ${this.control.standaardVoorsprongOpwarmTijd}`];
            
            this.steps.push(newStep);
    
            this._setBoodschap(this.lastStep);
    
            ///////////////////////////////////////////
    
            newStep = {...this.step};
            
            newStep.doel = `Maischstap ${i+1}b`;
            newStep.boodschap = ["Zet pomp uit, vuur op stand 2 en weerstand aan", `Druk dan op de knop, hierna nog ${this.control.standaardVoorsprongOpwarmTijd} min voor deze stap`];
            newStep.outputs.alarm = false; //alarm van 5seconden eerste keer
            newStep.outputs.kraan2 = 1; 
            newStep.outputs.pomp = 0; 
            newStep.outputs.vuur = 2; 
            newStep.outputs.weerstand = 1;
            newStep.condities = ['button'];
            
            this.steps.push(newStep);
    
            this._setBoodschap(this.lastStep);

            ///////////////////////////////////////////
    
            newStep = {...this.step};
    
            newStep.doel = `Maischstap ${i+1}c`;
            newStep.boodschap = ["Zet pomp uit, vuur op stand 2 en weerstand aan", `wacht op timer`];
            newStep.outputs.alarm = false; //alarm van 5seconden eerste keer
            newStep.outputs.kraan2 = 1; 
            newStep.outputs.pomp = 0; 
            newStep.outputs.vuur = 2; 
            newStep.outputs.weerstand = 1;
            newStep.condities = ['timer'];
            
            this.steps.push(newStep);
    
            this._setBoodschap(this.lastStep)

            ///////////////////////////////////////////
    
            newStep = {...this.step};

            newStep.doel = `Maischstap ${i+1}d voorbereiding volgende maischstap`;
            newStep.boodschap = ["Zet pomp aan, verwarm niet te fors, ga geleidelijk naar de gewenste temperatuur", `de gewenste temperatuur is ${this.recept.cycli[i+1]?this.recept.cycli[i+1].temp:80}°C`];
            newStep.outputs.alarm = true; //alarm van 5seconden eerste keer
            newStep.outputs.kraan2 = 1; 
            newStep.outputs.pomp = 1; 
            newStep.outputs.vuur = 1; 
            newStep.outputs.weerstand = 1;
            newStep.condities = ['temp2 en 3'];
            
            this.steps.push(newStep);
    
            this._setBoodschap(this.lastStep)

        });

        ////////////////// EINDE MAISCHLOOP/////////////////////////

        //////////////////STEP12/////////////////////////

        newStep = { ...this.step };

        newStep.doel = `Wort verpompen naar kooktank`;
        newStep.boodschap = [
          `Zet pomp uit, sluit kraan 3 en 5,  open kraan 4`,
          `Zet hierna pomp aan, als de maischtank leeg is, zet pomp uit, druk knop`,
        ];
        newStep.outputs.alarm = true; //alarm van 5seconden eerste keer
        newStep.outputs.kraan2 = 1;
        newStep.outputs.kraan3 = 0;
        newStep.outputs.kraan4 = 1;
        newStep.outputs.kraan5 = 0;
        newStep.outputs.pomp = 0;
        newStep.outputs.vuur = 2;
        newStep.outputs.weerstand = 1;
        newStep.condities = ['button'];

        this.steps.push(newStep);

        this._setBoodschap(this.lastStep);

        //////////////////STEP13/////////////////////////

        newStep = { ...this.step };

        newStep.doel = `spoel wort`;
        newStep.boodschap = [
          `Zet vuur, weerstand en pomp uit, sluit kraan 2 en 4, open kraan 1 en 3, zet kookvuur aan`,
          `Zet hierna pomp aan, spoel met ${this.recept.spoelWater}L, zet pomp uit, druk knop`,
        ];
        newStep.outputs.alarm = true; //alarm van 5seconden eerste keer
        newStep.outputs.kraan1 = 1;
        newStep.outputs.kraan2 = 0;
        newStep.outputs.kraan3 = 1;
        newStep.outputs.kraan4 = 0;
        newStep.outputs.pomp = 0;
        newStep.outputs.vuur = 0;
        newStep.outputs.kookVuur = 0;
        newStep.outputs.weerstand = 0;
        newStep.condities = ['button'];

        this.steps.push(newStep);

        this._setBoodschap(this.lastStep);


        //////////////////STEP14/////////////////////////

        newStep = { ...this.step };

        newStep.doel = `pomp maischvat 2de keer leeg`;
        newStep.boodschap = [
          `Vuur, weerstand en pomp staan uit, sluit kraan 1 en 3, open kraan 2 en 4`,
          `Zet hierna pomp aan, als de maischtank leeg is, zet pomp uit, druk knop`,
        ];
        newStep.outputs.alarm = true; //alarm van 5seconden eerste keer
        newStep.outputs.kraan1 = 0;
        newStep.outputs.kraan2 = 1;
        newStep.outputs.kraan3 = 0;
        newStep.outputs.kraan4 = 1;
        newStep.outputs.pomp = 0;
        newStep.outputs.vuur = 0;

        newStep.outputs.weerstand = 0;
        newStep.condities = ['button'];

        this.steps.push(newStep);

        this._setBoodschap(this.lastStep);


        //////////////////STEP15/////////////////////////

        newStep = { ...this.step };

        newStep.doel = `wachten op koken`;
        newStep.boodschap = [
          `Wachten nu op het koken van de wort, dit kan tot 30min duren, check regelmatig, druk dan op knop om de kooktijd te laten in gaan`,
          `Verwijder in tussentijd mout uit de maishtank `,
        ];
        newStep.outputs.alarm = true; //alarm van 5seconden eerste keer
        newStep.outputs.kraan1 = 0;
        newStep.outputs.kraan2 = 0;
        newStep.outputs.kraan3 = 0;
        newStep.outputs.kraan4 = 0;
        newStep.outputs.pomp = 0;
        newStep.outputs.vuur = 0;

        newStep.outputs.weerstand = 0;
        newStep.condities = ['button'];

        this.steps.push(newStep);

        this._setBoodschap(this.lastStep);

        //////////////////laatste stap/////////////////////////////

        newStep = { ...this.step };

        newStep.doel = `kookcyclus, hoppen`;
        newStep.boodschap = [`${this.kookTekst}`,
          `Verwijder in tussentijd mout uit de maishtank `,
        ];
        newStep.outputs.alarm = true; //alarm van 5seconden eerste keer
        newStep.outputs.kraan1 = 0;
        newStep.outputs.kraan2 = 0;
        newStep.outputs.kraan3 = 0;
        newStep.outputs.kraan4 = 0;
        newStep.outputs.pomp = 0;
        newStep.outputs.vuur = 0;

        newStep.outputs.weerstand = 0;
        newStep.condities = ['button'];

        this.steps.push(newStep);

        this._setBoodschap(this.lastStep);

        //////////////////// FINISHED ///////////////////////
        this.process.totalSteps = this.totaalAantalStappen;

    }
};

const receptTest2 = {
    naam:"effort fort",
    type:"tripel",
    maischWater:50,
    spoelWater:20,
    kookTijd:80,
    hops:[{soort:"Saaz",alfa:3.9,gewicht:150,in:5,uit:80},{soort:"Saaz",alfa:3.9,gewicht:50,in:15,uit:80},{soort:"Target",alfa:12.7,gewicht:100,in:75,uit:80},{soort:"Aramis",alfa:6.3,gewicht:60,in:75,uit:80}],
    mouts:[{soort:"ECB3",gewicht:13.85},{soort:"gerst",gewicht:1}],
    cycli:[{temp:62,"tijd":45},{temp:72,tijd:20},{temp:78,tijd:5}] 
};

const effortFort = new Recipe (receptTest2);

effortFort.createSteps();


//////////////////////////////////////////
//////////////////////////////////////////


startBrewingBtn.addEventListener('click', function(){
    console.log(kiesRecept.value);
    fetchReceptArray()
      .then(res=> res.filter(item=>item!= null))
      .then(recept=>recept.find(element=> element.naam===kiesRecept.value))
      .then(recept=> {
          const gekozenRecept = new Recipe (recept);
          gekozenRecept.createSteps();
          console.log(gekozenRecept);
          const jsonFile2 = JSON.stringify(gekozenRecept);
          const paraVerzending2 = {
          headers:{
              "content-type":"application/json; charset=UTF-8"
          },
          body: jsonFile2,
          method:"POST"
      };
      fetch('http://localhost:1880/receptKeuze',paraVerzending2)
      .then(data=>data.json())
      .catch(error=>console.log(error));
      })
  });