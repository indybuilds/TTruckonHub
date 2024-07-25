// script.js

// Funkcija za dodavanje podataka u tabelu
function addDataToTable(data) {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    Object.keys(data).forEach(key => {
        const newCell = newRow.insertCell();
        newCell.textContent = data[key];
    });
}

// Funkcija za učitavanje podataka iz localStorage i prikazivanje u tabeli
function loadData() {
    const dataEntries = JSON.parse(localStorage.getItem('dataEntries')) || [];
    dataEntries.forEach(entry => addDataToTable(entry));
}

// Funkcija za izvoz podataka u Excel
function exportToExcel() {
    // Uzimanje podataka iz localStorage
    const dataEntries = JSON.parse(localStorage.getItem('dataEntries')) || [];

    // Kreiranje WorkBook-a i WorkSheet-a
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataEntries);

    // Dodavanje WorkSheet-a u WorkBook
    XLSX.utils.book_append_sheet(wb, ws, "TruckHubData");

    // Generisanje Excel fajla i preuzimanje
    XLSX.writeFile(wb, 'TruckHubData.xlsx');
}

// Dodavanje event listener-a za dugme za izvoz
document.getElementById('exportButton').addEventListener('click', exportToExcel);

// Funkcija za rukovanje unosom podataka
function handleFormSubmit(event) {
    event.preventDefault();

    const data = {
        date: document.getElementById('date').value,
        driverName: document.getElementById('driverName').value,
        truckName: document.getElementById('truckName').value,
        loadingLocation: document.getElementById('loadingLocation').value,
        unloadingLocation: document.getElementById('unloadingLocation').value,
        tripLength: document.getElementById('tripLength').value,
    };

    // Dodavanje unosa u tabelu
    addDataToTable(data);

    // Čuvanje podataka u localStorage
    const dataEntries = JSON.parse(localStorage.getItem('dataEntries')) || [];
    dataEntries.push(data);
    localStorage.setItem('dataEntries', JSON.stringify(dataEntries));

    // Resetovanje forme
    event.target.reset();
}

// Postavljanje event listener-a za submit forme
document.getElementById('dataForm').addEventListener('submit', handleFormSubmit);

// Učitavanje postojećih podataka prilikom učitavanja stranice
window.onload = loadData;
