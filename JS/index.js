// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // List of command names to display in the background
    const commands = [
        'ls','alias','unalias','cat','tree','pwd','nmap','hashcat','touch','sudo',
        'cd','ping','echo','netstat','mkdir','rmdir','grep','traceroute','cp',
        'mv','chmod','wireshark','htop','ifconfig','unzip','ps','kill','vim',
        'tail','head','whoami','whois','find','wget'
    ];
    // Get the background element where commands will be displayed
    const bg = document.getElementById('bg-commands');

    // Function to generate the background with random command rows
    function generateBg() {
        bg.innerHTML = ''; // Clear previous content
        const lineH = parseFloat(getComputedStyle(bg).lineHeight); // Get line height
        const rows = Math.ceil(window.innerHeight / lineH) + 1; // Calculate number of rows needed
        for (let y = 0; y < rows; y++) {
            // Shuffle commands and join them into a string, repeat 10 times per row
            const txt = Array(10).fill(commands.sort(() => 0.5 - Math.random()).join(' ')).join(' ');
            const div = document.createElement('div'); // Create a new div for the row
            div.className = 'cmdRow'; // Assign class for styling
            div.style.top = (y * lineH) + 'px'; // Position the row vertically
            div.textContent = txt; // Set the text content
            bg.appendChild(div); // Add the row to the background
        }
    }

    generateBg(); // Generate the background initially
    // Regenerate the background on window resize (with debounce)
    window.addEventListener('resize', () => setTimeout(generateBg, 200));

    // Typewriter effect function for animating text
    function typewriter(el, text, speed, cb) {
        let i = 0;
        el.style.borderRight = '2px solid currentColor'; // Show cursor
        el.textContent = ''; // Clear previous text
        const t = setInterval(() => {
            if (i < text.length) el.textContent += text[i++]; // Add next character
            else {
                clearInterval(t); // Stop interval when done
                el.style.borderRight = 'none'; // Hide cursor
                if (cb) cb(); // Call callback if provided
            }
        }, speed);
    }

    // Get references to elements for the typewriter animation
    const who = document.getElementById('who-is'),
        name = document.getElementById('name'),
        heroText = document.getElementById('hero-text');

    // Sequence of typewriter animations with delays and callbacks
    setTimeout(() => {
        typewriter(who, 'whois ', 100, () => {
            typewriter(name, 'Maurizio Napoli', 100, () => {
                typewriter(heroText, 'Cyber Defense Specialist | Informatico in evoluzione', 50, () => {
                    document.getElementById('about-prompt').style.visibility = 'visible';
                    typewriter(document.getElementById('about-who'), 'cat', 100, () => {
                        typewriter(document.getElementById('about-name'), 'maurizio_napoli.txt', 100, () => {
                            typewriter(document.getElementById('about-text'),
                                'Sono Maurizio Napoli,\nspecialista in cybersecurity\ncon passione per la protezione\ndei sistemi digitali.', 50);
                        });
                    });
                });
            });
        });
    }, 250);

    // Toggle navigation menu on mobile when menu button is clicked
    document.getElementById('menu-toggle').onclick = () => {
        const nav = document.querySelector('#header nav');
        nav.classList.toggle('open'); // Toggle 'open' class
        // Update aria-label for accessibility
        document.getElementById('menu-toggle').setAttribute('aria-label',
            nav.classList.contains('open') ? 'Chiudi menu' : 'Apri menu');
    };
});
