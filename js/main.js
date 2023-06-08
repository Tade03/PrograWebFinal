$(()=>{

    var serviceid;
    var templateid;
    fetch('js/config.json')
  .then((response) => response.json())
  .then((json) => {
    id = json.id;
    serviceid = json.serviceid;
    templateid = json.templateid;

    // Use the IDs as needed
    console.log("ID:", id);
    console.log("Service ID:", serviceid);
    console.log("Template ID:", templateid);
  });
  if(document.location.href.includes("contacto.html")){
    // Codigo para verificacion del formulario
    const inputs = $('input');
    let modal = document.getElementById("modal");
    var next = false;
    inputs.splice(3,1);
    $('#enviar').on('click', ()=>{
        verificarDatos();
    })
    inputs[3] = $('textarea')[0];

    /*
    * Funcion que verifica que los campos del formulario esten completos
    * y en caso de que no lo esten, muestra un mensaje de error
    * Esta funcion NO checa que el text area este completo, ya que no se puede verificar
    */
    function verificarDatos(){
        console.log(inputs[1].value);
        console.log("Se clickeo")
        inputs.each((index, element)=>{ 
            next = false;
            if(element.value == ""){
                element.style.borderColor = "red";
                element.placeholder = "Este campo es obligatorio";
                element.style.color = "red";
            }else if(index == 3 || element.value != "" || element.value.length <= 10){
                element.style.borderColor = "green";
                next = true;
                console.log(element)
            }
            element.addEventListener('focus', ()=>{
                element.style.borderColor = "black";
                element.style.color = "black";
            })
        })
        if(next){
            sendMail();
            modal.showModal();
        }
        $("#cerrar").on('click', ()=>{
            window.open("index.html", "_self");
        })
    }

    function sendMail(){
        var params = {
            name: inputs[0].value,
            email: inputs[1].value,
            phone: inputs[2].value,
            message: inputs[3].value
        }

        emailjs.send(serviceid, templateid, params).then((res) => {
            alert("Correo enviado");
        }).catch((err) => {
            log(err);
        });
    }
}
})
// Prueba rapida