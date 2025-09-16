/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
function testButton(totalDemand, answer, response, help,oca,ocr) {
  if (response == 1) {
    response = "responseDU";
  } else if (response == 2) {
    response = "responsePL";
  } else {
    response = "responseMS";
  }
  if (totalDemand == answer && oca == ocr) {
    let text = "<h3>Correct</h3>";
    document.getElementById(response).innerHTML = text;
  } else {
    let text = `
    <h3>Incorrect</h3>
    <div class="row">
    <div class="column">
            <p> Correct answer is <b>${totalDemand} </b>for the conductor and <b>${oca} amp</b> for the overcurrent </p><br></p>
    </div>
    <div class="column">
        <p id="plHelp">${help}</p>
    </div>
   </div>
    `;
    document.getElementById(response).innerHTML = text;
  }
}
const t13 =`
<option Value="1">Select Overcurrent Size</option>
<option Value="15">15 amp</option>
<option Value="20">20 amp</option>
<option Value="25">25 amp</option>
<option Value="30">30 amp</option>
<option Value="35">35 amp</option>
<option Value="40">40 amp</option>
<option Value="45">45 amp</option>
<option Value="50">50 amp</option>
<option Value="60">60 amp</option>
<option Value="70">70 amp</option>
<option Value="80">80 amp</option>
<option Value="90">90 amp</option>
<option Value="100">100 amp</option>
<option Value="110">110 amp</option>
<option Value="125">125 amp</option>
<option Value="150">150 amp</option>
<option Value="175">175 amp</option>
<option Value="200">200 amp</option>
<option Value="225">225 amp</option>
</select>
`
const wireTable = `
<option Value="1">Select Conductor Size</option>
<option Value="14 awg">14 awg</option>
<option Value="12 awg">12 awg</option>
<option Value="10 awg">10 awg</option>
<option Value="8 awg">8 awg</option>
<option Value="6 awg">6 awg</option>
<option Value="4 awg">4 awg</option>
<option Value="3 awg">3 awg</option>
<option Value="2 awg">2 awg</option>
<option Value="1 awg">1 awg</option>
<option Value="0">0</option>
<option Value="00">00</option>
<option Value="000">000</option>
<option Value="0000">0000</option>
<option Value="250 Kcmil">250 Kcmil</option>
<option Value="300 Kcmil">300 Kcmil</option>
<option Value="350 Kcmil">350 Kcmil</option>
<option Value="400 Kcmil">400 Kcmil</option>
<option Value="500 Kcmil">500 Kcmil</option>
<option Value="600 Kcmil">600 Kcmil</option>
<option Value="700 Kcmil">700 Kcmil</option>
<option Value="750 Kcmil">750 Kcmil</option>
<option Value="800 Kcmil">800 Kcmil</option>
<option Value="900 Kcmil">900 Kcmil</option>
<option Value="1000 Kcmil">1000 Kcmil</option>
<option Value="1250 Kcmil">1250 Kcmil</option>
<option Value="1500 Kcmil">1500 Kcmil</option>
<option Value="1750 Kcmil">1750 Kcmil</option>
<option Value="2000 Kcmil">2000 Kcmil</option>
</select>
`;
//<select name="wireSz" id="wireSz">${wireTable}<br>
var glHelp =""
const raceWay = getRandomItem(['rigid steel conduit', 'EMT', 'rigid PVC','flexible metal raceway']);
const continuous = getRandomItem(['','','continuous','Non-continuous']);
const breaker = getRandomItem(["80% continuous rated breaker","80% continuous rated breaker","80% continuous rated breaker","100% continuous rated breaker"]);
const wtype = getRandomItem(["CU","CU","AL"]);
var TTemp = getRandomItem(["unmarked",60,75,90]);
const wireTemp = getRandomItem([60,75,90]);
var numberA = randomRangeWithIncrements(12, 150, 1);
var eMarked = `All equipment is marked with ${TTemp}`
if (continuous != 'Non-continuous' && breaker != "100% continuous rated breaker"){
var correctedA = numberA*1.25;
} else {
  var correctedA = numberA;
}
var terminationTempa = TTemp;
if (TTemp == "unmarked"){
  if (numberA < 100){
    var terminationTempa = 60;
  } else {
    var terminationTempa = 75;
  }
  var eMarked = "The equipment has no visible markings"
}
console.log(correctedA,terminationTempa,wireTemp,wtype,false,numberA)
const correctA = Wire(correctedA,terminationTempa,wireTemp,wtype,false,numberA);
console.log(correctA)
const aOC = overcurrent(correctA.ampacity);
if (breaker =="100% continuous rated breaker"){
var glHelp = glHelp+"A 100% rated breaker allows us to size the wire up too 100% of the load according to 4-004.<br><br>";
} 
if (continuous == 'Non-continuous') {
  var glHelp = glHelp+"A non-continuous load allows us to size the wire as per the load according to 4-004.<br><br>" ;
}
if (wtype == "AL"){
  var glHelp = glHelp+"The conductor is made of aluminum therefore Table 4 will be used to find the correct wire. <br><br>";
} else {
  var glHelp = glHelp+"The conductor is made of copper therefore Table 2 will be used to find the correct wire. <br><br>";
}
if(correctA.tableTemp==60){
  var glHelp = glHelp+"The lowest temprature rating is 60 degrees or unmarked therefore we must use the 60 degree coloumn 4-006 1) and 2). <br><br>"
} else if (correctA.tableTemp == 75 && numberA >= 100){
  var glHelp = glHelp+"The lowest temprature rating is 75 degrees or unmarked and load is greater then 100 A, 4-006 1) and 2). <br><br>"
} else if (correctA.tableTemp == 75) {
  var glHelp = glHelp+"The lowest temprature rating is 75 degrees 4-006 1). <br><br>"
} else {
  var glHelp = glHelp+"The lowest temprature rating is 90 degrees 4-006 1). <br><br>"
}
if (continuous != 'Non-continuous' && breaker != "100% continuous rated breaker"){
  var glHelp = glHelp+"If the load is considered continuous and the breaker is only rated for 80% operation then rule 8-104 states we can only load a wire up to 80% of its rated ampacity. This means we divide the load by .8 before we select a wire from the appropriate table. In this case<b> "+numberA+"/.8="+correctedA+" amps.</b><br>";
}
var glHelp =glHelp +"The overcurrent is sized based on the rated ampacity of the conductor from tables 1,2,3 or 4, 14-104 1) a)<br>";
//const glHelp = "This is the help file";
const button = `
<p>    
${numberA} amp ${continuous} load utilizing ${wtype} conductor with RW${wireTemp} insulation.<br>Ran in ${raceWay} with no more then 3 conductors<br>  ${eMarked}. <br>The overcurrent is a ${breaker}.
<h3>Enter the total calculated demand in amps:</h3>
<form name="answerDU">
<select name="wireSz" id="wireSz">${wireTable}<br>
<select name="ocSz" id="ocSz">${t13}<br>
<input type="button" id ="DUB" value="Submit" onclick="testButton('${correctA.size}',document.getElementById('wireSz').value,1,'${glHelp}',${aOC},document.getElementById('ocSz').value,'${numberA}')"><br>
</form>
<p id="responseDU"></p>
</p>
`;
function addElement() {
  // create a new div element
  const newDiv = document.createElement("div");
  newDiv.innerHTML = button;
  newDiv.id = "dwellingCalc";
  let sp2 = document.getElementById("div1");
  // Get the parent element
  let parentDiv = sp2.parentNode;
  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div1");
  parentDiv.insertBefore(newDiv, currentDiv);
}
//Help
const t5ATemp = [30,35,40,45,50,55,60,65,70,75,80];
const t5A60 = [1,.91,.82,.71,.58,.41];
const t5A75 = [1,.94,.88,.82,.75,.67,.58,.47,.33];
const t5A90 = [1,.96,.91,.87,.82,.76,.71,.65,.58,.47,.33];
var numberB = randomRangeWithIncrements(12, 50, 1);
const wtype2 = getRandomItem(["CU","CU","AL"]);
const TTemp2 = getRandomItem(["unmarked","60","75","90"]);
const wireTemp2 = getRandomItem(["60","75","90"]);
if (TTemp2 =="unmarked"){
var eMarked2 = 'There are no visible markings on the equipment';
} else {
  var eMarked2 = `All equipment is marked with ${TTemp2}`;
}
var numbCond = randomRangeWithIncrements(3,60,1);
var t5Help =""
var whichCol =""
if (wireTemp2 == "60"){
  var ambTemp = randomRangeWithIncrements(20,55,1);
  var t5ACF = t5A60.at(t5ATemp.findIndex((element) => element >= ambTemp));
  var t5Help = t5Help+"In table 5A, the correction factor for wire insulation rating of 60 degrees in an ambient temperature of "+ambTemp+" degrees is "+t5ACF+".<br><br>";
  var whichCol = "60";
} else if (wireTemp2 == "75"){
  var ambTemp = randomRangeWithIncrements(20,70,1);
  var t5ACF = t5A75.at(t5ATemp.findIndex((element) => element >= ambTemp));
  var t5Help = t5Help+"In table 5A, the correction factor for wire insulation rating of 75 degrees in an ambient temperature of "+ambTemp+" degrees is "+t5ACF+".<br><br>";
  var whichCol = "75";
} else if(wireTemp2 == "90") {
  var ambTemp = randomRangeWithIncrements(20,80,1);
  var t5ACF = t5A90.at(t5ATemp.findIndex((element) => element >= ambTemp));
  var t5Help = t5Help+"In table 5A, the correction factor for wire insulation rating of 90 degrees in an ambient temperature of "+ambTemp+" degrees is "+t5ACF+".<br><br>";
  var whichCol = "90";
}
if (ambTemp < 31){
  var t5Help = "An ambient temperature of 30 or under falls under the normal conditions for tables 1 and 4 and no correction is required for this condition.<br><br>"
}
if (numbCond < 3 ){
  var t5CCF = 1;
  var t5Help = t5Help + "Tables 1 and 4 are designed for up to 3 conductors and no correction factor is required for this condition. The total correction factor is "+Math.round(t5CCF*t5ACF*1000)/1000+"<br><br>"
} else if ( numbCond < 6 ){
  var t5CCF = .8;
  var t5Help = t5Help + "Since there are between 4 and 6 current carrying conductors in this conduit Table 5C has a correction factor of 0.80. The total correction factor is "+Math.round(t5CCF*t5ACF*1000)/1000+"<br><br>"
} else if ( numbCond < 24 ){
  var t5CCF = .7;
  var t5Help = t5Help + "Since there are between 7 and 24 current carrying conductors in this conduit Table 5C has a correction factor of 0.70. The total correction factor is "+Math.round(t5CCF*t5ACF*1000)/1000+"<br><br>"
} else if ( numbCond < 42 ){
  var t5CCF = .6;
  var t5Help = t5Help + "Since there are between 25 and 42 current carrying conductors in this conduit Table 5C has a correction factor of 0.60. The total correction factor is "+Math.round(t5CCF*t5ACF*1000)/1000+"<br><br>"
} else if ( numbCond > 41 ){
  var t5CCF = .5;
  var t5Help = t5Help + "Since there are 43 or more current carrying conductors in this conduit Table 5C has a correction factor of 0.50. The total correction factor is "+Math.round(t5CCF*t5ACF*1000)/1000+"<br><br>"
}
if (wtype2=="AL"){
  var whichTable = 4;
} else {
  var whichTable = 2;
}
var correctedB = numberB/(t5ACF*t5CCF);
var correctB = Wire(correctedB,TTemp2,wireTemp2,wtype2,true);
var corrOC=(correctB.ampacity*(t5ACF*t5CCF))
var aOC2 = overcurrent(corrOC);
if (correctB.size == '14 awg' && aOC2 > 15 && wireTemp2 != "90" && wtype2=="CU"){
 var correctB= Wire(25,TTemp2,wireTemp2,wtype2,true);
 var corrOC=(correctB.ampacity*(t5ACF*t5CCF))
 var aOC2 = overcurrent(corrOC);
}
if (correctB.size == '14 awg' && aOC2 > 15 && wireTemp2 == "90"&& wtype2=="CU"){
  var correctB= Wire(26,TTemp2,wireTemp2,wtype2,true);
  var corrOC=(correctB.ampacity*(t5ACF*t5CCF))
  var aOC2 = overcurrent(corrOC);
}
if (correctB.size == '12 awg' && aOC2 > 20 && wireTemp2 != "90" && wtype2=="CU"){
  var correctB= Wire(30,TTemp2,wireTemp2,wtype2,true);
  var corrOC=(correctB.ampacity*(t5ACF*t5CCF))
  var aOC2 = overcurrent(corrOC);
 }
 if (correctB.size == '12 awg' && aOC2 > 20 && wireTemp2 == "90"&& wtype2=="CU"){
   var correctB= Wire(31,TTemp2,wireTemp2,wtype2,true);
   var corrOC=(correctB.ampacity*(t5ACF*t5CCF))
   var aOC2 = overcurrent(corrOC);
 }
 if (correctB.size == '10 awg' && aOC2 > 30 && wireTemp2 != "90" && wtype2=="CU"){
  var correctB= Wire(40,TTemp2,wireTemp2,wtype2,true);
  var corrOC=(correctB.ampacity*(t5ACF*t5CCF))
  var aOC2 = overcurrent(corrOC);
 }
 if (correctB.size == '10 awg' && aOC2 > 30 && wireTemp2 == "90"&& wtype2=="CU"){
   var correctB= Wire(41,TTemp2,wireTemp2,wtype2,true);
   var corrOC=(correctB.ampacity*(t5ACF*t5CCF))
   var aOC2 = overcurrent(corrOC);
 }
 if (correctB.size == '12 awg' && aOC2 > 15 && wireTemp2 != "90" && wtype2=="AL"){
  var correctB= Wire(25,TTemp2,wireTemp2,wtype2,true);
  var corrOC=(correctB.ampacity*(t5ACF*t5CCF))
  var aOC2 = overcurrent(corrOC);
 }
 if (correctB.size == '12 awg' && aOC2 > 15 && wireTemp2 == "90"&& wtype2=="AL"){
   var correctB= Wire(26,TTemp2,wireTemp2,wtype2,true);
   var corrOC=(correctB.ampacity*(t5ACF*t5CCF))
   var aOC2 = overcurrent(corrOC);
 }
 if (correctB.size == '10 awg' && aOC2 > 25 && wireTemp2 != "90" && wtype2=="AL"){
  var correctB= Wire(35,TTemp2,wireTemp2,wtype2,true);
  var corrOC=(correctB.ampacity*(t5ACF*t5CCF))
  var aOC2 = overcurrent(corrOC);
 }
 if (correctB.size == '10 awg' && aOC2 > 25 && wireTemp2 == "90"&& wtype2=="AL"){
   var correctB= Wire(36,TTemp2,wireTemp2,wtype2,true);
   var corrOC=(correctB.ampacity*(t5ACF*t5CCF))
   var aOC2 = overcurrent(corrOC);
 }
 var t5Help = t5Help+"To find the smallest allowed conductor we must divide the expected load by the combined correction factor<b> "+numberB+"/"+Math.round(t5CCF*t5ACF*1000)/1000+" = "+Math.round(correctedB*10)/10+" amps.</b> This is the minimum ampacity we take to table "+whichTable+" in the "+whichCol+" degree coloumn, to find our conductor.<br><br>The conductor is not actually good for the listed amapcity in the table due to the conditions they run in therefore we must take the table ampacity and multiple it by the correction factor to find its correct ampacity.<b>"+Math.round(correctB.ampacity*10)/10+" * "+Math.round(t5CCF*t5ACF*1000)/1000+" = "+Math.round(corrOC*10)/10+".</b> We can take that number to Table 13 to select the maximum overcurrent allowed."
addElement();
const buttonp = `
<p>    
${numberB} amp non-continuous load utilizing ${wtype2} conductor with RW${wireTemp2} insulation.<br> ${eMarked2} <br>In a space with a high ambient temperature of ${ambTemp} degrees celsius.<br> It will be run in a conduit with ${numbCond} other current carrying conductors.
<h3>Enter the total calculated demand in amps:</h3>
<form name="answerT5BC">
<select name="wireSz2" id="wireSz2">${wireTable}<br>
<select name="ocSz2" id="ocSz2">${t13}<br>
<input type="button" id ="DUB" value="Submit" onclick="testButton('${correctB.size}',document.getElementById('wireSz2').value,2,'${t5Help}',${aOC2},document.getElementById('ocSz2').value,'${numberB}')"><br>
</form>
<p id="responsePL"></p>
`;
function addElementp() {
  // create a new div element
  const newDiv = document.createElement("div");
  newDiv.innerHTML = buttonp;
  newDiv.id = "publicCalc";
  let sp2 = document.getElementById("div2");
  // Get the parent element
  let parentDiv = sp2.parentNode;
  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div2");
  parentDiv.insertBefore(newDiv, currentDiv);
}
addElementp();
function randomRangeWithIncrements(min, max, inc) {
  min = min || 0;
  inc = inc || 1;
  if (!max) {
    return new Error("need to define a max");
  }
  return Math.floor((Math.random() * (max - min)) / inc) * inc + min;
}
/* eslint-disable no-redeclare */
// eslint-disable-next-line no-unused-vars
function Wire(ma,terminationTemp,insulationTemp,wm,SL,loadAmps) {
  var minAMP = ma;
  var TTTtemp = Math.min(insulationTemp,terminationTemp);
  let x =0;
  if (wm=="CU"){
      var gen60ampT2=[15,20,30,40,55,70,85,95,110,125,145,165,195,215,240,260,280,320,350,385,400,410,435,455,495,525,545,555];
      var gen75ampT2=[15,20,30,50,65,85,100,115,130,150,175,200,230,255,285,310,335,380,420,460,475,480,520,545,590,625,650,665];
      var gen90ampT2=[15,20,30,55,75,95,115,130,145,170,195,225,260,290,320,350,380,430,475,520,535,555,585,615,665,705,735,750];
      var odd75ampT2=[20,25,35,50,65,85,100,115,130,150,175,200,230,255,285,310,335,380,420,460,475,480,520,545,590,625,650,665];
      var odd90ampT2=[25,30,40,55,75,95,115,130,145,170,195,225,260,290,320,350,380,430,475,520,535,555,585,615,665,705,735,750];
      var awg=['14 awg','12 awg','10 awg','8 awg','6 awg','4 awg','3 awg','2 awg','1 awg','0','00','000','0000','250 Kcmil','300 Kcmil','350 Kcmil','400 Kcmil','500 Kcmil','600 Kcmil','700 Kcmil','750 Kcmil','800 Kcmil','900 Kcmil','1000 Kcmil','1250 Kcmil','1500 Kcmil','1750 Kcmil','2000 Kcmil']
  } else {
      var gen60ampT2=[15,25,35,40,55,65,75,85,100,115,130,150,170,195,210,225,260,285,315,320,330,355,375,405,435,455,470];
      var gen75ampT2=[15,25,40,50,65,75,90,100,120,135,155,180,205,230,250,270,310,340,375,385,395,425,445,485,520,545,560];
      var gen90ampT2=[15,25,45,55,75,85,100,115,135,150,175,205,230,260,280,305,350,385,425,435,445,480,500,545,585,615,630];
      var odd75ampT2=[20,30,40,50,65,75,90,100,120,135,155,180,205,230,250,270,310,340,375,385,395,425,445,485,520,545,560];
      var odd90ampT2=[25,35,45,55,75,85,100,115,135,150,175,205,230,260,280,305,350,385,425,435,445,480,500,545,585,615,630];
      var awg=['12 awg','10 awg','8 awg','6 awg','4 awg','3 awg','2 awg','1 awg','0','00','000','0000','250 Kcmil','300 Kcmil','350 Kcmil','400 Kcmil','500 Kcmil','600 Kcmil','700 Kcmil','750 Kcmil','800 Kcmil','900 Kcmil','1000 Kcmil','1250 Kcmil','1500 Kcmil','1750 Kcmil','2000 Kcmil']
  }
  if (SL == false){
      if (TTTtemp== '90'){
          var lowTemp = gen90ampT2;
      } else if ((TTTtemp== '75' || loadAmps > 100) && insulationTemp != 60 ){
          var lowTemp =gen75ampT2;
      } else {
          var lowTemp = gen60ampT2;
          var TTTtemp = 60;
      }
  } else {
      if (TTTtemp== '90'){
          var lowTemp =odd90ampT2;
      } else if ((TTTtemp== '75'|| loadAmps > 100) && insulationTemp != 60){
          var lowTemp =odd75ampT2;
      } else {
          var lowTemp =gen60ampT2;
          var TTTtemp = 60;
      }
  }
  if (minAMP > Math.max(...lowTemp)){
      do  {
          x++;
          minAMP = ma/(x+1);
      }
      while (minAMP > Math.max(...lowTemp))
  }
  var wireId = lowTemp.findIndex((element) => element >= minAMP);
  var wireAmpacity =lowTemp.find((element) => element >= minAMP);
  var wireSize =awg.at(wireId);
  const wireInfo ={
    size:wireSize,
    ampacity:wireAmpacity,
    tableTemp:TTTtemp
};
  return wireInfo;
}
function getRandomItem(arr) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  const item = arr[randomIndex];
  return item;
}
function overcurrent(amp) {
  this.amp=amp;
  this.T13=[15,20,25,30,35,40,45,50,60,70,80,90,100,110,125,150,175,200,225,250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000,3500,4000,4500,5000,6000,7000];
  this.OverCurrent = this.T13.find((element) => element >= this.amp);
  return this.OverCurrent;
}
