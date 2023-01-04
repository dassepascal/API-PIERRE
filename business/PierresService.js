import db from '../data/database';
/**
 * 
 * @param {*} pierre 
 * @returns 
 */
export const validate = function (pierre) {
    if (!pierre.category) {
        return ({
            success: false,
            message: 'category is required',
        })
    }
    if (!pierre.name) {
        return ({
            success: false,
            message: 'name is required',
        })
    }
    if (!pierre.composition) {
        return ({
            success: false,
            message: 'composition is required',
        })
    }
    if (!pierre.density) {
        return ({
            success: false,
            message: 'density is required',
        })
    }
    if (!pierre.hardness) {
        return ({
            success: false,
            message: 'hardness is required',
        })
    }
    if (!pierre.chakra) {
        return ({
            success: false,
            message: 'category is required',
        })
    }
    if (!pierre.system_cristalin) {
        return ({
            success: false,
            message: 'system_cristalin is required',
        })
    }
    if (!pierre.origin) {
        return ({
            success: false,
            message: 'origin is required',
        })
    }
    if (!pierre.scarcity) {
        return ({
            success: false,
            message: 'scarcity is required',
        })
    }
    if (!pierre.property) {
        return ({
            success: false,
            message: 'property is required',
        })
    }
    if (!pierre.purification) {
        return ({
            success: false,
            message: 'purification is required',
        })
    }

    return {
        success: true,
        message: 'valide',
    }
}
/**
 * function pour creer une pierre
 * @param {*} pierre 
 * @returns 
 */
export const createPierre = function (pierre) {
    const pierreToSave = {
        "id": db.length + 1,
        "category": pierre.category,
        "name": pierre.name,
        "composition": pierre.composition,
        "density": pierre.density,
        "hardness": pierre.hardness,
        "chakra": pierre.chakra,
        "system_cristalin": pierre.system_cristalin,
        "origin": pierre.origin,
        "scarcity": pierre.scarcity,
        "property": pierre.property,
        "purification": pierre.purification,

    }
    db.push(pierreToSave);
    return pierreToSave;
}
/**
 * function qui trouve une pierre
 * @param {*} id 
 * @returns 
 */

export const findPierreById = function (id) {

    const pierreFound = db.find((pierre) => {
        if (pierre.id === id) {

            return pierre;
        }

    })
    return pierreFound;
}
/**
 * function qui met a jour en bdd 
 * @param {*} id 
 * @param {*} newPierre 
 * @returns 
 */

/**
 * function qui delete une pierre en bdd
 * @param {*} id 
 * @returns 
 */

export const deletePierreById = function (id) {
    const pierreFound = db.find((pierre, index) => {
        if (pierre.id === id) {
            db.splice(index, 1)
            return true;


        }

    })
    return pierreFound;
}
/**
 * methode update
 * @param {*} id 
 * @param {*} newAvion 
 * @returns 
 */
export const updatedPierreById = function(id, newPierre) {

    if (!validate(newPierre).success){
        return false;
    }
    // newAvion.id = id;
    // return update(newAvion);
    
    let pierreFound;
    let itemIndex;

    db.map((pierre,index) => {
        if (pierre.id === id) {
            pierreFound = pierre;
            itemIndex = index;
        }
    })
    if (!pierreFound) {
        return false;
    }
    if (!validate(newPierre).success){
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