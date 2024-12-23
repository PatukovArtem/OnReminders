const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

let currentMonth = 0; // Январь
const calendarBody = document.getElementById('calendarBody');
const monthName = document.getElementById('monthName');
const reminders = JSON.parse(localStorage.getItem('reminders')) || {}; // Загружаем напоминания из localStorage
const modal = document.getElementById("reminderModal");
const closeModal = document.getElementsByClassName("close")[0];
const saveReminderButton = document.getElementById("saveReminderButton");
const newReminderInput = document.getElementById("newReminderInput");
let selectedDay; // Переменная для хранения выбранного дня

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
        cell.addEventListener('click', () => selectDay(day)); // Добавляем обработчик клика
        row.appendChild(cell);

        if ((day + firstDay) % 7 === 0) { // Если конец недели, добавляем новую строку
            calendarBody.appendChild(row);
            row = document.createElement('tr');
        }
    }
    calendarBody.appendChild(row); // Добавить последнюю строку
}

function selectDay(day) {
    selectedDay = `${day} ${monthNames[currentMonth]}`; // Форматируем выбранный день
    const reminderList = reminders[selectedDay] || []; // Получаем напоминания для выбранного дня

    // Отображаем напоминания в container1
    const container1 = document.querySelector('.container1');
    container1.innerHTML = `<h1>Напоминания для ${selectedDay}</h1>`; // Заголовок
    if (reminderList.length === 0) {
        const noRminderMessage = document.createElement('p')
        noRminderMessage.textContent = "Нет напоминаний на этот день";
        noRminderMessage.classList.add('p')
        container1.appendChild(noRminderMessage);
    } else {
        const ul = document.createElement('ul');
        ul.classList.add('ul')
        reminderList.forEach((reminder, index) => {
            const li = document.createElement('li');
            li.classList.add('li')////присвоение класса
            li.textContent = reminder;

            // Создаем кнопку удаления
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.addEventListener('click', () => {
                deleteReminder(index); // Удаляем напоминание по индексу
            });

            li.appendChild(deleteButton); // Добавляем кнопку удаления к элементу списка
            ul.appendChild(li);
        });
        container1.appendChild(ul);
    }

    // Добавляем кнопку "Добавить напоминание"
    const addReminderButton = document.createElement('button');
    addReminderButton.textContent = 'Добавить напоминание';
    addReminderButton.classList.add('btn3')
    addReminderButton.addEventListener('click', () => {
        modal.style.display = "block"; // Открываем модальное окно
    });
    container1.appendChild(addReminderButton);
}

// Функция для удаления напоминания
function deleteReminder(index) {
    reminders[selectedDay].splice(index, 1); // Удаляем напоминание по индексу
    if (reminders[selectedDay].length === 0) {
        delete reminders[selectedDay]; // Удаляем день, если нет нап оминаний
    }
    localStorage.setItem('reminders', JSON.stringify(reminders)); // Сохраняем изменения в localStorage
    selectDay(parseInt(selectedDay.split(' ')[0])); // Обновляем отображение напоминаний
}

// Сохранение нового напоминания
saveReminderButton.addEventListener('click', () => {
    const reminderInput = newReminderInput.value.trim();
    if (reminderInput) {
        if (!reminders[selectedDay]) {
            reminders[selectedDay] = []; // Создаем массив, если его нет
        }
        reminders[selectedDay].push(reminderInput); // Добавляем новое напоминание
        localStorage.setItem('reminders', JSON.stringify(reminders)); // Сохраняем в localStorage
        newReminderInput.value = ''; // Очищаем поле ввода
        modal.style.display = "none"; // Закрываем модальное окно
        selectDay(parseInt(selectedDay.split(' ')[0])); // Обновляем отображение напоминаний
    }
});

// Закрытие модального окна
closeModal.addEventListener('click', () => {
    modal.style.display = "none"; // Закрываем модальное окно
});

// Функции для переключения между месяцами
function goToPreviousMonth() {
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1; // Переход к предыдущему месяцу
    renderCalendar(currentMonth); // Перерисовка календаря
}

function goToNextMonth() {
    currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1; // Переход к следующему месяцу
    renderCalendar(currentMonth); // Перерисовка календаря
}


// Добавление кнопок для переключения месяцев
const prevButton = document.querySelector('#prevMonth');
prevButton.addEventListener('click', goToPreviousMonth);

const nextButton = document.querySelector('#nextMonth');
nextButton.addEventListener('click', goToNextMonth);

// Инициализация календаря
renderCalendar(currentMonth); 