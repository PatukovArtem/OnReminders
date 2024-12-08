const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

let currentMonth = 0; // Январь
const calendarBody = document.getElementById('calendarBody');
const monthName = document.getElementById('monthName');

function renderCalendar(month) {
    calendarBody.innerHTML = ''; // Очистить предыдущие дни
    monthName.textContent = monthNames[month];

    const firstDay = new Date(2023, month, 1).getDay(); // Первый день месяца
    const daysInMonth = new Date(2023, month + 1, 0).getDate(); // Количество дней в месяце

    let row = document.createElement('tr');
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement('td')); // Пустые ячейки до первого дня
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('td');
        cell.textContent = day;
        row.appendChild(cell);

        if ((day + firstDay) % 7 === 0) { // Если конец недели, добавляем новую строку
            calendarBody.appendChild(row);
            row = document.createElement('tr');
        }
    }
    calendarBody.appendChild(row); // Добавить последнюю строку
}

document.getElementById('prevMonth').addEventListener('click', () => {
    currentMonth = (currentMonth - 1 + 12) % 12; // Переход к предыдущему месяцу
    renderCalendar(currentMonth);
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentMonth = (currentMonth + 1) % 12; // Переход к следующему месяцу
    renderCalendar(currentMonth);
});

// Инициализация календаря
renderCalendar(currentMonth);
