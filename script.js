function load() {
    const loadFrom = document.getElementById("loadFrom").value;
    const loadTo = document.getElementById("loadTo").value;
    const memoryValue = document.getElementById(loadFrom).value;

    if (memoryValue) {

        const memorySection = document.getElementById(loadFrom);
        memorySection.scrollIntoView({ behavior: "smooth", block: "center" });

        animateTransfer(document.getElementById(loadFrom), document.getElementById(loadTo), memoryValue);
        setTimeout(() => {
            document.getElementById(loadTo).value = memoryValue;
            document.getElementById(loadFrom).value = "";
            addHistory(`LOAD ${loadFrom},${loadTo}`);
        }, 700); 
    } else {
        alert(`Memory location ${loadFrom} is empty.`);
    }
}

function store() {
    const storeFrom = document.getElementById("storeFrom").value;
    const storeTo = document.getElementById("storeTo").value;
    const registerValue = document.getElementById(storeFrom).value;

    if (registerValue) {
        const cpuSection = document.getElementById(storeTo); 
        cpuSection.scrollIntoView({ behavior: "smooth", block: "center" });

        animateTransfer(document.getElementById(storeFrom), document.getElementById(storeTo), registerValue);

        setTimeout(() => {
            document.getElementById(storeTo).value = registerValue;
            addHistory(`STORE ${storeFrom},${storeTo}`);
        }, 700); // Delay matches the animation duration
    } else {
        alert(`Register ${storeFrom} is empty.`);
    }
}

function add() {
    const R1 = parseInt(document.getElementById("R1").value);
    const R2 = parseInt(document.getElementById("R2").value);

    if (!isNaN(R1) && !isNaN(R2)) {
        document.getElementById("R3").value = R1 + R2;
        addHistory("ADD R3, R1, R2");

        const r3Input = document.getElementById("R3");
        r3Input.classList.add("color-changed");

        // Scroll to the CPU and memory sections after addition
        const cpuSection = document.getElementById("R3"); 
        const memorySection = document.getElementById("memory"); 
        cpuSection.scrollIntoView({ behavior: "smooth", block: "center" });
        memorySection.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => {
            r3Input.classList.remove("color-changed");
        }, 2000); 
    } else {
        alert("R1 or R2 is empty.");
    }
}

function sub() {
    const R1 = parseInt(document.getElementById("R1").value);
    const R2 = parseInt(document.getElementById("R2").value);

    if (!isNaN(R1) && !isNaN(R2)) {
        document.getElementById("R3").value = R1 - R2;
        addHistory("SUB R3, R1, R2");

        const r3Input = document.getElementById("R3");
        r3Input.classList.add("color-changed");

        // Scroll to the CPU and memory sections after subtraction
        const cpuSection = document.getElementById("R3"); 
        const memorySection = document.getElementById("memory"); 
        cpuSection.scrollIntoView({ behavior: "smooth", block: "center" });
        memorySection.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => {
            r3Input.classList.remove("color-changed");
        }, 2000); // duration to keep the color change
    } else {
        alert("R1 or R2 is empty.");
    }
}
function mul() {
    const R1 = parseInt(document.getElementById("R1").value);
    const R2 = parseInt(document.getElementById("R2").value);

    if (!isNaN(R1) && !isNaN(R2)) {
        document.getElementById("R3").value = R1 * R2;
        addHistory("MUL R3, R1, R2");

        const r3Input = document.getElementById("R3");
        r3Input.classList.add("color-changed");

        // Scroll to the CPU and memory sections after addition
        const cpuSection = document.getElementById("R3"); 
        const memorySection = document.getElementById("memory"); 
        cpuSection.scrollIntoView({ behavior: "smooth", block: "center" });
        memorySection.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => {
            r3Input.classList.remove("color-changed");
        }, 2000); 
    } else {    
        alert("R1 or R2 is empty.");
    }
}

function div() {
    const R1 = parseInt(document.getElementById("R1").value);
    const R2 = parseInt(document.getElementById("R2").value);

    if (!isNaN(R1) && !isNaN(R2)) {
        document.getElementById("R3").value = R1 / R2;
        addHistory("DIV R3, R1, R2");

        const r3Input = document.getElementById("R3");
        r3Input.classList.add("color-changed");

        // Scroll to the CPU and memory sections after subtraction
        const cpuSection = document.getElementById("R3"); 
        const memorySection = document.getElementById("memory"); 
        cpuSection.scrollIntoView({ behavior: "smooth", block: "center" });
        memorySection.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => {
            r3Input.classList.remove("color-changed");
        }, 2000); // duration to keep the color change
    } else {
        alert("R1 or R2 is empty.");
    }
}


function addHistory(action) {
    const historyTable = document.getElementById("historyTable").getElementsByTagName("tbody")[0];
    const newRow = historyTable.insertRow();

    const actionCell = newRow.insertCell(0);
    actionCell.textContent = action;
}



// TOGGLE OF HISTORY SECTION
const toggleHistoryButton = document.getElementById('toggleHistoryButton');
const historySection = document.getElementById('history');
const ipadContainer = document.querySelector('.ipad-container'); 
const closeHistoryButton = document.getElementById('closeHistoryButton'); 
const historyToggleContainer = document.querySelector('.history-toggle-container');
const instructionButtons = document.querySelector('.instruction-buttons');


toggleHistoryButton.addEventListener('click', () => {

    if (historySection.style.display === 'none') {
        historySection.style.display = 'block'; 
        setTimeout(() => {
            historySection.classList.add('show'); 
            ipadContainer.classList.add('history-visible'); 
            instructionButtons.classList.add('history-visible'); 
              
            toggleHistoryButton.style.display = 'none';
            historyToggleContainer.style.display = 'none';
            

        }, 70);
    }
});


closeHistoryButton.addEventListener('click', () => {
    historySection.classList.remove('show');
    setTimeout(() => {
        historySection.style.display = 'none'; 
        ipadContainer.classList.remove('history-visible'); 
        instructionButtons.classList.remove('history-visible'); 
            
        toggleHistoryButton.style.display = 'block';
        historyToggleContainer.style.display = 'block';
    }, 300); 
});



function animateTransfer(fromElement, toElement, value) {
    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();

    const transferBox = document.createElement("div");
    transferBox.classList.add("transfer-box");
    transferBox.textContent = value;

    transferBox.style.left = `${fromRect.left + window.scrollX}px`;
    transferBox.style.top = `${fromRect.top + window.scrollY}px`;

    document.body.appendChild(transferBox);

    setTimeout(() => {
        transferBox.style.transform = `translate(${toRect.left - fromRect.left}px, ${toRect.top - fromRect.top}px)`;
    }, 10);

    setTimeout(() => {
        document.body.removeChild(transferBox);
    }, 1400); 
}

