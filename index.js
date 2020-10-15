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


  // ---Start Normalizing---

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





// defaults + swap if second date appears smaller
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

 // --- End Normalizing---



  //hold user input
  let date = {
    //current: current,
    start: start,
    end: end
  }
   
  console.log(date)



 // ---Start Adding---


  let sum = 0

  for (let year=start.y; year<=end.y; year++) {

    if (start.y != end.y) {

      if (year == start.y) {

        sum+=addMonths( start.m, 12 ,year)
      
      } else if (year > start.y  &&  year < end.y) {

        sum+= addYear( year )

      } else if (year == end.y) {

        sum+=addMonths( 1, end.m , year)
      }

    } else if ( start.y == end.y ) {

      sum+= addMonths ( start.m, end.m , year )
    
    } /* else 
      some monstrous error*/

  }

  function addMonth (m, s_y,e) {     // a month to add given    1. start and end days or  2. current year
   // either s_y is start day and e is end day  or
   // s_y is year and e is not present
    let monthTotal = 0

    let months = {
      1: january,
      2: February(s_y),
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
  
    if ( !e ) {      // if only 2 params are present then add the whole month  (2nd param would be year)
      monthTotal = months(m)
      return monthTotal
    }

    monthTotal = e - s_y
  
    return monthTotal  
  }

  function addMonths(s,e, year) {   // months to add given a start and an end ones; from the start or end year
    let subsum = 0
    let sDay
    let eDay

    for ( let j=s; j<=e; j++) {

      if (start.m != end.m  &&  start.y != end.y) {
      
        if (j == start.m  && year == start.y) {     // first month of start year
          sDay = start.d
          if ( j == 2 ) {
            eDay = February(year).length  //29 or 28     
          } else if (j==4 || j==6 || j==9 || j==11) {
            eDay = 30
          } else {
            eDay = 31
          }
          subsum+= addMonth(j,sDay,eDay)
        } else if (j == end.m  && year == end.y) {     // last month of end year
          //sDay = 1
          sDay = 0        // because we have to count the difference between eDay and the last month's last day , not this month's first
          eDay = end.d
          subsum+= addMonth(j, sDay,eDay)
        } else {                   // some month after the first one of start year  or  some month from end year before the end month
          subsum+= addMonth(j, year)
        }
      
      } else if (start.m==end.m  &&  start.y==end.y) {

        sDay = start.d
        eDay = end.d
        subsum+= addMonth (j,sDay,eDay)
      }
                
    }

    return subsum
  }

  function addYear (year) {    // an entire year to add (not the first, not the last)

    let leap = February(year)==29
    let yearTotal

    if ( leap ) {
      yearTotal = 366
    } else {
      yearTotal = 365
    }

    return yearTotal
  }


 // ---End Adding---


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
    "sum": sum

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


