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

// month-days "templates"
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
  let months = {
    1: january,
    2: null,
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
  // make these const?
    

// leapness check
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

 

// get current date
  let current = {
    d: (new Date).getDate(),
    m: (new Date).getMonth()+1,
    y: (new Date).getFullYear()
  }



  // filter any letters, symbols, leading zeroes
  let monthS = Number(req.body.monthS)
  let monthE = Number(req.body.monthE)
  let dayS = Number(req.body.dayS)
  let dayE = Number(req.body.dayE)
  let yearS = Number(req.body.yearS)
  let yearE = Number(req.body.yearE)
  // in case of empty input req.body.[...] becomes empty string and the local vars become zeroes
  // the empty string is a falsy value, the zero - too

  //, negative numbers and excessively large months
  if ( monthS < 0 || monthS > 12 )  monthS = 0
  if ( monthE < 0 || monthE > 12 )  monthE = 0
  if ( dayS < 0 )  dayS = 0
  if ( dayE < 0 )  dayE = 0

 //, excessively large days
  let monthSLen
  if ( monthS == 2 ) {
    monthSLen = February(yearS).length  //29 or 28     
  } else if (monthS==4 || monthS==6 || monthS==9 || monthS==11) {
    monthSLen = 30
  } else {
    monthSLen = 31
  }
  let monthELen
  if ( monthE == 2 ) {
    monthELen = February(yearE).length  //29 or 28     
  } else if (monthE==4 || monthE==6 || monthE==9 || monthE==11) {
    monthELen = 30
  } else {
    monthELen = 31
  }

  if ( dayS > monthSLen ) {
    dayS = 0
  }
  if (dayE > monthELen ) {
    dayE = 0
  }





  //initial dates objects
  let start = {
      d: dayS,
      m: monthS,
      y: yearS
  }
  let end = {
      d: dayE,
      m: monthE,
      y: yearE
  }


  function swap(){
    let temp = {}
    temp = start
    start = end
    end = temp
    temp = null
  }







// defaults/normalize + swap if second date appears smaller
  if ( !start.y ) {
    if ( !end.y ) {
      start.y = current.y
    } else {
      start.y = end.y
    }
  }
  if ( !end.y ) {
    if ( !start.y ) {
      end.y = current.y
    } else {
      end.y = start.y
    }
  }
  // swap 
  if (start.y > end.y){
    swap()
  }

  //default
  if ( !start.m ) start.m = 1
  if ( !end.m ) end.m = 12
  //swap
  if (start.m > end.m  &&  start.y == end.y) {
    swap()
  }
 
 //default
  if ( !start.d ) start.d = 1
  if ( !end.d ) {
    if ( end.m == 2 ) {
      end.d = February(end.y).length  //29 or 28     
    } else if (end.m==4 || end.m==6 || end.m==9 || end.m==11) {
      end.d = 30
    } else {
      end.d = 31
    }
  }
  // swap
  if (start.d > end.d  &&  start.m == end.m  &&  start.y == end.y){
    swap()
  }



 
  







  //hold user input
  let date = {
    current: current,
    start: start,
    end: end
  }




   
  console.log(start, end)


  
  

  for (let j = yearS; j <= yearE; j++) {

    // make const ?
    let months = {
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

    //console.log(months["2"])
  
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
      yearS:yearS,
      yearE:yearE
    }
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


