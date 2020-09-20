/*
some info
using gregorian calendar
https://docs.microsoft.com/en-us/office/troubleshoot/excel/determine-a-leap-year

? possible versions
1 period is withing twelve consecutive months of any given year
2 period extends to next year
3 period can span multiple years
.. ?5 include hours and minutes and seconds

..it should also not allow inputs besides numbers suitable for a date
*/

/*
possible methods
2 pull the leap stuff from 
*/

const express = require('express');
const app = express();

const Database = require("@replit/database")

const parser = require('body-parser')

app.use(parser.urlencoded({extended:false}))
app.use(parser.json())



app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
});


  

/*
pass the dates

by post req.body using a form
  {
    dayS:
    monthS:
    dayE:
    monthE:
    yearS:
    yearE:
  }
*/

app.post("/date", function(req, res){
  // "method" 1 :p
    // maybe i dont need arrays , just the day count


  // make these cont ?
  let monthS = Number(req.body.monthS)
  let monthE = Number(req.body.monthE)
  let dayS = Number(req.body.dayS)
  let dayE = Number(req.body.dayE)
  let yearS = Number(req.body.yearE)
  let yearE = Number(req.body.yearS)
  

  // make these const?
  let january = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  let february1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
  let february2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]

  let march = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  let april = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  let may = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  let june = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  let july = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  let august = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  let september = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  let october = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  let november = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  let december = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  
  
  function February(y) {
    
    if ( y % 4 == 0 ) {

      if ( y % 100 == 0 ) {
        if ( y % 400 == 0 ) {
          // leap year
          return [...february2]
        } else {
          // not a leap year
          return [...february1]
        }
      
      } else {
        return [...february2]
      }

    } else {
      return [...february1]
    }
 
  }



for (let j = yearS; j <= yearE; j++) {

    // make const ?
    let names = {
      1: january,
      2: February(j),
      3: march,
      4: april,
      5: may,
      6: june,
      7: july,
      8: august,
      9: september,
      10: october,
      11: november,
      12: december
    }

    console.log(j["2"])
  
/*
    let sum = 0

    console.log("sum="+sum+"dayS="+dayS+"dayE="+dayE)
  
    for ( i = monthS; i <= monthE; i++ ) {
      let test1 = 0
      test1 = names[i].length

    
    //for a next version :
    //if (yearS == yearE) {
    //the if(){} code below this comment
    //} else if (yearS != yearE) {}
    
      if ( monthS != monthE ) {     // if period covers multiple months

      //also swap monthS and monthE if monthS > monthE
      

      
        if ( i == monthS ) {   // if current index is starting month
          let lastDay = 0
          lastDay = names[monthS].length    //last day of starting month
          sum += lastDay - dayS
          console.log("i="+i+"monthS="+monthS+"names[monthS].length="+names[monthS].length)
          console.log("sum="+sum)

        } else if ( i>monthS && i<monthE ) {   // if current index is a middle month
          let days = 0
          days = names[i].length
          sum += days
          console.log("i="+i+"names[i].length="+names[i].length)
          console.log("sum="+sum)

        } else if ( i == monthE ) {   // if current index is the end month
          //let startDay = names[monthS][0]  //start day ot ending month
          sum += dayE
          console.log("i="+i)
          console.log("sum"+sum)

        } // else    some monstrous error 


      } else if ( monthS == monthE ) {   // it's all in one calendar month
      // swap dayS and dayE if dayS>dayE
      //  ? Math.abs(dayE - dayS)
        sum = dayE - dayS
        console.log("sum=" + sum )
      } 
    
    

    }
    */

  }


  //console.log(year)

  res.json({
    "req.body":{
      dayS:dayS,
      monthS:monthS,
      dayE:dayE,
      monthE:monthE,
      //year:req.body.year
    },
    //"sum": sum

  })


})




app.listen(3000, () => {
  console.log('server started');
});


const db = new Database()


db.set("january", "31").then(() => {});


db.list().then(keys => {
  //console.log(keys)  
});




