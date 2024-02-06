import { Funcs } from "./funcsClass.js";

const funcs = new Funcs();
const {getById, isNil, isEmptyArr, isEmptyObj, makeConfetti, isMovilDevice} = funcs;


class SelectLevelProcess {
    
    constructor(){
    }
    
    showSelectLevel(){
        const titleHtml = ``;
        
    
        Swal.fire({
            title:titleHtml,
            icon: false,
            width: isMovilDevice() === true ? '75%' : '400px',
            html: `
            <section>
                <div id="levelImageContainer" class="d-none">
                    <img src="" width="120" height="120" alt="" class="rounded-circle" id="levelImage">
                    <p class="mb-2 f-18" id="levelText" ></p>
                </div>
    
                <h4>Elige un nivel</h4>
                
                <div class="mt-3" >
                    <button class="btn btn-outline-primary" id="easyLevelBtn"> Fácil  </button>
                    <button class="btn btn-outline-secondary mx-2" id="mediumLevelBtn" > Medio </button>
                    <button class="btn btn-outline-danger" id="dificultLevelBtn"> Difícil </button>
                    
                </div>
            </section>
            `,
    
            backdrop: false, // evita que se cierre al dar click fuera del modal...
    
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            confirmButtonText: ``,
            confirmButtonAriaLabel:'',
            cancelButtonText: ``,
            cancelButtonAriaLabel: ''
          });
    }


    getLevelButtons(){

        const buttons = [
            {
                levelBtn: 'easy',
                img: 'easy-level.jpg',
                msg: '¡Llorón!',
                cardsQty: 10,
                element: getById('easyLevelBtn')
            },
            {
                levelBtn: 'medium',
                img: 'medium-level.jpg',
                msg: '¿Eso es todo?',
                cardsQty: 18,
                element: getById('mediumLevelBtn')
            },
            {
                levelBtn: 'difficult',
                img: 'difficult-level.png',
                msg: '¡Juguemos!',
                cardsQty: 24,
                element: getById('dificultLevelBtn')
            },
        ];
    
        return buttons;
    }

}


export {
    SelectLevelProcess
}