// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // List of command names for background effect
    const commands = [
        'ls','alias','unalias','cat','tree','pwd','nmap','hashcat','touch','sudo',
        'cd','ping','echo','netstat','mkdir','rmdir','grep','traceroute','cp',
        'mv','chmod','wireshark','htop','ifconfig','unzip','ps','kill','vim',
        'tail','head','whoami','whois','find','wget'
    ];
    const bg = document.getElementById('bg-commands');
    let resizeTimeout;

    // Generate background rows with random commands
    function generateBg() {
        bg.innerHTML = '';
        const lineH = parseFloat(getComputedStyle(bg).lineHeight);
        const rows = Math.ceil(window.innerHeight / lineH) + 1;
        const minW = window.innerWidth;
        // Helper element to measure text width
        const measure = document.createElement('span');
        measure.style.visibility = 'hidden';
        measure.style.position = 'absolute';
        document.body.appendChild(measure);

        for (let y = 0; y < rows; y++) {
            // Shuffle commands and join them into a string
            const shuffled = commands.slice().sort(() => Math.random() - 0.5);
            let txt = shuffled.join(' ');
            measure.textContent = txt;
            // Repeat the string until it fills the screen width
            while (measure.getBoundingClientRect().width < minW) {
                txt += ' ' + txt;
                measure.textContent = txt;
            }
            // Create a row and add it to the background
            const div = document.createElement('div');
            div.className = 'cmdRow';
            div.style.top = (y * lineH) + 'px';
            div.textContent = txt;
            bg.appendChild(div);
        }
        document.body.removeChild(measure);
    }

    // Initial background generation
    generateBg();
    // Regenerate background on window resize (debounced)
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(generateBg, 200);
    });

    // Typewriter effect for text elements
    function typewriter(el, text, speed, cb) {
        let i = 0;
        el.style.borderRight = '2px solid currentColor';
        el.textContent = '';
        const interval = setInterval(() => {
            if (i < text.length) {
                el.textContent += text[i++];
            } else {
                clearInterval(interval);
                el.style.borderRight = 'none';
                if (cb) cb();
            }
        }, speed);
    }

    // Elements for the animated intro
    const who = document.getElementById('who-is');
    const name = document.getElementById('name');
    const heroText = document.getElementById('hero-text');

    // Sequential typewriter animation
    setTimeout(() => {
        typewriter(who, 'cat ', 100, () => {
            setTimeout(() => {
                typewriter(name, 'contact.txt', 100, () => {
                    setTimeout(() => {
                        typewriter(heroText, "Potete contattarmi all'indirizzo mail ", 50, () => {
                            // Add email link with typewriter effect
                            const link = document.createElement('a');
                            heroText.appendChild(link);
                            typewriter(link, 'maurizio.napoli@nekblu.com', 50, () => {
                                link.href = 'mailto:maurizio.napoli@nekblu.com';
                                setTimeout(() => {
                                    // Show socials after animation
                                    document.getElementById('socials').classList.add('slide-up');
                                }, 500);
                            });
                        });
                    }, 250);
                });
            }, 250);
        });
    }, 250);

    // Mobile menu toggle
    const toggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('#header nav');
    toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        toggle.setAttribute(
            'aria-label',
            nav.classList.contains('open') ? 'Chiudi menu' : 'Apri menu'
        );
    });
});
