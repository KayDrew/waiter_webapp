export default function routes(queries){

let error="";
let success="";
let username="";
let regex = /^([a-zA-Z]{3,})$/;


    async function home(req,res,next){
   
       res.render("index",{

        });

    }

    async function admin(req,res,next){
    	
 let few=false;
 let monday=[];
let tuesday=[];
let wednsday=[];
let thursday=[];
let friday=[];
let saturday=[];
let sunday=[];
    	
let schedule=  await queries.getAdmin();
  
  for(let i=0;i<schedule.length;++i){
var entry=schedule[i];

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

if(monday.length<3){

few=true;
}

}  


        res.render("admin",{monday,
        tuesday,
        wednsday,
        thursday,
       friday,
      saturday,
       sunday 
        });

    }

    
async function waiters(req,res,next){
	
	username=req.params.username;
 req.flash("error",getError());
 req.flash("success",getSuccess());
 
        res.render("waiters",{
        });

    }
    

async function postWaiters(req,res,next){

let days= req.body.day;


if(regex.test(username)){

if(days){
	

if(days.length<5){
	
error="Please  select at least 5 days";
success="";
}

else{
	
	error="";
	success="Your shift has been successfully updtaed!";
	
	await queries.update(username);
	for(let i=0;i<days.length;++i){

var day=Number(days[i]);
 
 await queries.setAdmin(day,username);
 
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
        postWaiters 
    }
	}
