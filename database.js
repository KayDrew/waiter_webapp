export default function queries(db){


async function recordDays(id,day){

try{
	
	
	
	await db.none(`INSERT INTO days(dayID,day) VALUES ($1,$2)`,[id,day]);
console.log("successfully inserted "+day);


	
}catch(err){
	
console.log(err);

}

}


async function recordWaiters(waiter){

try{
	
	if(waiter){
	
	await db.none(`INSERT INTO waiters(waiterID,name) VALUES (DEFAULT,$1)`,waiter);
console.log("successfully inserted "+waiter);
}

else{
console.log("user undefined");

}
	
}catch(err){
	
console.log(err);

}

}


async function getAdmin(){


try{
	
	let result=await db.manyOrNone(`SELECT * FROM admin`);
	console.log(result);
	
}catch(err){

console.log(err);
}
}


async function reset(){

try{
await db.none(`DELETE FROM waiters`);
console.log("successfully  deleted!");
}catch(err){

console.log(err);
}
}

async function getWaiters(){

try{
	
	let result=await db.manyOrNone(`SELECT * FROM waiters`);
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
    getWaiters
}
}
