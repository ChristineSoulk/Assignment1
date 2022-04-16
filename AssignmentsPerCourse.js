let assignmentsPerCourse = [];
let assignmentName = document.getElementById("title");
let courseTitle = document.getElementById("description");
let studentFirstName = document.getElementById("studentFirstName");
let studentLastName = document.getElementById("studentLastName");
let studentOralMark = document.getElementById("studentOralMark");
let studentTotalMark = document.getElementById("studentTotalMark");
let btnSubmit = document.getElementById("submit");

let btnReset = document.getElementById("reset");
btnReset.addEventListener("click",reset);

let btnUpdate = document.getElementById("update");
btnUpdate.addEventListener("click", update);

let divAssignmentsPerCourse = document.getElementById("AssignmentsPerCourse");

let form = document.getElementById("AssignmentsPerCourseForm");

form.addEventListener("submit",function(event){
    console.log("submit");

    event.preventDefault();
    let myAssignment = new Assignment(assignmentName.value,courseTitle.value,studentFirstName.value,studentLastName.value,studentOralMark.value,studentTotalMark.value);
    assignmentsPerCourse.push(myAssignment);
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.assignmentIndex = assignmentsPerCourse.length - 1;
    btnEdit.addEventListener('click' , edit);
    createParagraphElement(myAssignment , btnEdit);
    btnReset.click();
    console.log(assignmentsPerCourse);
})

function Assignment(title,description,firstName,lastName,oralMark,totalMark) {
    this.title = title;
    this.description = description;
    this.firstName = firstName;
    this.lastName = lastName;
    this.oralMark = oralMark;
    this.totalMark = totalMark;
}

function AssignmentToString(assignment) {
    return (`${assignment.title} ${assignment.description} ${assignment.firstName} ${assignment.lastName} ${assignment.oralMark} ${assignment.totalMark}`);
}

function reset(){
    console.log("Form is reset");
    btnUpdate.hidden = true;
    btnSubmit.hidden = false;
}

function edit(){
    assignmentName.value=assignmentsPerCourse[this.assignmentIndex].title;
    courseTitle.value=assignmentsPerCourse[this.assignmentIndex].description;
    studentFirstName.value=assignmentsPerCourse[this.assignmentIndex].firstName;
    studentLastName.value=assignmentsPerCourse[this.assignmentIndex].lastName;
    studentOralMark.value=assignmentsPerCourse[this.assignmentIndex].oralMark;
    studentTotalMark.value=assignmentsPerCourse[this.assignmentIndex].totalMark;
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.assignmentIndex = this.assignmentIndex;
}

function update(event){
    let validation = form.reportValidity();
    if (validation)
    {
        console.log(this.assignmentIndex);
        console.log(AssignmentToString(new Assignment(assignmentName.value,courseTitle.value,studentFirstName.value,studentLastName.value,studentOralMark.value,studentTotalMark.value)));
        assignmentsPerCourse[this.assignmentIndex] =  new Assignment(assignmentName.value,courseTitle.value,studentFirstName.value,studentLastName.value,studentOralMark.value,studentTotalMark.value);
        divAssignmentsPerCourse.innerHTML = "";

        for(let i=0; i < assignmentsPerCourse.length; i++)
        {
            let btnEdit = document.createElement("button");
            btnEdit.textContent = "Edit";
            btnEdit.assignmentIndex = i;
            btnEdit.addEventListener('click' , edit);
            createParagraphElement(assignmentsPerCourse[i], btnEdit);
        }
        btnUpdate.hidden = true;
        btnSubmit.hidden = false;
        btnReset.click();
        event.preventDefault();
    }

}
function createParagraphElement(assignment, editButton){
    let paragraph = document.createElement("p");
    paragraph.innerText = AssignmentToString(assignment);
    let spanSpace= document.createElement("span");
    spanSpace.innerHTML = "&nbsp";
    paragraph.append(spanSpace,editButton);
    divAssignmentsPerCourse.append(paragraph);
}
    