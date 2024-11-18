document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('customScheduleForm');
  const scheduleContainer = document.getElementById('scheduleContainer');
  const saveParametersButton = document.createElement('button');
  const loadScheduleButton = document.createElement('button');

  saveParametersButton.textContent = 'Сохранить расписание';
  loadScheduleButton.textContent = 'Загрузить сохраненное расписание';
  saveParametersButton.type = 'button';
  loadScheduleButton.type = 'button';

  form.appendChild(saveParametersButton);
  form.appendChild(loadScheduleButton);

  function updateTimeLabels() {
    const startLabel = document.getElementById('startTimeLabel');
    const endLabel = document.getElementById('endTimeLabel');
    const startTime = document.getElementById('timeStart').value;
    const endTime = document.getElementById('timeEnd').value;

    startLabel.textContent = minutesToTime(startTime);
    endLabel.textContent = minutesToTime(endTime);
  }

  function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${('0' + hours).slice(-2)}:${('0' + mins).slice(-2)}`;
  }

  function saveParameters() {
    const formData = new FormData(form);
    const parameters = {};

    formData.forEach((value, key) => {
      if (!parameters[key]) {
        parameters[key] = [];
      }
      parameters[key].push(value);
    });

    localStorage.setItem('raceScheduleParameters', JSON.stringify(parameters));

    if (scheduleContainer.innerHTML) {
      localStorage.setItem('lastRaceSchedule', scheduleContainer.innerHTML);
    }

    alert('Расписание сохранено!');
  }

  function loadParameters() {
    const savedParameters = JSON.parse(localStorage.getItem('raceScheduleParameters'));
    if (savedParameters) {
      for (const key in savedParameters) {
        const checkboxes = document.querySelectorAll(input[name="${key}"]);
        checkboxes.forEach((checkbox) => {
          checkbox.checked = savedParameters[key].includes(checkbox.value);
        });
      }
    }
    alert('Расписание загружено!');
  }

  function createSchedule() {
    const selectedCountries = Array.from(document.querySelectorAll('input[name="country"]:checked')).map(input => input.value);
    const selectedSessionTypes = Array.from(document.querySelectorAll('input[name="sessionType"]:checked')).map(input => input.value);

    const startTime = parseInt(document.getElementById('timeStart').value, 10);
    const endTime = parseInt(document.getElementById('timeEnd').value, 10);

  const allSessions = [
    {
      country: 'bahrain',
      events: [
        { date: '29.02.2024 14:30', title: 'Гран-при Бахрейна. Свободная практика 1', type: 'practice' },
        { date: '29.02.2024 18:00', title: 'Гран-при Бахрейна. Свободная практика 2', type: 'practice' },
        { date: '01.03.2024 14:30', title: 'Гран-при Бахрейна. Свободная практика 3', type: 'practice' },
        { date: '01.03.2024 19:00', title: 'Гран-при Бахрейна. Квалификация', type: 'qualifying' },
        { date: '02.03.2024 18:00', title: '🏁 Гран-при Бахрейна. Гонка (57 кругов, 308.238 км)', type: 'race' },
      ]
    },
    {
      country: 'saudi-arabia',
      events: [
        { date: '07.03.2024 16:30', title: 'Гран-при Саудовской Аравии. Свободная практика 1', type: 'practice' },
        { date: '07.03.2024 20:10', title: 'Гран-при Саудовской Аравии. Свободная практика 2', type: 'practice' },
        { date: '08.03.2024 16:30', title: 'Гран-при Саудовской Аравии. Свободная практика 3', type: 'practice' },
        { date: '08.03.2024 20:00', title: 'Гран-при Саудовской Аравии. Квалификация', type: 'qualifying' },
        { date: '09.03.2024 20:00', title: '🏁 Гран-при Саудовской Аравии. Гонка (50 кругов, 308.450 км)', type: 'race' },
      ]
    },
    {
      country: 'australia',
      events: [
        { date: '22.03.2024 04:30', title: 'Гран-при Австралии. Свободная практика 1', type: 'practice' },
        { date: '22.03.2024 08:00', title: 'Гран-при Австралии. Свободная практика 2', type: 'practice' },
        { date: '23.03.2024 04:30', title: 'Гран-при Австралии. Свободная практика 3', type: 'practice' },
        { date: '23.03.2024 08:00', title: 'Гран-при Австралии. Квалификация', type: 'qualifying' },
        { date: '24.03.2024 08:30', title: '🏁 Гран-при Австралии. Гонка (58 кругов, 306.124 км)', type: 'race' },
      ]
    },
    {
      country: 'japan',
      events: [
        { date: '05.04.2024 05:30', title: 'Гран-при Японии. Свободная практика 1', type: 'practice' },
        { date: '05.04.2024 09:00', title: 'Гран-при Японии. Свободная практика 2', type: 'practice' },
        { date: '06.04.2024 05:30', title: 'Гран-при Японии. Свободная практика 3', type: 'practice' },
        { date: '06.04.2024 09:00', title: 'Гран-при Японии. Квалификация', type: 'qualifying' },
        { date: '07.04.2024 08:00', title: '🏁 Гран-при Японии. Гонка (53 круга, 307.471 км)', type: 'race' },
      ]
    },
    {
      country: 'china',
      events: [
        { date: '19.04.2024 06:30', title: 'Гран-при Китая. Свободная практика 1', type: 'practice' },
        { date: '19.04.2024 10:30', title: 'Гран-при Китая. Спринт-квалификация', type: 'sprint-qualifying' },
        { date: '20.04.2024 06:30', title: 'Гран-при Китая. Спринт', type: 'sprint' },
        { date: '20.04.2024 10:00', title: 'Гран-при Китая. Квалификация', type: 'qualifying' },
        { date: '21.04.2024 10:00', title: '🏁 Гран-при Китая. Гонка (56 кругов, 305.066 км)', type: 'race' },
      ]
    },
    {
      country: 'usa',
      events: [
        { date: '03.05.2024 19:30', title: 'Гран-при Майами. Свободная практика 1', type: 'practice' },
        { date: '03.05.2024 23:30', title: 'Гран-при Майами. Спринт-квалификация', type: 'sprint-qualifying' },
        { date: '04.05.2024 19:30', title: 'Гран-при Майами. Спринт', type: 'sprint' },
        { date: '04.05.2024 23:30', title: 'Гран-при Майами. Квалификация', type: 'qualifying' },
        { date: '05.05.2024 20:30', title: '🏁 Гран-при Майами. Гонка (57 кругов, 308.326 км)', type: 'race' },
      ]
    },
    {
      country: 'italy',
      events: [
        { date: '17.05.2024 14:30', title: 'Гран-при Эмилии-Романьи. Свободная практика 1', type: 'practice' },
        { date: '17.05.2024 18:00', title: 'Гран-при Эмилии-Романьи. Свободная практика 2', type: 'practice' },
        { date: '18.05.2024 14:30', title: 'Гран-при Эмилии-Романьи. Свободная практика 3', type: 'practice' },
        { date: '18.05.2024 18:00', title: 'Гран-при Эмилии-Романьи. Квалификация', type: 'qualifying' },
        { date: '19.05.2024 16:00', title: '🏁 Гран-при Эмилии-Романьи. Гонка (63 круга, 309.049 км)', type: 'race' },
      ]
    },
    {
      country: 'monaco',
      events: [
        { date: '24.05.2024 14:30', title: 'Гран-при Монако. Свободная практика 1', type: 'practice' },
        { date: '24.05.2024 18:00', title: 'Гран-при Монако. Свободная практика 2', type: 'practice' },
        { date: '25.05.2024 13:30', title: 'Гран-при Монако. Свободная практика 3', type: 'practice' },
        { date: '26.05.2024 16:00', title: 'Гран-при Монако. Квалификация', type: 'qualifying' },
        { date: '26.05.2024 16:00', title: '🏁 Гран-при Монако. Гонка (78 кругов, 260.286 км)', type: 'race' },
      ]
    },
    {
      country: 'canada',
      events: [
        { date: '07.06.2024 20:30', title: 'Гран-при Канады. Свободная практика 1', type: 'practice' },
        { date: '07.06.2024 00:00', title: 'Гран-при Канады. Свободная практика 2', type: 'practice' },
        { date: '08.06.2024 20:30', title: 'Гран-при Канады. Свободная практика 3', type: 'practice' },
        { date: '09.06.2024 00:00', title: 'Гран-при Канады. Квалификация', type: 'qualifying' },
        { date: '09.06.2024 21:00', title: '🏁 Гран-при Канады. Гонка (70 кругов, 305.270 км)', type: 'race' },
      ]
    },
    {
      country: 'spain',
      events: [
        { date: '21.06.2024 14:30', title: 'Гран-при Испании. Свободная практика 1', type: 'practice' },
        { date: '21.06.2024 18:00', title: 'Гран-при Испании. Свободная практика 2', type: 'practice' },
        { date: '22.06.2024 13:30', title: 'Гран-при Испании. Свободная практика 3', type: 'practice' },
        { date: '22.06.2024 16:00', title: 'Гран-при Испании. Квалификация', type: 'qualifying' },
        { date: '23.06.2024 16:00', title: '🏁 Гран-при Испании. Гонка (66 кругов, 307.236 км)', type: 'race' },
      ]
    },
    {
      country: 'austria',
      events: [
        { date: '28.06.2024 13:30', title: 'Гран-при Австрии. Свободная практика 1', type: 'practice' },
        { date: '28.06.2024 17:00', title: 'Гран-при Австрии. Спринт-квалификация', type: 'sprint-qualifying' },
        { date: '29.06.2024 13:30', title: 'Гран-при Австрии. Спринт', type: 'sprint' },
        { date: '30.06.2024 14:00', title: 'Гран-при Австрии. Квалификация', type: 'qualifying' },
        { date: '30.06.2024 16:00', title: '🏁 Гран-при Австрии. Гонка (71 круг, 306.452 км)', type: 'race' },
      ]
    },
    {
      country: 'uk',
      events: [
        { date: '05.07.2024 14:30', title: 'Гран-при Великобритании. Свободная практика 1', type: 'practice' },
        { date: '05.07.2024 18:00', title: 'Гран-при Великобритании. Свободная практика 2', type: 'practice' },
        { date: '06.07.2024 13:30', title: 'Гран-при Великобритании. Свободная практика 3', type: 'practice' },
        { date: '06.07.2024 17:00', title: 'Гран-при Великобритании. Квалификация', type: 'qualifying' },
        { date: '07.07.2024 14:30', title: '🏁 Гран-при Великобритании. Гонка (52 круга, 306.198 км)', type: 'race' },
      ]
    },
    {
      country: 'hungary',
      events: [
        { date: '19.07.2024 14:30', title: 'Гран-при Венгрии. Свободная практика 1', type: 'practice' },
        { date: '19.07.2024 18:00', title: 'Гран-при Венгрии. Свободная практика 2', type: 'practice' },
        { date: '20.07.2024 14:30', title: 'Гран-при Венгрии. Свободная практика 3', type: 'practice' },
        { date: '20.07.2024 17:00', title: 'Гран-при Венгрии. Квалификация', type: 'qualifying' },
        { date: '21.07.2024 16:00', title: '🏁 Гран-при Венгрии. Гонка (70 кругов, 306.630 км)', type: 'race' },
      ]
    },
    {
      country: 'belgium',
      events: [
        { date: '26.07.2024 14:30', title: 'Гран-при Бельгии. Свободная практика 1', type: 'practice' },
        { date: '26.07.2024 18:00', title: 'Гран-при Бельгии. Свободная практика 2', type: 'practice' },
        { date: '27.07.2024 14:30', title: 'Гран-при Бельгии. Свободная практика 3', type: 'practice' },
        { date: '27.07.2024 17:00', title: 'Гран-при Бельгии. Квалификация', type: 'qualifying' },
        { date: '28.07.2024 16:00', title: '🏁 Гран-при Бельгии. Гонка (44 круга, 308.052 км)', type: 'race' },
      ]
    },
    {
      country: 'netherlands',
      events: [
        { date: '23.08.2024 14:30', title: 'Гран-при Нидерландов. Свободная практика 1', type: 'practice' },
        { date: '23.08.2024 18:00', title: 'Гран-при Нидерландов. Свободная практика 2', type: 'practice' },
        { date: '24.08.2024 13:30', title: 'Гран-при Нидерландов. Свободная практика 3', type: 'practice' },
        { date: '24.08.2024 17:00', title: 'Гран-при Нидерландов. Квалификация', type: 'qualifying' },
        { date: '25.08.2024 16:00', title: '🏁 Гран-при Нидерландов. Гонка (72 круга, 306.587 км)', type: 'race' },
      ]
    },
    {
      country: 'italy-monza',
      events: [
        { date: '30.08.2024 14:30', title: 'Гран-при Италии. Свободная практика 1', type: 'practice' },
        { date: '30.08.2024 18:00', title: 'Гран-при Италии. Свободная практика 2', type: 'practice' },
        { date: '31.08.2024 13:30', title: 'Гран-при Италии. Свободная практика 3', type: 'practice' },
        { date: '31.08.2024 17:00', title: 'Гран-при Италии. Квалификация', type: 'qualifying' },
        { date: '01.09.2024 16:00', title: '🏁 Гран-при Италии. Гонка (53 круга, 306.720 км)', type: 'race' },
      ]
    },
    {
      country: 'azerbaijan',
      events: [
        { date: '13.09.2024 14:30', title: 'Гран-при Азербайджана. Свободная практика 1', type: 'practice' },
        { date: '13.09.2024 18:30', title: 'Гран-при Азербайджана. Свободная практика 2', type: 'practice' },
        { date: '14.09.2024 12:30', title: 'Гран-при Азербайджана. Свободная практика 3', type: 'practice' },
        { date: '14.09.2024 16:00', title: 'Гран-при Азербайджана. Квалификация', type: 'qualifying' },
        { date: '15.09.2024 16:00', title: '🏁 Гран-при Азербайджана. Гонка (51 круг, 306.049 км)', type: 'race' },
      ]
    },
    {
      country: 'singapore',
      events: [
        { date: '20.09.2024 12:30', title: 'Гран-при Сингапура. Свободная практика 1', type: 'practice' },
        { date: '20.09.2024 16:00', title: 'Гран-при Сингапура. Свободная практика 2', type: 'practice' },
        { date: '21.09.2024 12:30', title: 'Гран-при Сингапура. Свободная практика 3', type: 'practice' },
        { date: '21.09.2024 16:00', title: 'Гран-при Сингапура. Квалификация', type: 'qualifying' },
        { date: '22.09.2024 16:00', title: '🏁 Гран-при Сингапура. Гонка (62 круга, 306.143 км)', type: 'race' },
      ]
    },
    {
      country: 'usa-austin',
      events: [
        { date: '18.10.2024 12:30', title: 'Гран-при США. Свободная практика 1', type: 'practice' },
        { date: '19.10.2024 20:30', title: 'Гран-при США. Спринт-квалификация', type: 'sprint-qualifying' },
        { date: '19.10.2024 21:30', title: 'Гран-при США. Спринт', type: 'sprint' },
        { date: '20.10.2024 00:30', title: 'Гран-при США. Квалификация', type: 'qualifying' },
        { date: '20.10.2024 22:00', title: '🏁 Гран-при США. Гонка (56 кругов, 308.405 км)', type: 'race' },
      ]
    },
    {
      country: 'mexico',
      events: [
        { date: '25.10.2024 21:30', title: 'Гран-при Мексики. Свободная практика 1', type: 'practice' },
        { date: '26.10.2024 21:30', title: 'Гран-при Мексики. Свободная практика 2', type: 'practice' },
        { date: '26.10.2024 21:30', title: 'Гран-при Мексики. Свободная практика 3', type: 'practice' },
        { date: '27.10.2024 00:00', title: 'Гран-при Мексики. Квалификация', type: 'qualifying' },
        { date: '27.10.2024 23:00', title: '🏁 Гран-при Мексики. Гонка (71 круг, 305.354 км)', type: 'race' },
      ]
    },
    {
      country: 'brazil',
      events: [
        { date: '01.11.2024 17:30', title: 'Гран-при Бразилии. Свободная практика 1', type: 'practice' },
        { date: '01.11.2024 21:30', title: 'Гран-при Бразилии. Спринт-квалификация', type: 'sprint-qualifying' },
        { date: '02.11.2024 17:30', title: 'Гран-при Бразилии. Спринт', type: 'sprint' },
        { date: '02.11.2024 21:30', title: 'Гран-при Бразилии. Квалификация', type: 'qualifying' },
        { date: '03.11.2024 18:47', title: '🏁 Гран-при Бразилии. Гонка (71 круг, 305.879 км)', type: 'race' },
      ]
    },
    {
      country: 'usa-las-vegas',
      events: [
        { date: '22.11.2024 05:30', title: 'Гран-при Лас-Вегаса. Свободная практика 1', type: 'practice' },
        { date: '22.11.2024 09:00', title: 'Гран-при Лас-Вегаса. Свободная практика 2', type: 'practice' },
        { date: '23.11.2024 05:30', title: 'Гран-при Лас-Вегаса. Свободная практика 3', type: 'practice' },
        { date: '23.11.2024 09:00', title: 'Гран-при Лас-Вегаса. Квалификация', type: 'qualifying' },
        { date: '24.11.2024 09:00', title: '🏁 Гран-при Лас-Вегаса. Гонка (50 кругов, 309.958 км)', type: 'race' },
      ]
    },
    {
      country: 'qatar',
      events: [
        { date: '29.11.2024 16:30', title: 'Гран-при Катара. Свободная практика 1', type: 'practice' },
        { date: '29.11.2024 20:30', title: 'Гран-при Катара. Спринт-квалификация', type: 'sprint-qualifying' },
        { date: '30.11.2024 17:00', title: 'Гран-при Катара. Спринт', type: 'sprint' },
        { date: '30.11.2024 21:00', title: 'Гран-при Катара. Квалификация', type: 'qualifying' },
        { date: '01.12.2024 19:00', title: '🏁 Гран-при Катара. Гонка (57 кругов, 308.611 км)', type: 'race' },
      ]
    },
    {
      country: 'uae',
      events: [
        { date: '06.12.2024 12:30', title: 'Гран-при Абу-Даби. Свободная практика 1', type: 'practice' },
        { date: '06.12.2024 16:00', title: 'Гран-при Абу-Даби. Свободная практика 2', type: 'practice' },
        { date: '07.12.2024 13:30', title: 'Гран-при Абу-Даби. Свободная практика 3', type: 'practice' },
        { date: '07.12.2024 17:00', title: 'Гран-при Абу-Даби. Квалификация', type: 'qualifying' },
        { date: '08.12.2024 17:00', title: '🏁 Гран-при Абу-Даби. Гонка (58 кругов, 306.183 км)', type: 'race' },
      ]
    }
  ];

    scheduleContainer.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('race-schedule-table');

    const headerRow = table.insertRow();
    ['Дата', 'Событие'].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      headerRow.appendChild(th);
    });

    const timeToMinutes = time => {
      const [hour, minute] = time.split(':').map(Number);
      return hour * 60 + minute;
    };

    allSessions.forEach(stage => {
      if (selectedCountries.includes(stage.country)) {
        stage.events.forEach(event => {
          const eventTime = timeToMinutes(event.date.split(' ')[1]); // Получаем только время и конвертируем его
          if (selectedSessionTypes.includes(event.type) && eventTime >= startTime && eventTime <= endTime) {
            const row = table.insertRow();
            row.insertCell().textContent = event.date;
            row.insertCell().textContent = event.title;
          }
        });
      }
    });

    scheduleContainer.appendChild(table);
  }

  function loadSchedule() {
    const savedSchedule = localStorage.getItem('lastRaceSchedule');
    if (savedSchedule) {
      scheduleContainer.innerHTML = savedSchedule;
    } else {
      alert('Нет сохраненного расписания.');
    }
  }

  document.getElementById('timeStart').addEventListener('input', updateTimeLabels);
  document.getElementById('timeEnd').addEventListener('input', updateTimeLabels);

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    createSchedule();
  });

  saveParametersButton.addEventListener('click', function() {
    createSchedule();
    saveParameters();
  });
  loadScheduleButton.addEventListener('click', loadSchedule);

  loadParameters();
  updateTimeLabels();
});
