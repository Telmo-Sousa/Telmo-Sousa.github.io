document.addEventListener('DOMContentLoaded', function() {
    const output = document.querySelector('.output');
    
    const welcomeMessage = document.createElement('div');
    welcomeMessage.style.color = 'var(--purple)';
    welcomeMessage.textContent = "Hey there visitor, welcome to my web terminal! For a list of available commands, type 'help'.";
    output.appendChild(welcomeMessage);
});
