export default function queries(db){


async function recordDays(id,day){

     try{
	
	       await db.none(`INSERT INTO days(dayID,day) VALUES ($1,$2)`,[id,day]);

     }catch(err){
	
          console.log(err);

}

}


async function recordWaiters(waiter,password){
	
   try{
	
	  await db.none(`INSERT INTO waiters(waiterID,name,password) VALUES (DEFAULT,$1,$2)`,[waiter,password]);
    }catch(err){
	
     console.log(err);
      }
  
}


async function getAdmin(){

  try{
	
	  let result=await db.manyOrNone(`SELECT waiters.name, days.day FROM admin JOIN days ON admin.dayID=days.dayID JOIN  waiters on admin.waiterID =waiters.waiterID `);
	  return result;
	
  }catch(err){

   console.log(err);
 }

}


async function reset(){

  try{

      await db.none(`DELETE FROM admin`);

   }catch(err){

      console.log(err);
   }
}

 async function setAdmin(dayID,waiterID){

    try{

         await db.none("INSERT INTO admin(dayID,waiterID) VALUES ($1,$2)",[dayID,waiterID]);

    } catch(err){
	
        console.log(err);

    }
}

async function update(waiterID){

	
   try{
	
	     await db.none("DELETE FROM admin WHERE waiterID=$1",waiterID);
	
   }catch(err){

        console.log(err);
 }

}


async function getWaiter(waiter){
	
  try{

         let result=await db.oneOrNone("SELECT name FROM waiters WHERE name=$1",waiter);
          return result;

    }catch(err){
	
             console.log(err);

     }

 }

async function getWaiterDays(name){

if(name){

try{

let result= await  db.manyOrNone("SELECT dayID FROM admin JOIN waiters ON admin.waiterID = waiters.waiterID WHERE name =$1",name);

return result;

}catch(err){

console.log(err);
}

}
}


async function updateSchedule(waiterID,day1,day2){
	
try{

await db.none("DELETE FROM admin WHERE waiterID=$1 AND dayID=$2",[waiterID,day1]);
console.log("successfully  deleted ");
await db.none("INSERT INTO admin(dayID,waiterID) VALUES ($1,$2)",[day2,waiterID]);

}catch(err){
	
console.log(err);

}

}


async function deleteWaiter(waiterID,dayID){

try{

await db.none("DELETE FROM admin WHERE waiterID=$1 AND dayID=$2",[waiterID,dayID]);


}catch(err){

console.log(err);
}

}

async function getWaiterID(name){

try{

     let result=await db.oneOrNone("SELECT waiterID FROM waiters WHERE name=$1",name);
     let waiterID=result.waiterid;
      return  waiterID;
      
   }catch(err){
       console.log(err);
  }

}

async function getDays(waiterID){

  try{
  	
   let result=await db.manyOrNone("SELECT dayID FROM admin WHERE waiterID=$1",waiterID);
    return result;
    
  }catch(err){

     console.log(err);
  }
}


async  function getPassword(waiter){

try{
	
  let pass=await  db.oneOrNone("SELECT password  FROM waiters WHERE name=$1",waiter);
 let result= pass.password 
return result;
 

 }catch(err){

console.log(err);
}

}

async  function getAdminPassword(){

try{
	
  let pass=await  db.oneOrNone("SELECT password  FROM waiters WHERE name=$1","Admin");
 let result= pass.password ;
 console.log(result);
return result;
 

 }catch(err){

console.log(err);
}

}



return{
    reset,
    recordDays,
    recordWaiters,
    getAdmin,
    update,
    setAdmin,
    getWaiter,
   updateSchedule ,
   getWaiterID,
   deleteWaiter,
   getDays,
   getWaiterDays,
   getPassword,
   getAdminPassword
     }
}
