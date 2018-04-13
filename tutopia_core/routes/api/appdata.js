var express = require("express");
var router = express.Router();
var ObjectID = require("mongodb").ObjectID;

function initAppData(db){
  var appdataColl = db.collection('appdata');
  var tutoriaColl = db.collection('tutoria');
  var centroTutoriaColl = db.collection('centroTutoria');

  const tutoriaStr = {
    coding:"",
    name:"",
    description:"",
    content:[],
    by:"",
    tags:[],
    categories:[],
    participants:[],
    participantcount:0,
    status:"planning",
    ubicacion:{}
  };

  const centroTutoriaStr = {
    nombre:"",
    ubicacion:"",
    geoData:{}
  }
  const geoStr =
    {
      type:"Point",
      coordinates:[0,0]
    }

  const geoFilter = {"geoData":{
    "$near":{
      "$geometry":{
        "type":"Point",
        coordinates:[0,0]
      },
      "$maxDistance":1000
    }
  }
}
  // planning, published, unavailable, closed
  router.get('/about', function(req,res,next){
    appdataColl.findOne(
                {"current":true},
                function(err, doc){
                  if(err) return res.json({"error":"Error en la versión de la DB"});
                  if(!doc){
                    appdataColl.insertOne({"version":"0.01","current":true}, function(err, result){
                      if(err) return res.json({"error":"No se pudo crear versión predeterminada"});
                      if(result.insertedCount){
                        return res.json(result.ops[0]);
                      }
                      return res.json({"error":"No hay Version de Documento"});
                    }); // end insert
                  }else{
                    return res.json(doc);
                  }
                }
          ); // end FindOne
  }); // end about /get

  router.get('/tutoria/all', function(req,res,next){
    tutoriaColl.find({}).toArray(function(err,tuts){
      if(err){
        return res.status(500).json({"error":"Algo Sucedio"});
      }
      return res.status(200).json(tuts);
    });
  })

  router.post('/tutoria/new', function(req,res,next){
        var newTutoria = Object.assign({},tutoriaStr, req.body);
        var newGeodata = Object.assign({}, geoStr,{coordinates:[req.body.longitud, req.body.latitud]});
        newTutoria.ubicacion = newGeodata;
        // Validara newTutoria
        tutoriaColl.insertOne(newTutoria, function(err, rsult){
          if(err){
            console.log(err);
            return res.status(500).json({"error":"No se pudo ingresar tutoría"});
          }
          return res.status(200).json(rsult.ops[0]);
        });// end inserOne
  }); //end new

  router.put('/tutoria/:tutoria_id/addtag', function(req,res,next){
    var TutoriaID = ObjectID(req.params.tutoria_id);
    var newTag = req.body.tag || "";
    var filter = {"_id":TutoriaID};
    var update = {"$push":{"tags":newTag}};
    tutoriaColl.updateOne(filter,update, function(err,rslt){
      if(err){
        console.log(err);
        return res.status(500).json({"error":"No se pudo Actualiza Documento"});
      }
      res.status(200).json({"docsAffected":rslt.modifiedCount});
    })
  });//end  addtag

  router.delete('/tutoria/:tutoria_id/delete', function(req,res,next){
    var TutoriaID = ObjectID(req.params.tutoria_id);
    var filter = {"_id":TutoriaID};
    tutoriaColl.findOneAndDelete(filter, function(err,rslt){
      if(err){
        console.log(err);
        return res.status(500).json({"error":"No se pudo Eliminar el Documento"});
      }
      res.status(200).json({"docRemoved":rslt.value});
    })
  });

  // Centro de las Tutoria
  router.post('/centro/new', function(req,res,next){
    var newCentro = Object.assign({},centroTutoriaStr);
    newCentro.nombre = req.body.nombre ||"";
    newCentro.ubicacion = req.body.ubicacion || "";
    newCentro.geoData = Object.assign({}, geoStr, {"coordinates":[parseFloat(req.body.latitud) , parseFloat(req.body.longitud)]});
    centroTutoriaColl.insertOne(newCentro, function(err, rslt){
      if(err){
        console.log(err);
        return res.status(500).json({"error":"No se pudo guardar centro"});
      }
      return res.status(200).json(rslt.ops[0]);
    });
  }); // end centro new

router.post('/centro/near', function(req,res,next){
    var latitud = parseFloat(req.body.latitud);
    var longitud = parseFloat(req.body.longitud);
    var filter = Object.assign({}, geoFilter);
    filter.geoData["$near"]["$geometry"].coordinates = [latitud,longitud];
    filter.geoData["$near"]["$maxDistance"] = parseFloat(req.body.km || 1) * 1000;

    centroTutoriaColl.find(filter).toArray(function(err, centros){
      if(err){
        console.log(err);
        return res.status(500).json({"error":"Error al buscar centros"});
      }
      return res.status(200).json(centros);
    });

    /*
    "$geoNear":{
      "$geometry":{
        "type":"Point",
        coordinates:[0,0]
      },
      "$maxDistance":1000
    }
    */
});
  return router;
}

module.exports = initAppData;
