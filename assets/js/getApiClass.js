import { Funcs } from "./funcsClass.js";

const funcs = new Funcs();
const {getById, isNil, isEmptyArr, isEmptyObj, makeConfetti, isMovilDevice} = funcs;


class GetApiClass {

    constructor() {
        
    }

    async getCharacters (charactersQty = []) {

        if (isNil(charactersQty) === true || charactersQty == 0) {
            Swal.fire({
                title: "Oh no!",
                text: "Ah ocurrido un error al extraer a los personajes!!",
                icon: "error"
              });

              return;
        }
        
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${charactersQty.toString()}`);
        const data = this.cleanData(response);
        return data;
    }


    cleanData (response = null) {
        if(isNil(response) === true) {
            return null;
        }

        if (isNil(response?.data) === false) {
            return response.data
        }

    }


}

export {
    GetApiClass
}