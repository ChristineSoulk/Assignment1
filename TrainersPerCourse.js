let trainersPerCourse = [];
let trainerFirstName = document.getElementById("firstName");
let trainerLastName = document.getElementById("lastName");
let trainerCourseTitle = document.getElementById("courseTitle");
let btnSubmit = document.getElementById("submit");

let btnReset = document.getElementById("reset");
btnReset.addEventListener("click",reset);

let btnUpdate = document.getElementById("update");
btnUpdate.addEventListener("click", update);

let divTrainerPerCourse = document.getElementById("TrainersPerCourse");

let form = document.getElementById("TrainersPerCourseForm");

form.addEventListener("submit",function(event){
    console.log("submit");

    event.preventDefault();
    let myTrainer= new Trainer(trainerFirstName.value,trainerLastName.value,trainerCourseTitle.value);
    trainersPerCourse.push(myTrainer);
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.trainerIndex = trainersPerCourse.length - 1;
    btnEdit.addEventListener('click' , edit);
    createParagraphElement(myTrainer , btnEdit);
    btnReset.click();
    console.log(trainersPerCourse);
})

function Trainer(firstName,lastName,courseTitle) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.courseTitle = courseTitle;
}

function TrainerToString(trainer) {
    return (`${trainer.firstName} ${trainer.lastName} ${trainer.courseTitle}`);
}

function reset(){
    console.log("Form is reset");
    btnUpdate.hidden = true;
    btnSubmit.hidden = false;
}

function edit(){
    trainerFirstName.value=trainersPerCourse[this.trainerIndex].firstName;
    trainerLastName.value=trainersPerCourse[this.trainerIndex].lastName;
    trainerCourseTitle.value=trainersPerCourse[this.trainerIndex].courseTitle;
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.trainerIndex = this.trainerIndex;
}

function update(event){
    let validation = form.reportValidity();
    if (validation)
    {
        console.log(this.trainerIndex);
        console.log(TrainerToString(new Trainer(trainerFirstName.value,trainerLastName.value,trainerCourseTitle.value)));
        trainersPerCourse[this.trainerIndex] =  new Trainer(trainerFirstName.value,trainerLastName.value,trainerCourseTitle.value);
        divTrainerPerCourse.innerHTML = "";

        for(let i=0; i < trainersPerCourse.length; i++)
        {
            let btnEdit = document.createElement("button");
            btnEdit.textContent = "Edit";
            btnEdit.trainerIndex = i;
            btnEdit.addEventListener('click' , edit);
            createParagraphElement(trainersPerCourse[i], btnEdit);
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
    divTrainerPerCourse.append(paragraph);
}
    