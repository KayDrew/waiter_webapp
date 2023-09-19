import 'dotenv/config';
import assert from 'assert';
import database from '../database.js';
import pkg from 'pg-promise';
const connectionString = process.env.URL;
const Pool = pkg();

const db = Pool({
    connectionString,
    ssl: true
});

let query= database(db)

describe('The waiter web app',async function(){
	
beforeEach(async function () {
	
    try {
        	
       await query.reset();
       
           }catch(err){

         console.log(err);
}
        
}  );
      
   

 it('should return the total number of the waiters in the database', async function(){
 	
 let waiters= await query.getAdmin();
       assert.equal(0,waiters.length);
});


 it('should return the data of waiters who submitted their schedule', async function(){
 	
 await query.setAdmin(1,"Kabelo");

 let waiters= await query.getAdmin();
 
 let testWaiters=[{"name": "Kabelo", "day": "Monday"},
]
       assert.equal(JSON.stringify(testWaiters),JSON.stringify(waiters));
});



 it('should return the data of waiters in the waiters table', async function(){
 	
 await query.recordWaiters("Kabelo");

 let waiter= await query.getWaiter();
 
 let testWaiters=[{"name": "Kabelo"},
]
       assert.equal(JSON.stringify(testWaiters),JSON.stringify(waiter));
});


 it('should clear the data of waiters in the waiters table', async function(){
 	
 await query.recordWaiters("Kabelo");
await query.update("Kabelo");

 let waiter= await query.getWaiter();
 
    assert.equal(0,waiter.length);
});

after(function () {
        db.$pool.end;
    });

});
