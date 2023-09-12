import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import flash from 'express-flash';
import session from 'express-session';
import pkg from 'pg-promise';
import dbQueries from './database.js';
import route from './routes/routes.js';

const app = express();

app.use(express.static('public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.static('images'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use(session({
  secret: "no secret",
  resave: false,
  saveInitialized: false
}));

app.use(flash());

const connectionString=process.env.URL;
const Pool= pkg();
const db=Pool ({connectionString ,
ssl: true 
});
const queries = dbQueries(db);
const routes= route(queries);


app.get("/",routes.home);
app.all("/admin",routes.admin);
app.get("/waiters/:username",routes.waiters);
app.post("/waiters",routes.postWaiters);
app.post("/clear", routes.clearSchedule);



const PORT= process.env.PORT||5432;

app.listen(PORT,function(){
    console.log("App starting on port "+PORT);
});
