export default function routes(queries){

let error="";
let success="";
let username="";
let regex = /^([a-zA-Z]{3,})$/;

const days=[{"day":"Monday", id:1},{"day":"Tuesday","id":2},{"day":"Wednsday","id":3},
{"day":"Thursday","id":4},{"day":"Friday","id":5},{"day":"Saturday","id":6},{"day":"Sunday","id":7}];
    	

    async function home(req,res,next){
    	
       res.render("index",{

        });

    }

async function admin(req,res,next){
    	
    let monday=[];
    let tuesday=[];
    let wednsday=[];
    let thursday=[];
    let friday=[];
   let saturday=[];
   let sunday=[];
   let names=[];

   let schedule=  await queries.getAdmin();

 if(schedule){
  
   for(let i=0;i<schedule.length;++i){
  	
      var entry=schedule[i];

       if(!names.includes(entry.name)){
	
           names.push(entry.name);
        }

       switch(entry. day){
	
                case "Monday":
                monday.push(entry.name);
                break;

                case "Tuesday":
                tuesday.push(entry.name);
                 break;

                case "Wednsday":
                wednsday.push(entry.name);
                break;

                case "Thursday":
                thursday.push(entry.name);
                break;

               case "Friday":
               friday.push(entry.name);
               break;

               case "Saturday":
               saturday.push(entry.name);
               break;

               case "Sunday":
               sunday.push(entry.name);
               break;
      }

   }

}  
       res.render("admin",{monday,
        tuesday,
       wednsday,
       thursday,
       friday,
       saturday,
       sunday,
       days,
       names 
        });

    }

    
  async function waiters(req,res,next){
	
	username=req.params.username;
    req.flash("error",getError());
    req.flash("success",getSuccess());
 
        res.render("waiters");

    }
    

  async function postWaiters(req,res,next){

    let days= req.body.day;

    if(regex.test(username)){
	
          var waiterName= await queries.getWaiter(username);

           if(waiterName==null || waiterName==undefined){

                 await queries.recordWaiters(username);
             }


    if(days){
	
         if(days.length<3 || days.length>5){
	
             error="Days should be between 3-5";
             success="";
      }

   else{
	
	      var waiterID= await queries.getWaiterID(username);
	      error="";
	      success="Your shift has been successfully updtaed!";
	
	       await queries.update(waiterID);
	
            for(let i=0;i<days.length;++i){

                      var day=Number(days[i]);
                       await queries.setAdmin(day,waiterID);
 
                 }

       }
 
    }
 
 }
 
 
 else{

      error="Not updated.Name should only contain  letters."
   }

    res.redirect("/waiters/"+username);
}


async  function clearSchedule(req,res,next){

   try{
          await queries.reset();
          res.redirect("/admin");
          
    }catch(err){
console.log(err);

   }
}


async  function updateSchedule(req,res,next){

let name=req.body.waiterName;
let dayName1=req.body.fromDay;
let dayName2=req.body.toDay;
let day1=0;
let day2=0;

let waiterID= await queries.getWaiterID(name);
	
 for(let i=0;i<days.length;++i){

var day=days[i];

    if(day.day==dayName1){

           day1=day.id;

       }

    else if(day.day==dayName2){

           day2=day.id;
       }

  }


  try{

          await queries.updateSchedule(waiterID,day1,day2);
          res.redirect("/admin");
          
   }catch(err){

          console.log(err);
    }
}


async function removeWaiter(req,res,next){

let name= req.body.waiterDelete;
let waiterID= await queries.getWaiterID(name);
let dayName=req.body.deleteDay;
let dayID=0;

for(let i=0;i<days.length;++i){

var day=days[i];

    if(day.day==dayName){

           dayID=day.id;

       }
  }     
try{
await queries.deleteWaiter(waiterID,dayID);

}catch(err){

console.log(err);
}

res.redirect("/admin");

}

function getError(){
	
     return error;
}


function getSuccess(){
	
      return success;
}


    return{	
        home,
        admin,
        waiters,
        clearSchedule,
        getError,
        postWaiters,
        updateSchedule,
        removeWaiter
  
      }
      
 }
