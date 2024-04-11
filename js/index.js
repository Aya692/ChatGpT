const chatInput = document.querySelector("#chat-input")
const sendButton = document.querySelector("#send-btn")
const chatContainer = document.querySelector(".container")
const inner_chat = document.querySelector(".inner-chat")
const copy_btn = document.querySelector(".fa-copy")
const mode_btn = document.querySelector(".fa-sun")
const delete_btn = document.querySelector(".fa-trash-can")
const outer_chat = document.querySelector(".outer-chat")






   if(localStorage.getItem('message') !== null) {
    var allmessages = JSON.parse(localStorage.getItem('message'))
    showMessages() 
   }
   else {
    allmessages = []
   }

     


userText = null ;


copyResponse = (copy_btn) => {
    const responseTextHtml = copy_btn.parentElement.querySelector("p");
    navigator.clipboard.writeText(responseTextHtml.textContent)
}


const showcontent = () => {
    userText = chatInput.value.trim();
   
    allmessages.push(userText)
    var html = '' 
     html += ` <div class="content">
                        <div class="details">
                            <img src="images/chatbot.jpg" alt="">
                            <p>${userText}</p>
                        </div>
                     <i onClick ="copyResponse(this)" class="fa-regular fa-copy"></i>   
                 </div>`;
    console.log(html)
    const innerChatDiv = createElement(html , "inner-chat")
    chatContainer.appendChild(innerChatDiv)
    localStorage.setItem('message' , JSON.stringify(allmessages))

}


const handelOuterChat = () => {
  
    userText = chatInput.value.trim();
   
    allmessages.push(userText)
    var html = ''
    html += `<div class="content">
                        <div class="details">
                            <img src="images/user.jpg" alt="">
                            <p>${userText}</p>
                        </div>
                  </div>`;
                  console.log(html)
  
    const outerChatDiv = createElement(html , "outer-chat")
    chatContainer.appendChild(outerChatDiv)
    setTimeout(showcontent , 500)
   
    localStorage.setItem('message'  , JSON.stringify(allmessages))
   
}
mode_btn.addEventListener("click" , ()=> {
  document.body.classList.toggle("light-mode")

})
const createElement = (html , className) => {
    const chatDiv = document.createElement("div")
    chatDiv.classList.add("chat" ,className);
    chatDiv.innerHTML = html ;
    return chatDiv;
}
 
delete_btn.addEventListener("click" ,() => {
    if(confirm("Are you sure you want to delete all chats?"))
    {
        localStorage.removeItem('message')
      deleteFun()
    }
})

function deleteFun() {
  chatContainer.innerHTML = null    
}
sendButton.addEventListener("click" ,handelOuterChat);
 
function showMessages() {
   var content = '' ;
   for( var i=0 ; i < allmessages.length ; i++) {
      content += `<div class=" chat outer-chat">
                            <div class="content">
                                <div class="details">
                                    <img src="images/user.jpg" alt="">
                                    <p>${allmessages[i]}</p>
                                </div>
                            </div>
                        </div>
                        <div  class=" chat inner-chat">
                        <div class="content">
                            <div class="details">
                                <img src="images/chatbot.jpg" alt="">
                                <p>${allmessages[i]}</p>
                            </div>
                            <i class="fa-regular fa-copy"></i>          
                      </div>
                    </div>`
   }
   chatContainer.innerHTML = content
}