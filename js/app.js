// console.log("hello world");

// If user add a note, save it in local storage.
showNotes(); // to show notes from Local storage when page is refresh 
let addBtn = document.getElementById('addBtn'); // target Button by 

// added a click event listener that has to be executed after clicking on button
addBtn.addEventListener("click",   function(e){   
   let addTxt= document.getElementById("addTxt");   // get text from textarea using its id
   let addTitle= document.getElementById("addTitle");   // get text from title using its id
   let notes=localStorage.getItem("notes");        // save notes in local storage
   if(notes==null){
       notesObj=[];  // if notes is empty then an empty array is saved in notesObj
   }
   else{
       notesObj=JSON.parse(notes); //convert notes into string and save it to variable notesObj
   }
   //saving title and text using object
   let myObj = {
       title:addTitle.value,
        text: addTxt.value
   }
   notesObj.push(myObj);    // add myObj in notesObj that was saved in line myObj object
   localStorage.setItem("notes", JSON.stringify(notesObj)); // After converting text into string save it in notes as local storage doesnot save arraay so we have to convert it into string
   addTxt.value=""; //text area se note save krne ke baad use blank kar diya 
   addTitle.value=""     
   //  console.log(notesObj);
   showNotes();  // calling function showNotes() that we have created to show notes in our app
    
})
// Show Notes function
function showNotes(){
let notes=localStorage.getItem("notes"); //get notes from local storage

// if there is no notes then make notesObj variable empty array
if(notes==null){
    notesObj=[];
}
// if there are notes, convert the string into array and then by using forEach loops display it

else{
    notesObj=JSON.parse(notes);
}
let html =""; // an html variable where HTML to display notes will be savec
notesObj.forEach(function(element, index){
    // this.id onclick me likhne se uski id yahan aa jayegi
    html+=`<div class="noteCard card my-3 mx-3" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text">${element.text}</p>
      <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
      </div>
  </div>`; // HTML of displaying notes
});
let notesElem=document.getElementById('notes'); // targetting container with id "notes", and save div element in notesElem

// if length of Notes is not zero then save innerHTML
if(notesObj.length!=0){
    notesElem.innerHTML=html; // savinng innerHTML in element div that was saved in notesElem
}
// if length of Notes is zero
else{
    notesElem.innerHTML= `Nothing to show here, Please use "Add Note" to add a note `; // show this message if there exist no note
}
}

// function to delete a notes

// the id given to Delete note button is its index, and onclick deletNote() function is called see HTMl
function deleteNote(index){
    // console.log(`'I am deleting this note' ${index}`);

    let notes= localStorage.getItem("notes"); // accessing notes from local server
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);   // if there exist a notes save it in variable notesObj as array
    }
    notesObj.splice(index, 1);   // splice function remove the item from index and numer of item want to remove
    localStorage.setItem("notes", JSON.stringify(notesObj));  // up-date the local storage by saving the array as string
    showNotes();
}

let search = document.getElementById("searchTxt");  // by using search id we access the text typed in search
// console.log(search)

// an input event listner is added which wil work in real time
 search.addEventListener("input", function(){  
     let inputVal=search.value.toLowerCase();  // making all the types alphabet in lowercase to search without any case sensitivity
    //  console.log(inputVal)

    
     let noteCards= document.getElementsByClassName("noteCard");     // accessing noteCard element  by class name
    //  console.log(noteCard ,inputVal)
    Array.from(noteCards).forEach(function(element){
                let cardTxt = element.getElementsByTagName("p")[0].innerText; // there is only one p tag so we access that
                cardTxt=cardTxt.toLowerCase();  // notes text are made to lower case so even uuppercase can be searched
                if(cardTxt.includes(inputVal)) // condition to show searched notes
                {
                    element.style.display="block"; // if note exist by that search show it
                }
                else{
                    element.style.display="none"; // if note doesn't exist by that search display will be none
                }

    })



 })


 /*
 Further features:
 1. Add title
 2. Mark a note as important
 3. Separate notes by user
 4. Syn and host to a web server

 */