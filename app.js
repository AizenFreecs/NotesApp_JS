const title = document.querySelector("#note-title");
const content = document.querySelector("#note-body");
let newNoteBtn = document.querySelector("#new-note-btn");
let addNoteBtn = document.querySelector("#add-note-btn");
let notesList = document.querySelector('.notes-list');
let form = document.querySelector('#main-form');
let container = document.querySelector('.input-container');
let dispTitle = document.querySelector("#disp-title");
let dispBody = document.querySelector("#disp-body");
let maincontainer = document.querySelector('.container');
let closeBtn = document.querySelector('.close-btn');
let existingFormData = JSON.parse(localStorage.getItem('formData'))||[];

let formData = {
    title: title.value,
    content:content.value
};

window.onload = function(){
    existingFormData = JSON.parse(localStorage.getItem('formData'))||[];
    displayFormData(existingFormData);
}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    addNewNote(existingFormData);
    displayFormData();
    event.target.reset();
    toggleScreen();
})

newNoteBtn.addEventListener('click',()=>{   
    toggleScreen();
})
closeBtn.addEventListener('click',()=>{
    toggleScreen();
    clearScreen();
})
const displayFormData = ()=>{
    notesList.innerHTML='';
    existingFormData.forEach(function (formData,index) {
        addNoteElements(formData,index);
        console.log(`Title: ${formData.title} Content: ${formData.content}`,index);
    });
}

const addNewNote = ()=>{
    formData = {
        title: title.value,
        content:content.value
    };
    existingFormData.push(formData);
    localStorage.setItem('formData',JSON.stringify(existingFormData));
    console.log(formData);
    displayFormData();
    

}
const deleteNote = (index)=>{
    existingFormData.splice(index,1);
    localStorage.setItem('formData',JSON.stringify(existingFormData));
    displayFormData();
    clearScreen();
}
const viewNote = (index)=>{
    var temp = existingFormData[index]; 
    dispTitle.innerText = temp.title;
    dispBody.innerText = temp.content;
    console.log("onclick working",event.target.id)
}

const addNoteElements = (formData,index)=>{
    var newDiv = document.createElement('div');
    var newDiv2 = document.createElement('div');
    var newDiv3 = document.createElement('div');
        newDiv.classList.add('view-notes');
        newDiv2.classList.add('view-notes-data');
        newDiv3.classList.add('view-notes-options');
        newDiv.id=`note-${index}`;
        var newTitle = document.createElement('h1');
        var newBody = document.createElement('p');
        newBody.classList.add('view-note-body-disp');
        var newViewBtn = document.createElement('button');
        var newDeleteBtn = document.createElement('button')
        newViewBtn.id=`btn-${index}`;
        newViewBtn.innerText = 'View Note';
        newDeleteBtn.innerText = 'Delete';
        newViewBtn.addEventListener('click',(event)=>{
            viewNote(index);
        });
        newDeleteBtn.addEventListener('click',(event)=>{
            deleteNote(index);
        })
        newViewBtn.classList.add('view-btn');
        newDeleteBtn.classList.add('view-btn');
        newTitle.innerText=formData.title;
        newBody.innerText=formData.content;
        newDiv.appendChild(newDiv2);
        newDiv.appendChild(newDiv3);
        newDiv2.appendChild(newTitle);
        newDiv2.appendChild(newBody);
        newDiv3.appendChild(newViewBtn);
        newDiv3.appendChild(newDeleteBtn);
        notesList.appendChild(newDiv);
}

const clearScreen = ()=>{
    dispTitle.innerText = "Title will appear here";
    dispBody.innerText = "The content will appear here";
}

const toggleScreen = ()=>{
    if(container.style.visibility === 'visible'){
        container.style.visibility = 'hidden';
        maincontainer.style.visibility = 'visible';
    }else{
        container.style.visibility = 'visible';
        maincontainer.style.visibility = 'hidden';
    }
}
