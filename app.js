// Elements
const colEl = document.querySelectorAll('.col');
const btnChange = document.querySelector('#btn-change')

btnChange.addEventListener('click', (e) => {
    e.preventDefault();
        setColors();
});

document.addEventListener('click', (e) => {
    const type = e.target.dataset.type;

    if (type === 'lock') {
        node =
            e.target.classList.contains('fa-solid')
                ? e.target
                : e.target.children[0];

        node.classList.toggle('fa-lock');
        node.classList.toggle('fa-lock-open');
    };

    if (type === 'copy') {
        const color = e.target.textContent;

        copyToClipboard(color);
    }
});


// Functions
function generateColor() {
    const hex = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * 16)];
    };
    return color;
};

function setColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() :  [];
    

    colEl.forEach((cols, index) => {
        const text = cols.querySelector('h2');
        const btn = cols.querySelector('button');
        const isLocked = cols.querySelector('i').classList.contains('fa-lock');

        if (isLocked) {
            colors.push(text.textContent)
            return
        };

        const color = isInitial 
        ? colors[index]
            ? colors[index]
            : generateColor()
        : generateColor();

        if (!isInitial) {
            colors.push(color)
        }

        cols.style.background = color;
        text.textContent = color;

        changeTextColor(text, color);
        changeTextColor(btn, color);
    });
    updateHash(colors)
};

function changeTextColor(text, color) {
    const luminance = chroma(color).luminance();

    text.style.color = luminance > 0.5 ? 'black' : 'white';
};

function copyToClipboard(color) {
    return navigator.clipboard.writeText(color)
};

function updateHash(colors = []) {
    document.location.hash = colors.map((cols) => {
        return cols.substring(1)
    }).join('-');
};

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map((col) => '#' + col);
    };
    return [];
};

setColors(true);