import express from 'express';
import db from './data/database';
import bodyParser from 'body-parser';
import { validate, createPierre, findPierreById, deletePierreById, updatedPierreById} from './business/PierresService';


const app = express();

// GET method route def du endpoint
// app.get('/', function (req, res) {
//     res.send('hello world ');
//   });

//function fleche
// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//But du Jeu
// creer CRUD API
//1 GET /api/v1/pierres
//2 POST/api/v1/pierres/1
//3 GET /api/v1/pierres/1

//4 PUT /api/v1/pierres/1
//5 DELETYE /api/pierres/1

//1 GETALL 
//recuperer toutes les données pierres
//definir un ENDPONIT /api/v1/pierres
// traitement  requete : rien
// retour : retourner les donnees avec un code HTTP 200
// RETOUR code HTTP 400 si error
// il faut lui indiquer le port ecoute

//1 get
app.get('/api/v1/pierres', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'pierres récupéré avec succés',
    pierres: db,
  });
});
//2 CREATE
//creer le ENDPOINT
//REOURNER CODE 40 SI ERREUR
//Récuperer les données de la requete
//valider les donnees 
//inserer en bdd la pierre
// retour un code

// old create

app.post('/api/v1/pierres', (req, res) => {
  console.log('req', req.body.name)

  const pierre = req.body;
  const valid = validate(pierre);

  // validation
  if (!valid.success) {
    //return code 400
    res.status(400).send(valid);
    console.log('400');
  }
  //inserer en bdd
  const pierreToSave = createPierre(pierre)
  //code retour
  res.status(200).send({
    success: true,
    message: 'pierre ajouté avec succés',
    pierre: pierreToSave
  });
});

//3 getbyId
//  creer endpoint avec PATH PARAM /api/v1/pierres/:id
//coder fonction findPierreById(id)
app.get('/api/v1/pierres/:id', (req, res) => {
  console.log('req',req.params.id)
  const id = parseInt(req.params.id, 10)
  const pierre = findPierreById(id);
  console.log(pierre);
  if (pierre) {
    res.status(200).send({
      success: true,
      message: 'pierre récupéré avec succés',
       pierre,
    });
  } else {
    res.status(404).send({
      success: false,
      message: 'pierre not found',
      pierre
    })
  }

});



//delete

app.delete('/api/v1/pierres/:id',(req,res)=>{
const id = parseInt(req.params.id, 10);
const pierre =deletePierreById(id)
if (pierre) {
  res.status(200).send({
    success: true,
    message: 'pierre supprimé avec succés',
     
  });
} else {
  res.status(404).send({
    success: false,
    message: 'pierre not found',
    
  })
}
})

//update
//6 UPDATE
//1 recuperer objet avion de la req
// valider les donnée entrée
//2 updateAvionById(id, avion)
//3 gestion code error

app.put('/api/v1/pierres/:id', (req,res) => {
  const id = parseInt(req.params.id, 10);
  const newPierre = req.body;
  const pierre = updatedPierreById(id, newPierre);
  if (pierre) {
      res.status(200).send({
          success:true,
          message:'pierre mis a jour avec succés',
      });
  } else {
      res.status(404).send({
          success:false,
          message:'pierre not found',
      });
  }
  
})



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`serveur demarré sur le port ${PORT}`),
    console.log(`http://localhost:${PORT}`);
})