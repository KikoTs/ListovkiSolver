  var correctArr = []
  function copy(input) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(input).then(() => {
        console.log('Copied to clipboard successfully.');
      }, (err) => {
        console.log('Failed to copy the text to clipboard.', err);
      });
    } else if (window.clipboardData) {
      window.clipboardData.setData("Text", input);
    }
  }
  function itemsProcessed(){
      fetch('./questions.json').then(res => res.json().then(questionsData => {
        getListovka(questionsData)
        copy(`document.querySelectorAll("#leftContent > div > p > a").forEach(e=>{e.click(),document.querySelector("#centerContent > div > div.content > div > div > abbr:nth-child(1) > a").click()}),document.querySelector("#rightContent > div.h16 > a:nth-child(1) > p").click(),document.querySelector("body > div > div.popUpWrp.info > div > div.content > a > p").click();`)
      }))
    }
async function getListovka(correctAns){
  var request = new XMLHttpRequest();
  request.open("POST", "./izpit.php?id=" + document.querySelector('#id').value);
  request.send();
  request.onload = function() {
    // console.log(listovkaId)
    console.log(this.responseText)
    let parsedListovka = JSON.parse(this.responseText)
    let id = parsedListovka.testSet.id
    let tempArrHolder = {"id": 0,
                        'questions': {'questions': []}}
    parsedListovka.testSet.questions.forEach((vupros) => {
      ansArr = []
      vupros.answers.forEach(otgovor => {
        ansObj = {
          "id": otgovor.id,
          "checked": correctAns[vupros.id].includes(otgovor.id) ? true : false
        }
        ansArr.push(ansObj)
      })
      let obj = {
        "id": vupros.id,
         "answers": ansArr
      }
      tempArrHolder.questions.questions.push(obj)
      tempArrHolder.id = id
    })
    readySend(tempArrHolder)
  };
}
async function readySend(tempArrHolder){
var request = new XMLHttpRequest();
request.open("POST", "./predai.php");
request.send(JSON.stringify(tempArrHolder));
request.onload = function() {
  console.log(this.responseText)
  let parsedOtgovori = JSON.parse(this.responseText)
  // console.log(parsedOtgovori)
};
}

