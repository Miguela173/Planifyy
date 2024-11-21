
// Variables de calendario
const openModalButton = document.getElementById('openModal');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('closeModal');
const dateForm = document.getElementById('dateForm');
const calendarContainer = document.getElementById('calendarContainer');
let importance = ''; // Variable para almacenar la importancia seleccionada

// Función para generar el calendario de un mes
function generateCalendar(month, year) {
  const daysInMonth = new Date(year, month, 0).getDate(); // Obtener los días del mes
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // Obtener el primer día del mes (0 = domingo)
  const calendarTable = document.createElement('table');
  calendarTable.classList.add('min-w-full', 'table-auto', 'mb-8');

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const monthName = monthNames[month - 1];

  // Crear encabezado del calendario
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].forEach(day => {
    const th = document.createElement('th');
    th.classList.add('py-2', 'px-4', 'border-b', 'text-center');
    th.textContent = day;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  calendarTable.appendChild(thead);

  // Crear cuerpo del calendario
  const tbody = document.createElement('tbody');
  let currentDay = 1;
  let row;

  // Crear las filas del calendario
  for (let i = 0; i < 6; i++) {
    row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      cell.classList.add('py-4', 'px-4', 'text-center', 'border-b', 'date-cell');
      if (i === 0 && j < firstDayOfMonth) {
        cell.classList.add('border-transparent');
      } else if (currentDay <= daysInMonth) {
        cell.textContent = currentDay;
        cell.dataset.day = currentDay;
        cell.dataset.month = month;
        cell.dataset.year = year;
        cell.id = `calendar-${year}-${month}-${currentDay}`; // Agregar ID único
        currentDay++;
      }
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  calendarTable.appendChild(tbody);

  // Crear encabezado del mes
  const monthHeader = document.createElement('div');
  monthHeader.classList.add('text-xl', 'font-bold', 'text-gray-900', 'text-left', 'mb-2');
  monthHeader.textContent = `${monthName} ${year}`;

  const monthWrapper = document.createElement('div');
  monthWrapper.classList.add('mb-10');
  monthWrapper.appendChild(monthHeader);
  monthWrapper.appendChild(calendarTable);

  calendarContainer.appendChild(monthWrapper);
}

// Generar solo 2 meses consecutivos (mes actual y siguiente)
const currentDate = new Date();
generateCalendar(currentDate.getMonth() + 1, currentDate.getFullYear()); // Mes actual
generateCalendar(currentDate.getMonth() + 2, currentDate.getFullYear()); // Mes siguiente

// Abrir el modal
openModalButton.addEventListener('click', function () {
  modal.classList.remove('hidden');
});

// Cerrar el modal
closeModalButton.addEventListener('click', function () {
  modal.classList.add('hidden');
});

// Seleccionar importancia
document.getElementById('mediumPriority').addEventListener('click', function () {
  importance = 'yellow';
});

document.getElementById('highPriority').addEventListener('click', function () {
  importance = 'red';
});

document.getElementById('deliveredPriority').addEventListener('click', function () {
  importance = 'green';
});

// Guardar la fecha seleccionada
dateForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const selectedDate = document.getElementById('deliveryDate').value;
  const [year, month, day] = selectedDate.split("-");
  const selectedDateObj = new Date(year, month - 1, day);

  const monthNumber = selectedDateObj.getMonth() + 1; // Convertir mes a formato 1-12
  const dayNumber = selectedDateObj.getDate();
  const yearNumber = selectedDateObj.getFullYear();

  const dayCell = document.querySelector(`#calendar-${yearNumber}-${monthNumber}-${dayNumber}`);

  if (dayCell) {
    // Limpiar el color anterior si existe
    dayCell.classList.remove('bg-yellow-400', 'bg-red-500', 'bg-green-500');

    // Cambiar el número del día y el texto a blanco y en negrita
    dayCell.innerHTML = `<span class="text-white font-bold">${dayNumber}</span> <span class="text-white font-bold text-xs">${importance === 'yellow' ? 'Entrega (Importancia: Media)' : importance === 'red' ? 'Entrega (Importancia: Alta)' : 'Entregado'}</span>`;

    // Añadir el nuevo color basado en la importancia seleccionada
    dayCell.classList.add(importance === 'yellow' ? 'bg-yellow-400' : importance === 'red' ? 'bg-red-500' : 'bg-green-500');
  }

  modal.classList.add('hidden');
});



