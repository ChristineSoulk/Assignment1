let assignments = [];
let title = document.getElementById("title");
let description = document.getElementById("description");
let oralMark = document.getElementById("oralMark");
let totalMark = document.getElementById("totalMark");
let btnSubmit = document.getElementById("submit");

let btnReset = document.getElementById("reset");
btnReset.addEventListener("click",reset);

let btnUpdate = document.getElementById("update");
btnUpdate.addEventListener("click", update);

let divAssignments = document.getElementById("assignments");

let form = document.getElementById("assignmentForm");

form.addEventListener("submit",function(event){
    console.log("submit");

    event.preventDefault();
    let myAssignment= new Assignment(title.value,description.value,oralMark.value,totalMark.value);
    assignments.push(myAssignment);
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.assignmentIndex = assignments.length - 1;
    btnEdit.addEventListener('click' , edit);
    createParagraphElement(myAssignment , btnEdit);
    btnReset.click();
    console.log(assignments);
})

function Assignment(assignmentTitle,assignmentDescription,assignmentOralMark,assignmentTotalMark) {
    this.assignmentTitle = assignmentTitle;
    this.assignmentDescription = assignmentDescription;
    this.assignmentOralMark = assignmentOralMark;
    this.assignmentTotalMark = assignmentTotalMark;
}

function AssignmentToString(assignment) {
    return (`${assignment.assignmentTitle} ${assignment.assignmentDescription} ${assignment.assignmentOralMark} ${assignment.assignmentTotalMark}`);
}

function reset(){
    console.log("Form is reset");
    btnUpdate.hidden = true;
    btnSubmit.hidden = false;
}

function edit(){
    title.value=assignments[this.assignmentIndex].assignmentTitle;
    description.value=assignments[this.assignmentIndex].assignmentDescription;
    oralMark.value=assignments[this.assignmentIndex].assignmentOralMark;
    totalMark.value=assignments[this.assignmentIndex].assignmentTotalMark;
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.assignmentIndex = this.assignmentIndex;
}

function update(event){
    let validation = form.reportValidity();
    if (validation)
    {
        assignments[this.assignmentIndex] = new Assignment(title.value,description.value,oralMark.value,totalMark.value);
        divAssignments.innerHTML = "";

        for(let i=0; i < assignments.length; i++)
        {
            let btnEdit = document.createElement("button");
            btnEdit.textContent = "Edit";
            btnEdit.assignmentIndex = i;
            btnEdit.addEventListener('click' , edit);
            createParagraphElement(assignments[i], btnEdit);
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
    divAssignments.append(paragraph);
}
    