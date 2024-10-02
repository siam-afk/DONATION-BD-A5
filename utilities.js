let totalBalance = 1000;
let donationHistory = [];

function toggleSection(section) {
    const donateSection = document.querySelector('.donate');
    const historySection = document.querySelector('.history');
    const donateButton = document.getElementById('donateButton');
    const historyButton = document.getElementById('historyButton');

    donateSection.style.display = section === 'donate' ? 'block' : 'none';
    historySection.style.display = section === 'history' ? 'block' : 'none';
    donateButton.classList.toggle('active', section === 'donate');
    historyButton.classList.toggle('active', section === 'history');
    if (section === 'history') displayHistory();
}

window.onload = () => toggleSection('donate');

function validateDonation(event, card) {
    event.preventDefault();
    const donationInput = document.getElementById(`donate-input-${card}`).value;
    const cardTitle = document.getElementById(`card-title-${card}`).innerText;

    if (donationInput > 0 && donationInput <= totalBalance) {
        const donationAmount = parseFloat(donationInput);
        updateBalances(donationAmount, card);
        recordDonation(donationAmount, cardTitle);
        showModal();
        document.getElementById(`donate-input-${card}`).value = '';
    } else {
        alert(donationInput <= 0 ? "Enter a valid donation." : "Insufficient balance.");
    }
}

function updateBalances(donationAmount, card) {
    totalBalance -= donationAmount;
    document.querySelector('.balance span').textContent = totalBalance;

    const cardBalance = document.getElementById(`card-balance-${card}`);
    cardBalance.textContent = parseFloat(cardBalance.textContent) + donationAmount;
}

function recordDonation(amount, title) {
    donationHistory.push(`${amount} Taka is donated for ${title} <br><span>Date: ${new Date()}</span>`);
}

function displayHistory() {
    const historyContainer = document.getElementById('historyList');
    historyContainer.innerHTML = donationHistory.length
        ? donationHistory.map(d => `<div class="donation-card"><p>${d}</p></div>`).join('')
        : '<p>Your donation history will appear here.</p>';
}

function showModal() {
    document.getElementById('donationModal').style.display = "block";
}

function closeModal() {
    document.getElementById('donationModal').style.display = "none";
}

function updateBalanceDisplay() {
    document.querySelector('.balance span').textContent = totalBalance;
}