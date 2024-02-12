import { Funcs } from "./funcsClass.js";

const funcs = new Funcs();
const {getById, isNil, isEmptyArr, isEmptyObj, makeConfetti, isMovilDevice} = funcs;


class LevelProcess {
    
    constructor(){
    }
    
    showSelectLevel(){
        const titleHtml = ``;
        
    
        Swal.fire({
            title:titleHtml,
            icon: false,
            width: isMovilDevice() === true ? '65%' : '300px',
            html: `
            <section>
                <div id="levelImageContainer" class="d-none">
                    <img src="" width="120" height="120" alt="" class="rounded-circle" id="levelImage">
                    <p class="mb-2 f-18" id="levelText" ></p>
                </div>
    
                <h4>
                <i class="fas fa-hand-pointer mr-2"></i>
                Elige un nivel</h4>
                
                <div class="mt-1" >
                    <button class="btn btn-outline-primary mt-2" id="easyLevelBtn">
                    <i class="fas fa-face-grin-beam-sweat mr-2"></i>
                     Fácil  </button>
                    <button class="btn btn-outline-secondary mx-2 mt-2" id="mediumLevelBtn" > 
                    <i class="fas fa-face-smile-wink mr-2"></i>
                    Medio </button>
                    <button class="btn btn-outline-danger mt-2" id="dificultLevelBtn"> 
                    <i class="fas fa-face-grin-stars mr-2"></i>
                    Difícil </button>
                    
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
    LevelProcess
}