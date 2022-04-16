let courses = [];
let courseTitle = document.getElementById("title");
let courseStream = document.getElementById("stream");
let courseStartDate = document.getElementById("startDate");
let courseEndDate = document.getElementById("endDate");
let btnSubmit = document.getElementById("submit");

let btnReset = document.getElementById("reset");
btnReset.addEventListener("click",reset);

let btnUpdate = document.getElementById("update");
btnUpdate.addEventListener("click", update);

let divCourses = document.getElementById("courses");

let form = document.getElementById("coursesForm");

form.addEventListener("submit",function(event){
    console.log("submit");

    event.preventDefault();
    let myCourse= new Course(courseTitle.value,courseStream.value,courseStartDate.value,courseEndDate.value);
    courses.push(myCourse);
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.courseIndex = courses.length - 1;
    btnEdit.addEventListener('click' , edit);
    createParagraphElement(myCourse , btnEdit);
    btnReset.click();
    console.log(courses);
})

function Course(title,stream,startDate,endDate) {
    this.title = title;
    this.stream = stream;
    this.startDate = startDate;
    this.endDate = endDate;
}

function CourseToString(course) {
    return (`${course.title} ${course.stream} ${course.startDate} ${course.endDate}`);
}

function reset(){
    console.log("Form is reset");
    btnUpdate.hidden = true;
    btnSubmit.hidden = false;
}

function edit(){
    courseTitle.value=courses[this.courseIndex].title;
    courseStream.value=courses[this.courseIndex].stream;
    courseStartDate.value=courses[this.courseIndex].startDate;
    courseEndDate.value=courses[this.courseIndex].endDate;
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.courseIndex = this.courseIndex;
}

function update(event){
    let validation = form.reportValidity();
    if (validation)
    {
        console.log(this.courseIndex);
        console.log(CourseToString(new Course(courseTitle.value,courseStream.value,courseStartDate.value,courseEndDate.value)));
        courses[this.courseIndex] =  new Course(courseTitle.value,courseStream.value,courseStartDate.value,courseEndDate.value);
        divCourses.innerHTML = "";

        for(let i=0; i < courses.length; i++)
        {
            let btnEdit = document.createElement("button");
            btnEdit.textContent = "Edit";
            btnEdit.courseIndex = i;
            btnEdit.addEventListener('click' , edit);
            createParagraphElement(courses[i], btnEdit);
        }
        btnUpdate.hidden = true;
        btnSubmit.hidden = false;
        btnReset.click();
        event.preventDefault();
    }

}
function createParagraphElement(course, editButton){
    let paragraph = document.createElement("p");
    paragraph.innerText = CourseToString(course);
    let spanSpace= document.createElement("span");
    spanSpace.innerHTML = "&nbsp";
    paragraph.append(spanSpace,editButton);
    divCourses.append(paragraph);
}
    