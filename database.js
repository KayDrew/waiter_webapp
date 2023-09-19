export default function queries(db){

async function recordDays(id,day){

try{
	
	await db.none(`INSERT INTO days(dayID,day) VALUES ($1,$2)`,[id,day]);

 }catch(err){
	
console.log(err);

}

}


async function recordWaiters(waiter){
	
  if(waiter){
	
   try{
	
	  await db.none(`INSERT INTO waiters(waiterID,name) VALUES (DEFAULT,$1)`,waiter);
     }catch(err){
	
     console.log(err);
      }
  }
}


async function getAdmin(){


  try{
	
	  let result=await db.manyOrNone(`SELECT admin.name, days.day FROM admin JOIN days ON admin.dayID=days.dayID`);

	  return result;
  }catch(err){

   console.log(err);
 }

}


async function reset(){

try{
await db.none(`DELETE FROM waiters`);
await db.none(`DELETE FROM admin`);

}catch(err){

console.log(err);
}
}

async function setAdmin(dayID,waiter){

try{

db.none("INSERT INTO admin(dayID,name) VALUES ($1,$2)",[dayID,waiter]);

} catch(err){
	
console.log(err);

}
}

async function update(waiter){

if(waiter){
	
try{
	
	await db.none("DELETE  FROM waiters WHERE name=$1",waiter);
	await db.none("DELETE FROM admin WHERE name=$1",waiter);
	
	
}catch(err){

console.log(err);
}

}

}


async  function  getWaiter(){

		
try{

let result=db.manyOrNone("SELECT name FROM waiters");
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
    getWaiter    
    }
}
