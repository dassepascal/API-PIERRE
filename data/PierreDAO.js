import db from '../data/database';
// createPierre
/**
 * 
 * @param {*} pierre 
 */
export const insert  =function(pierre){
    db.push(pierre);
}

/**
 * 
 * @param {*} newPierre 
 * @returns 
 */
export const update = function(newPierre){
    let pierreFound;
    let itemIndex;

    db.map((pierre,index) => {
        if (pierre.id === newPierre.id) {
            pierreFound = pierre;
            itemIndex = index;
        }
    })
    if (!pierreFound) {
        return false;
    }
   
    //merge
    const updatedPierre =
        {
            "id":pierreFound.id,
            "category":newPierre.category || pierreFound.category,
            "name":newPierre.name || pierreFound.name,
            "composition":newPierre.composition || pierreFound.composition,
            "density":newPierre.density || pierreFound.density,
            "hardness":newPierre.hardness || pierreFound.density,
            "chakra":newPierre.chakra || pierreFound.chakra,
            "system_cristalin":newPierre.system_cristalin || pierreFound.system_cristalin,
            "origin":newPierre.origin || pierreFound.origin,
            "scarcity":newPierre.scarcity || pierreFound.scarcity,
            "property":newPierre.property || pierreFound.property,
            "purification":newPierre.purification || pierreFound.purification,
        
        }
       
    ;
    //Mise a jour en bdd
    db.splice(itemIndex, 1,updatedPierre)
    return updatedPierre;
}
// deletePierreById
/**
 * 
 * @param {*} id 
 * @returns 
 */
export const del = function(id) {
    const pierreFound = db.find((pierre, index) => {
        if (pierre.id === id) {
            db.splice(index, 1)
            return true;


        }

    })
    return pierreFound;

}


// obtenir toute la liste
/**
 * 
 * @returns 
 */
export const getAll = function(){
return db;
}
// findPierreById

/**
 * 
 * @param {*} id 
 * @returns 
 */
export const get = function(id){
    const pierreFound = db.find((pierre) => {
        if (pierre.id === id) {

            return pierre;
        }

    })
    return pierreFound;
}