const btn = document.querySelector("[data-form-btn]")
var tareaCalendario;
const complete = false;
const estado = true;
var id;

    var calendar1 =new Date()
    console.log(calendar1)
    document.querySelector("[data-form-date]").value = calendar1.toJSON().slice(0,10);



    const createTask =(evento)=>{

    evento.preventDefault();
    


    const tarea = document.querySelector("[data-form-input]").value
    var calendar = moment(document.querySelector("[data-form-date]").value).format("DD/MM/YYYY HH:mm");
    if (validarTexto(tarea) == 1){
        if (calendar != "Invalid date"){
            

            const taskObj ={
                tarea,
                calendar,
                complete,
                estado,
                id: uuid.v4()
                }
        
            tareaCalendario.push(taskObj);
            localStorage.setItem("task",JSON.stringify(tareaCalendario));


            primeraCarga();  

    }else{
    alert("Por favor completar fecha y hora")}
    }else{
    alert("Por favor completar nombre de la tarea")    
    }
    
    

}


const etiquetaFecha = (fecha) =>{

    const etiFecha = document.createElement("li")
    etiFecha.innerHTML = fecha;
    etiFecha.classList.add("fecha");
    return etiFecha;


}

const primeraCarga = ()=>{
    document.querySelector("[data-list]").innerHTML = "";
    tareaCalendario = JSON.parse(localStorage.getItem("task")) || [] ;
    cargarTareas(tareaCalendario)
}


const cargarTareas = (tareaCalendario)=>{
        

           
           
            var dates = fechasUnicas(tareaCalendario);
            dates.forEach((date) =>{
        

            document.querySelector("[data-list]").appendChild(etiquetaFecha(date));
            
            tareaCalendario.forEach((task) => {
                if ((task.calendar == date) && (task.estado ==true)) {
                    construirLinea(task);
                }
                
             });
        
    
        
    });
    
}




const construirLinea =(task) =>{
    
    const check = construirCheck(task.id)

    /* if (task.complete == true){
        check.target.classList.toggle("fas");
        check.target.classList.toggle("cmpleteIcon");
        check.target.classList.toggle("far");

    } */


    const div = document.createElement("div")
    div.appendChild(check);
    div.appendChild(construirCampo(task.tarea));
    const calendarElement = document.createElement("span")
    calendarElement.innerHTML= task.calendar; 
    const card = document.createElement("li");
    card.classList.add("card");
    card.appendChild(div)
    //card.appendChild(calendarElement)
    card.appendChild(construirTrash(task.id));
    document.querySelector("[data-list]").appendChild(card) 


    //div.appendChild(construirCampo(tarea));
    
    document.querySelector("[data-form-input]").value = "";


    
}

const validarTexto = (tarea)=> {
    if (tarea !=""){
        return 1;
    }else{
        return 0;
    }
}

const construirCampo = (dato)=> {
    var span = document.createElement("span");
    span.classList.add("task");
    span.textContent= dato;
    return span;    
}

const construirCheck = (id)=> {
    
    var i = document.createElement("i")
    i.classList.add("far")
    i.classList.add("fa-check-square")
    i.classList.add("icon")

    const tasks = JSON.parse(localStorage.getItem("task"));
    const index = tasks.findIndex( item => item.id === id)
        if(tasks[index]["complete"]){
            i.classList.toggle("fas");
            i.classList.toggle("cmpleteIcon");
            i.classList.toggle("far");
        }

    i.addEventListener("click", (event)=> createcheck(event,id));
    return i;
}

const createcheck = (event,id)=> {


    event.target.classList.toggle("fas");
    event.target.classList.toggle("cmpleteIcon");
    event.target.classList.toggle("far");
    console.log(id)

    const tasks = JSON.parse(localStorage.getItem("task"));
    const index = tasks.findIndex( item => item.id === id)


    tasks[index]["complete"] = !tasks[index]["complete"]
    localStorage.setItem("task",JSON.stringify(tasks));
    primeraCarga();

}

const construirTrash = (id) => {
    var it = document.createElement("i");
    it.classList.add("fas")
    it.classList.add("fa-trash-alt")
    it.classList.add("trashIcon")
    it.classList.add("icon")
    it.addEventListener("click",() => deleteIcon(id))
    return it;
}



const deleteIcon= (id)=> {

    const tasks = JSON.parse(localStorage.getItem("task"));
    const index = tasks.findIndex( item => item.id === id)

    tasks[index]["estado"] = !tasks[index]["estado"]
    localStorage.setItem("task",JSON.stringify(tasks));
    console.log(tasks[index]["estado"])
    
    primeraCarga();


}


const fechasUnicas = (tareas1) =>{
    var fechaUnique = [] ;

    tareas1.forEach((task)=> {
        
        if(task.estado ==true){
        if (!fechaUnique.includes(task.calendar)){
        
                fechaUnique.push(task.calendar)

            }       
        }

    })

    fechaUnique.sort((a, b) => moment(a, "DD/MM/YYYY HH:mm").unix() - moment(b, "DD/MM/YYYY HH:mm").unix());
   

    


    return fechaUnique;

}

primeraCarga();

btn.addEventListener("click",createTask);