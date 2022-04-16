let trainers = [];
let trainerFirstName = document.getElementById("firstName");
let trainerLastName = document.getElementById("lastName");
let trainerSubject = document.getElementById("subject");
let btnSubmit = document.getElementById("submit");

let btnReset = document.getElementById("reset");
btnReset.addEventListener("click",reset);

let btnUpdate = document.getElementById("update");
btnUpdate.addEventListener("click", update);

let divTrainers = document.getElementById("trainers");

let form = document.getElementById("trainerForm");

form.addEventListener("submit",function(event){
    console.log("submit");

    event.preventDefault();
    let myTrainer= new Trainer(trainerFirstName.value,trainerLastName.value,trainerSubject.value);
    trainers.push(myTrainer);
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.trainerIndex = trainers.length - 1;
    btnEdit.addEventListener('click' , edit);
    createParagraphElement(myTrainer , btnEdit);
    btnReset.click();
    console.log(trainers);
})

function Trainer(firstName,lastName,subject) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.subject = subject;
}

function TrainerToString(trainer) {
    return (`${trainer.firstName} ${trainer.lastName} ${trainer.subject}`);
}

function reset(){
    console.log("Form is reset");
    btnUpdate.hidden = true;
    btnSubmit.hidden = false;
}

function edit(){
    trainerFirstName.value=trainers[this.trainerIndex].firstName;
    trainerLastName.value=trainers[this.trainerIndex].lastName;
    trainerSubject.value=trainers[this.trainerIndex].subject;
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.trainerIndex = this.trainerIndex;
}

function update(event){
    let validation = form.reportValidity();
    if (validation)
    {
        console.log(this.trainerIndex);
        console.log(TrainerToString(new Trainer(trainerFirstName.value,trainerLastName.value,trainerSubject.value)));
        trainers[this.trainerIndex] =new Trainer(trainerFirstName.value,trainerLastName.value,trainerSubject.value);
        divTrainers.innerHTML = "";

        for(let i=0; i < trainers.length; i++)
        {
            let btnEdit = document.createElement("button");
            btnEdit.textContent = "Edit";
            btnEdit.studentIndex = i;
            btnEdit.addEventListener('click' , edit);
            createParagraphElement(trainers[i], btnEdit);
        }
        btnUpdate.hidden = true;
        btnSubmit.hidden = false;
        btnReset.click();
        event.preventDefault();
    }

}
function createParagraphElement(trainer, editButton){
    let paragraph = document.createElement("p");
    paragraph.innerText = TrainerToString(trainer);
    let spanSpace= document.createElement("span");
    spanSpace.innerHTML = "&nbsp";
    paragraph.append(spanSpace,editButton);
    divTrainers.append(paragraph);
}
    