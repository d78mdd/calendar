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
    year:
  }
*/

app.post("/date", function(req, res){
  // "method" 1 :p
    // maybe i dont need arrays , just the day count

  let january = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  let february1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
  let february2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
  let february = []
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
  
  
  
/*
To determine whether a year is a leap year, follow these steps:

1. If the year is evenly divisible by 4, go to step 2. Otherwise, go to step 5.
2. If the year is evenly divisible by 100, go to step 3. Otherwise, go to step 4.
3. If the year is evenly divisible by 400, go to step 4. Otherwise, go to step 5.
4. The year is a leap year (it has 366 days).
5. The year is not a leap year (it has 365 days).

do we really need step 2 ?
*/
  
  if ( req.body.year % 4 == 0 ) {

    if ( req.body.year % 100 == 0 ) {
      if ( req.body.year % 400 == 0 ) {
        // leap year
        february = [...february2]
      } else {
        // not a leap year
        february = [...february1]
      }
    
    } else {
      february = [...february2]
    }

  } else {
    february = [...february1]
  }

  let names = {
    1: january,
    2: february,
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
 
  let all_days = [january, february, march, april, may, june, july, august, september, october, november, december]


  let monthS = Number(req.body.monthS)
  let monthE = Number(req.body.monthE)
  let dayS = Number(req.body.dayS)
  let dayE = Number(req.body.dayE)
  // ?? let year = blablalbal ?
  // and move all up ?
  
  let sum = 0

  console.log("sum="+sum+"dayS="+dayS+"dayE="+dayE)
 
  for ( i = monthS; i <= monthE; i++ ) {
    let test1 = 0
    test1 = names[i].length

    if ( monthS != monthE ) {     // if period covers multiple months

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

      } /* else    some monstrous error */


    } /* else   // it's all in one calendar month */
   
    
    

  }



  //console.log(year)

  res.json({
    //d1:req.body.dayS,
    //allDays: all_days
    "req.body":{
      dayS:dayS,
      monthS:monthS,
      dayE:dayE,
      monthE:monthE,
      year:req.body.year
    },
    "sum": sum
    //year:req.body.year
    /*...*/
  })
  // the end result shall be just a number of days
  // like 364 or 3 or 47
})




app.listen(3000, () => {
  console.log('server started');
});


const db = new Database()


db.set("january", "31").then(() => {});


db.list().then(keys => {
  //console.log(keys)  
});




