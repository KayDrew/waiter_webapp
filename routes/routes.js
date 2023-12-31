export default function routes(queries){

let error="";
let loginError="";
let adminError="";
let success="";
let username="";
let password="";
let passRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
let regex = /^([a-zA-Z]{3,})$/;

const days=[{"day":"Monday", id:1},{"day":"Tuesday","id":2},{"day":"Wednsday","id":3},
{"day":"Thursday","id":4},{"day":"Friday","id":5},{"day":"Saturday","id":6},{"day":"Sunday","id":7}];
    	

    async function home(req,res,next){
    
       res.render("index");

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
        
    
  

 }

    
  async function waiters(req,res,next){
	
	let waiterDays=[];
	
	let monChecked=false;
	let tuesChecked=false;
	let wedChecked=false;
	let thurChecked=false;
	let friChecked=false;
	let satChecked=false;
	let sunChecked=false;
	
 waiterDays=await queries.getWaiterDays(username);

for(let i=0;i<waiterDays. length;++i){

let day=waiterDays[i].dayid;

switch(day){
case 1 : 
monChecked=true;
break;

case 2 : 
tuesChecked=true;
break;

case  3: 
wedChecked=true;
break;

case 4 : 
thurChecked=true;
break;

case  5: 
friChecked=true;
break;

case  6: 
satChecked=true;
break;

case  7: 
sunChecked=true;
break;

        }

    
}
	
  req.flash("error",getError());
  req.flash("success",getSuccess());
 
res.render("waiters",{
monChecked,
tuesChecked,
wedChecked,
thurChecked,
friChecked,
satChecked,
sunChecked,
username 
});

success="";
    }
    
    
    function getUser(){

        return username;
   }

  async function postWaiters(req,res,next){

    let days= req.body.day;
    let waiterID=0;
    
      waiterID= await queries.getWaiterID(username);
      
           if(waiterID==null || waiterID==undefined){

                 await queries.recordWaiters(username,password);
                 waiterID=await queries.getWaiterID(username);
             }


    if(days){
	
         if(days.length<3 || days.length>5){
	
             error="Days should be between 3-5";
             success="";
      }

   else{
	
	
	      error="";
	      success="Your shift has been successfully updtaed!";
	
	       await queries.update(waiterID);
	
            for(let i=0;i<days.length;++i){

                      var day=Number(days[i]);
                       await queries.setAdmin(day,waiterID);
 
                 }

       }
 
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

function  waiterNavigate(req,res,next){

req.flash("loginError", loginError);
res.render("login");

}

async function  postLogin(req,res,next){

let input=req.body.username;
let dataPass="";
password=req.body.password;

if(input){
	var trimmed=input.trim();

    var cap = "";
    var low = "";

   for (let i = 0; i < trimmed.length - 1; ++i) {

	cap = trimmed.charAt(0).toUpperCase();
     low += trimmed.charAt(i + 1).toLowerCase();
   }
	
	  username = cap+low;
	

   if(regex.test(username)){

       let waiter= await queries.getWaiter(username);

       if(waiter){
	
	          if(password){
		
	                   dataPass= await queries.getPassword(username);
	
	                    if(dataPass===password){
		                     loginError="";
                              res.redirect("/waiters/"+username);
                       }

                       else{
                         
                           loginError="Your password  is incorrect.";
res.redirect("/waiterNavigate");
                        }
               }

             else{
             
                loginError="Please enter  a password";
	     res.redirect("/waiterNavigate");
             }         
              
      }
	
   else{
  	
        if(password){
  
                if(passRegex.test(password)){
                loginError="";
                 res.redirect("/waiters/"+username);

                 }

               else{
                 loginError="Password  should be at least 6 chars long, include both lower and upper case chars, include  1 number and 1 special char";
                      res.redirect("/waiterNavigate");
                }
       }  
     
     else{

               loginError="Please enter  a password";
                    res.redirect("/waiterNavigate");
        }

   }
 
 }
 
  else{
 
      loginError="Name should only contain  letters."
           res.redirect("/waiterNavigate");
     }

}

else{

           loginError="Please enter your name";
                res.redirect("/waiterNavigate");
}


}



function  adminNavigate(req,res,next){

req.flash("adminError",adminError);

res.render("admin-login");

}





async function adminLogin(req,res,next){

let adminPass= req.body.adminPass;

if(adminPass){
	
	try{

let pass= await  queries.getAdminPassword();

if(pass===adminPass){
	adminError="";
	
 res.redirect("/admin");
}


else{
adminError="You have entered an incorrect password";
res.redirect("/adminNavigate");
}

}catch(err){

console.log(err)
}
	
	

}

else{

adminError="Please enter a password";
res.redirect("/adminNavigate");
}

}


function logout(req,res,next){

res.redirect("/");

}

    return{	
    
        home,
        admin,
        waiters,
        clearSchedule,
        getError,
        postWaiters,
        updateSchedule,
        removeWaiter,
        postLogin,
        waiterNavigate,
        adminNavigate,
        adminLogin,
        logout
        
  
      }
      
    }
