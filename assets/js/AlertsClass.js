import { Funcs } from "./funcsClass.js";

const fc = new Funcs();

const {isNil, isMovilDevice} = fc;

class AlertsClass{
    constructor(){}

    simpleAlertHTML (props = {}) {
        const imgLevel = isNil(props?.imgName) === false ? `./assets/img/${props.imgName}` :  './assets/img/portal.png';

        Swal.fire({
            title: isNil(props?.title) === false ? props.title : '',
            icon: isNil(props?.icon) === false ? props.icon : false,
            width: isMovilDevice() === true ? '65%' : '400px',
            html: `
            <section>
                <div id="" class="">
                    <img src=${imgLevel} width="120" height="120" alt="" class="rounded" id="">
                </div>
    
                <div class="mt-3" >
                    <button class="btn btn-outline-warning" id="repeatGame"> 
                    <i class="fas fa-repeat mr-2" ></i>
                        Una vez más  
                    </button>
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

    simpleAlert(data = {}){

        return Swal.fire({
            title: isNil(data?.title) === false ? data.title : '',
            text: isNil(data?.text) === false ? data.text : '',
            icon: isNil(data?.icon) === false ? data.icon : '',
            confirmButtonText: isNil(data?.confirmButtonText) === true ? 'Ok' : data.confirmButtonText,
          })
    }

    simpleAlertTimer (data = {}) {

        const alertMessageHtml = `
        <p class="f-700 mb-0 text-center text-primary">
            ${isNil(data?.title) === false ? data.title : ""}
        </p>`;
        
        return Swal.fire({
            width: isNil(data?.width) === false ? data.width : "300",
            position: isNil(data?.position) === false ? data.position : "top-end",
            icon: isNil(data?.icon) === false ? data.icon : "",
            // title: isNil(data?.title) === false ? data.title : "",
            html: alertMessageHtml,
            showConfirmButton: isNil(data?.showConfirmButton) === false ? data.showConfirmButton : false,
            timer: isNil(data?.timer) === false ? data.timer : 1500,
            timerProgressBar: true,
          });
    }

}


export {
    AlertsClass
}