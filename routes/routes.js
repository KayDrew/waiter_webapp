export default function routes(queries){


    async function home(req,res,next){
    

    
       res.render("index",{

        });

    }

    
    async function admin(req,res,next){
  await queries.getWaiters();
        res.render("admin",{

        });

    }

    
    async function waiters(req,res,next){
    	
let username= req.params.username;

 await queries.recordWaiters(username);
 
        res.render("waiters",{

        });

    }

async  function clearSchedule(req,res,next){

try{
await queries.reset();
res.redirect("/admin");
}catch(err){

console.log(err);
}
}

    return{
        home,
        admin,
        waiters,
        clearSchedule
    }
                           }
