export default function queries(db){

async function create(){

try{
	
	
	//let result=await db.manyOrNone("\dt");
	//db.none("DROP TABLE  admin");
db.none("CREATE TABLE admin(dayID INT,name VARCHAR(255), FOREIGN KEY(dayID) REFERENCES days(dayID))");

console.log("created");

}catch(err){

console.log(err);
}

}
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
	
	let result=await db.manyOrNone(`SELECT admin.name, days.day FROM admin JOIN days ON admin.dayID=days.dayID`);
	console.log(result);
	
	return result;
}catch(err){

console.log(err);
}

}


async function reset(){

try{
await db.none(`DELETE FROM waiters`);
await db.none(`DELETE FROM admin`);
console.log("successfully  deleted!");
}catch(err){

console.log(err);
}
}

async function setAdmin(dayID,waiter){

try{

db.none("INSERT INTO admin(dayID,name) VALUES ($1,$2)",[dayID,waiter]);

console.log("waiterID:" + waiter+" and day: "+dayID+" inserted");


} catch(err){
console.log(err);

}
}

async function update(waiter){

if(waiter){
	
try{
	
	await db.none("DELETE  FROM waiters WHERE name=$1",waiter);
	await db.none("DELETE FROM admin WHERE name=$1",waiter);
	console.log("updated");
	
}catch(err){

console.log(err);
}

}

}



return{
create,
    reset,
    recordDays,
    recordWaiters,
    getAdmin,
    update,
    setAdmin,
    
}
	}
