export default function routes(queries){


    async function home(req,res,next){

        res.render("index",{

        });

    }

    
    async function admin(req,res,next){

        res.render("admin",{

        });

    }

    
    async function waiters(req,res,next){

        res.render("waiters",{

        });

    }


    return{
        home,
        admin,
        waiters
    }
}