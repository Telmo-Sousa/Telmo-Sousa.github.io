$(document).ready(function() {
    const terminal = $('.terminal');
    const output = $('.output');
    const inputField = $('.input-field');

    const commands = {
        whois: "Hey! I'm Telmo Sousa, a developer from Viseu with a deep passion for all things tech.",
        links: "<span class='link' data-url='https://www.linkedin.com/in/telmo-sousa/'>LinkedIn</span><br><span class='link' data-url='https://www.github.com/telmo-sousa/'>GitHub</span><br><a class='link' href='media/telmo-sousa.pdf' download>Download CV</a>",
        projects: "mapEditor,\n Flappy Bat,\n Lady Gaga Website,\n myTrivia,\n invert, \n invaders, \n rust_to_mysql, \n rust_threads, \n guessing_game \n and more! :D",
        help: "Available commands: whois, projects, links, clear, help"
    };

    function appendOutput(text, isError = false) {
        const message = isError ? '<div class="error">' + text + '</div>' : '<div>' + text + '</div>';
        output.append(message);
        terminal.animate({ scrollTop: terminal.prop("scrollHeight") }, 300);
    }
    

    function processCommand(command) {
        const cmd = command.trim().toLowerCase();
        if (commands[cmd]) {
            appendOutput(commands[cmd]);
        } else if (cmd === 'clear') {
            output.empty(); 
        } else {
            appendOutput("Command not recognized. Type 'help' for a list of available commands.", true);
        }
    }

    $(document).on('click', '.link', function() {
        const url = $(this).data('url');
        window.open(url, '_blank');
    });

    inputField.on('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = inputField.val();
            appendOutput('> ' + command);
            processCommand(command);
            inputField.val('');
        }
    });

});
