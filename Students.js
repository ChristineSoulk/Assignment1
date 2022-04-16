let students = [];
let studentFirstName = document.getElementById("firstName");
let studentLastName = document.getElementById("lastName");
let studentDateOfBirth = document.getElementById("dateOfBirth");
let studentTuitionFees = document.getElementById("tuitionFees");
let btnSubmit = document.getElementById("submit");

let btnReset = document.getElementById("reset");
btnReset.addEventListener("click",reset);

let btnUpdate = document.getElementById("update");
btnUpdate.addEventListener("click", update);

let divStudents = document.getElementById("students");

let form = document.getElementById("studentForm");

form.addEventListener("submit",function(event){
    console.log("submit");

    event.preventDefault();
    let myStudent= new Student(studentFirstName.value,studentLastName.value,studentDateOfBirth.value,studentTuitionFees.value);
    students.push(myStudent);
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.studentIndex = students.length - 1;
    btnEdit.addEventListener('click' , edit);
    createParagraphElement(myStudent , btnEdit);
    btnReset.click();
    console.log(students);
})

function Student(firstName,lastName,dateOfBirth,tuitionFees) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.tuitionFees = tuitionFees;
}

function StudentToString(student) {
    return (`${student.firstName} ${student.lastName} ${student.dateOfBirth} ${student.tuitionFees}`);
}

function reset(){
    console.log("Form is reset");
    btnUpdate.hidden = true;
    btnSubmit.hidden = false;
}

function edit(){
    studentFirstName.value=students[this.studentIndex].firstName;
    studentLastName.value=students[this.studentIndex].lastName;
    studentDateOfBirth.value=students[this.studentIndex].dateOfBirth;
    studentTuitionFees.value=students[this.studentIndex].tuitionFees;
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.studentIndex = this.studentIndex;
    console.log(StudentToString(students[this.studentIndex]));
}

function update(event){
    let validation = form.reportValidity();
    if (validation)
    {
        console.log(this.studentIndex);
        console.log(StudentToString(new Student(studentFirstName.value,studentLastName.value,studentDateOfBirth.value,studentTuitionFees.value)));
        students[this.studentIndex] =  new Student(studentFirstName.value,studentLastName.value,studentDateOfBirth.value,studentTuitionFees.value);
        divStudents.innerHTML = "";

        for(let i=0; i < students.length; i++)
        {
            let btnEdit = document.createElement("button");
            btnEdit.textContent = "Edit";
            btnEdit.studentIndex = i;
            btnEdit.addEventListener('click' , edit);
            createParagraphElement(students[i], btnEdit);
        }
        btnUpdate.hidden = true;
        btnSubmit.hidden = false;
        btnReset.click();
        event.preventDefault();
    }

}
function createParagraphElement(student, editButton){
    let paragraph = document.createElement("p");
    paragraph.innerText = StudentToString(student);
    let spanSpace= document.createElement("span");
    spanSpace.innerHTML = "&nbsp";
    paragraph.append(spanSpace,editButton);
    divStudents.append(paragraph);
}
    