export default function queries(db){

async function create(){

  await  db.none(`CREATE TABLE IF NOT EXISTS days(monday VARCHAR(255),tuesday VARCHAR(255),wednsday VARCHAR(255),
  thursday VARCHAR(255),friday VARCHAR(255),saturday VARCHAR(255),sunday VARCHAR(255));
 `)

 await  db.none(`CREATE TABLE IF NOT EXISTS waiters(name VARCHAR(255);`);

}


async function reset(){

}


{

    create,
    reset
}
}