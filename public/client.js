const socket = io();
let textarea = document.querySelector('#textarea')
let name;
let messageArea = document.querySelector('.message__area');
//let messageArea = document.getElementById("mainContent");
console.log(messageArea);
do {
    name = prompt("Please enter your name")
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(msg){
    let msgObj = {
        user:name,
        message:msg.trim()
    }

    // Append
    appendMessage(msgObj,'outgoing')
    textarea.value = '';
    scrollToBottom()
    // Send to Server

    socket.emit('message',msgObj)

    
}

function appendMessage(msgObj, type){
    let mainDiv = document.createElement('div')
    
    let className = type
    mainDiv.classList.add(className,'message')
    let markup = `
        <h4>${msgObj.user}</h4>
        <p>${msgObj.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Receive Message

socket.on('message',(msgObj) =>{
    appendMessage(msgObj,'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}