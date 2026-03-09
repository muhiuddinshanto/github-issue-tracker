const cardSection =  document.getElementById('card-section');
const issuCount = document.getElementById('issue-count');
const allBtn = document.getElementById("btn-all")
const openBtn = document.getElementById("btn-open")
const closedBtn = document.getElementById("btn-closed")
let allIssues = [];




function getLabelClass(label){
    if(label.toLowerCase() === "bug") return "badge badge-soft badge-error";          
    if(label.toLowerCase() === "enhancement") return "badge badge-soft badge-success"; 
    if(label.toLowerCase() === "help wanted") return "badge badge-soft badge-warning"; 
    if(label.toLowerCase() === "good first issue") return "badge badge-soft badge-info"; 
    return "badge badge-soft badge-secondary"; 
}

function getLabelImage(label){
    label = label.toLowerCase();
    if(label === "bug") return "./assets/Vector.png";
    if(label === "enhancement") return "./assets/Sparkle.png";
    if(label === "help wanted") return "./assets/Vector (1).png";
    return "";
}

function getLabelClassModal(label){
    if(label.toLowerCase() === "high") return "badge badge-soft badge-error";          
    if(label.toLowerCase() === "medium") return "badge badge-soft badge-warning";  
    return "badge badge-soft badge-success"; 
}


function manageSpinner (status) {
    if(status === true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('card-section').classList.add('hidden')
    }else{
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('card-section').classList.remove('hidden')
    }
}

async  function allIssueLoad (){

    manageSpinner(true);

   await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
   .then ((res)=>  res.json())
   .then ((issue) => {
       allIssues =issue.data;
       allIssueDisplay(issue.data)
       console.log(allIssues);
   }
   )
   
}

/*
{
    "id": 1,
    "title": "Fix navigation menu on mobile devices",
    "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
    "status": "open",
    "labels": [
        "bug",
        "help wanted"
    ],
    "priority": "high",
    "author": "john_doe",
    "assignee": "jane_smith",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
}
*/




const allIssueDisplay = (issue)=>{
    cardSection.innerHTML = "";
    issue.forEach(element => {

const borderCOlor = element.status === "open"
        ? "border-[#00A96E]"
        : "border-[#A855F7]";

const openClosedIcon = element.status === "open"
        ? "./assets/Open-Status.png"
        : "./assets/Closed- Status .png";
        

const priorityClass = 
    element.priority === "high" ? "badge badge-soft badge-error"  :
    element.priority === "medium" ? "badge badge-soft badge-warning" :
    "badge badge-soft badge-success";



        const card = document.createElement("div");
 card.innerHTML = `
 <div id="card" 
                    class="card h-full bg-white shadow-lg mt-7  border-t-4 ${borderCOlor} rounded-t-xl"onclick="loadModal(${element.id})">
                        <div class="card-top space-y-2 p-4  ">
                            <div class="card-badge flex items-center justify-between">
                                <div class="img">
                                    <img src="${openClosedIcon}" alt="">
                                </div>
                                <div class="badge">
                                    <div  class="${priorityClass}">${element.priority} </div>
                                </div>
                            </div>
                            <h2 class="card-title font-semibold line-clamp-2 cursor-pointer"onclick="loadModal(${element.id})">
                                ${element.title}
                            </h2>
                            <p class="line-clamp-2 ">${element.description}</p>
                            <div class="card-actions">
                            
                                ${element.labels.map(label => `
                                    <div class="${getLabelClass(label)} flex items-center gap-2">
                                        <img src="${getLabelImage(label)}" alt=""><span>${label}</span>
                                    </div>`).join('')}
                            </div>

                        </div>
                        <div class="card-bottom p-4 border-t border-[#64748B] ">
                            <div class="flex justify-between ">
                                <div><p>By <span class="font-semibold">${element.author}</span> </p></div>
                                <div><p>${new Date(element.createdAt).toLocaleDateString("en-US")}</p>
                            </div>
                        </div>


                    </div>
 `
 manageSpinner(false);
 cardSection.appendChild(card)

 issuCount.innerText = cardSection.children.length


    });



 
 
    
}


const loadModal = async(id) => {
    manageSpinner(true);
    my_modal_5.showModal() 
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
 await  fetch(url)
    .then((res)=> res.json())
    .then((data)=> showModal(data.data))
     
}

/*
{
    "status": "success",
    "message": "Issue fetched successfully",
    "data": {
        "id": 1,
        "title": "Fix navigation menu on mobile devices",
        "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
        "status": "open",
        "labels": [
            "bug",
            "help wanted"
        ],
        "priority": "high",
        "author": "john_doe",
        "assignee": "jane_smith",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
    }
}
*/

function showModal(data) {
    manageSpinner(false);
   const modalAdd = document.getElementById('modal-add');
   console.log(data);

const modalStatus = data.status === "open"
        ? "badge-success"
        : "badge-error";
   
   modalAdd.innerHTML = `
   <div class="modal-contant space-y-5">
            <h2 class="font-bold text-2xl">${data.title}</h2>

            <div class="flex items-center space-x-3">

                <div class="badge ${modalStatus}">${data.status}</div>
                <img src="./assets/Ellipse 6.png" alt="">
                <p> Opened by ${data.author}</p>
                <img src="./assets/Ellipse 6.png" alt="">
                <p>${new Date(data.createdAt).toLocaleDateString("en-US")}</p>
            </div>
            <div class="badge flex">
                ${data.labels.map(label => `
                                    <div class="${getLabelClass(label)} flex items-center gap-2">
                                        <img src="${getLabelImage(label)}" alt=""><span>${label}</span>
                                    </div>`).join('')}
            </div>
            <p>${data.description}</p>
            <div class="bg-[#F8FAFC] p-4 flex gap-3 justify-around">
                <div class="left flex-2">
                    <p>Assignee:</p>
                    <h3>${data.assignee}</h3>
                </div>
                <div class="right flex-2">
                    <p>Priority:</p>
                    <div class="${getLabelClassModal(data.priority)}">${data.priority}</div>
                </div>
            </div>
                </div>
   `
   
        
       my_modal_5.showModal()   
    
    
}


document.getElementById('btn-search').addEventListener("click", function(){
    const input = document.getElementById('input-search')
    const searchValue = input.value.trim().toLowerCase();

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then((res)=> res.json())
    .then((data)=> {
        allIssueDisplay(data.data)
        
    }
    )
    
})




allBtn.addEventListener('click', () => {
    allIssueDisplay(allIssues);
    manageSpinner(true);
    allBtn.classList.add('btn-primary')
    manageSpinner(false);
    openBtn.classList.remove('btn-primary')
    closedBtn.classList.remove('btn-primary')
});

openBtn.addEventListener('click', () => {
    allIssueDisplay(allIssues.filter(issue => issue.status === "open"));
    manageSpinner(true);
    openBtn.classList.add('btn-primary')
    manageSpinner(false);
    allBtn.classList.remove('btn-primary')
    closedBtn.classList.remove('btn-primary')

});

closedBtn.addEventListener('click', () => {
    allIssueDisplay(allIssues.filter(issue => issue.status === "closed"));
    manageSpinner(true);
    closedBtn.classList.add('btn-primary')
    manageSpinner(false);
    openBtn.classList.remove('btn-primary')
    allBtn.classList.remove('btn-primary')

});






















allIssueLoad ()