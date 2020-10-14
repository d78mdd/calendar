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


/*
possible inputs:
  {
    dayS:
    monthS:
    dayE:
    monthE:
    yearS:
    yearE:
  }
  
  {
    dayS:
    monthS:
    dayE:
    monthE:
    yearS:
    yearE:
  }
  
  {
    dayS:
    monthS:
    dayE:
    monthE:
    yearS:
    yearE:
  }
  
  {
    dayS:
    monthS:
    dayE:
    monthE:
    yearS:
    yearE:
  }
  
  {
    dayS:
    monthS:
    dayE:
    monthE:
    yearS:
    yearE:
  }
  
  {
    dayS:
    monthS:
    dayE:
    monthE:
    yearS:
    yearE:
  }
  
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



  // filter input
  let monthS = Number(req.body.monthS)
  let monthE = Number(req.body.monthE)
  let dayS = Number(req.body.dayS)
  let dayE = Number(req.body.dayE)
  let yearS = Number(req.body.yearS)
  let yearE = Number(req.body.yearE)
  // make these const ?


  // in case of empty input req.body.[...] becomes empty string and the local vars become zeroes
  // the empty string is a falsy value, the zero - too
  //they should have default values



// defaults
  if ( !yearS ) {
    if ( !yearE ) {
      yearS = current.y
    } else {
      yearS = yearE
    }
  }
  if ( !yearE ) {
    if ( !yearS ) {
      yearE = current.y
    } else {
      yearE = yearS
    }
  }
  if ( !monthS ) monthS = 1
  if ( !monthE ) monthE = 12
  if ( !dayS ) dayS = 0
 
 
  if ( !dayE ) {
    if ( monthE == 2 ) {
      dayE = February(yearE).length  //29 or 28     
    } else if (monthE==4 || monthE==6 || monthE==9 || monthE==11) {
      dayE = 30
    } else {
      dayE = 31
    }
  }
 
 





//hold user input
  let date = {
    current: current,
    start: {
      d: dayS,
      m: monthS,
      y: yearS
    },
    end: {
      d: dayE,
      m: monthE,
      y: yearE
    }
  }


  


//console.log(req.body)
console.log(date)

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



server started
{
  current: { d: 14, m: 10, y: 2020 },
  start: { d: 0, m: 1, y: 2020 },
  end: { d: 31, m: 12, y: 2020 }
}
