let studentsPerCourse = [];
let studentFirstName = document.getElementById("firstName");
let studentLastName = document.getElementById("lastName");
let studentCourseTitle = document.getElementById("courseTitle");
let btnSubmit = document.getElementById("submit");

let btnReset = document.getElementById("reset");
btnReset.addEventListener("click",reset);

let btnUpdate = document.getElementById("update");
btnUpdate.addEventListener("click", update);

let divStudentPerCourse = document.getElementById("StudentsPerCourse");

let form = document.getElementById("StudentsPerCourseForm");

form.addEventListener("submit",function(event){
    console.log("submit");

    event.preventDefault();
    let myStudent= new Student(studentFirstName.value,studentLastName.value,studentCourseTitle.value);
    studentsPerCourse.push(myStudent);
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.studentIndex = studentsPerCourse.length - 1;
    btnEdit.addEventListener('click' , edit);
    createParagraphElement(myStudent , btnEdit);
    btnReset.click();
    console.log(studentsPerCourse);
})

function Student(firstName,lastName,courseTitle) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.courseTitle = courseTitle;
}

function StudentToString(student) {
    return (`${student.firstName} ${student.lastName} ${student.courseTitle}`);
}

function reset(){
    console.log("Form is reset");
    btnUpdate.hidden = true;
    btnSubmit.hidden = false;
}

function edit(){
    studentFirstName.value=studentsPerCourse[this.studentIndex].firstName;
    studentLastName.value=studentsPerCourse[this.studentIndex].lastName;
    studentCourseTitle.value=studentsPerCourse[this.studentIndex].courseTitle;
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.studentIndex = this.studentIndex;
    console.log(StudentToString(studentsPerCourse[this.studentIndex]));
}

function update(event){
    let validation = form.reportValidity();
    if (validation)
    {
        console.log(this.studentIndex);
        console.log(StudentToString(new Student(studentFirstName.value,studentLastName.value,studentCourseTitle.value)));
        studentsPerCourse[this.studentIndex] =  new Student(studentFirstName.value,studentLastName.value,studentCourseTitle.value);
        divStudentPerCourse.innerHTML = "";

        for(let i=0; i < studentsPerCourse.length; i++)
        {
            let btnEdit = document.createElement("button");
            btnEdit.textContent = "Edit";
            btnEdit.studentIndex = i;
            btnEdit.addEventListener('click' , edit);
            createParagraphElement(studentsPerCourse[i], btnEdit);
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
    divStudentPerCourse.append(paragraph);
}
    