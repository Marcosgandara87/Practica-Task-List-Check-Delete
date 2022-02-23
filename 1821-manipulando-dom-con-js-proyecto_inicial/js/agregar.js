const btn = document.querySelector("[data-form-btn]")
var checks = 0;




const createTask =(evento)=>{
    evento.preventDefault();
    const tarea = document.querySelector("[data-form-input]").value
    if (validarTexto(tarea) == 1){

        var div = document.createElement("div")
        
      
        div.appendChild(construirCheck());
        div.appendChild(construirCampo(tarea))
        console.log(tarea) 
        var card = document.createElement("li");
        card.classList.add("card");
        card.appendChild(div)
        card.appendChild(construirTrash());
        document.querySelector("[data-list]").appendChild(card)    
        document.querySelector("[data-form-input]").value = "";
    }else{
        console.log("Vacio")    
    }
}

btn.addEventListener("click",createTask);


const validarTexto = (tarea)=>{
    if (tarea !=""){
        return 1;
    }else{
        return 0;
    }
}

function construirCampo(dato){
    var span = document.createElement("span");
    span.classList.add("task");
    span.textContent= dato;
    return span;    
}

function construirCheck(event){
    var i = document.createElement("i")
    i.classList.add("far")
    i.classList.add("fa-check-square")
    i.classList.add("icon")
    i.addEventListener("click",createcheck);

    return i;
}

function createcheck(event){
    event.target.classList.toggle("fas");
    event.target.classList.toggle("cmpleteIcon");
    event.target.classList.toggle("far");
    
}

function construirTrash(event){
    var it = document.createElement("i");
    it.classList.add("fas")
    it.classList.add("fa-trash-alt")
    it.classList.add("trashIcon")
    it.classList.add("icon")
    it.addEventListener("click",deleteIcon)
    return it;
}



function deleteIcon(event){
    const eliminar = event.target.parentElement;
    eliminar.remove();


}