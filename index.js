import Buzon from './buzon.js';

(function() {
  const persons = [
    { name: 'Adrian Alvarez', avatar: './img/pacman2.png' },
    { name: 'Adrian Gil Alonso', avatar: './img/pacman2.png' },
    { name: 'Aitor Sola', avatar: './img/pacman2.png' },
    { name: 'Alberto Ortega', avatar: './img/pacman2.png' },
    { name: 'Alejandro Mallón Buitrago', avatar: './img/pacman2.png' },
    { name: 'Berkan Reyes Hernández', avatar: './img/pacman2.png' },
    { name: 'DANIEL GÓMEZ BARRO...', avatar: './img/pacman2.png' },
    { name: 'Daniel Torres', avatar: './img/pacman2.png' },
    { name: 'Fran Alarza', avatar: './img/pacman2.png' },
    { name: 'Guille Quintanilla', avatar: './img/pacman2.png' },
    { name: 'Javier Ortiz Sancho', avatar: './img/pacman2.png' },
    { name: 'Jonathan Onrubia', avatar: './img/pacman2.png' },
    { name: 'JOSE MARIA ILA CONTRERAS', avatar: './img/pacman2.png' },
    { name: 'Kevin Sabajanes', avatar: './img/pacman2.png' },
    { name: 'POL FORA SÖRENSEN', avatar: './img/pacman2.png' },
    { name: 'Raúl Sanz', avatar: './img/pacman2.png' },
  ];

  const $mainImage = document.querySelector('#main-image');
  const $mainTitle = document.querySelector('#main-title');
  const $mainDate = document.querySelector('#main-date');
  const $buzonList = document.querySelector('#buzon-list');
  const $buzonItemTemplate = document.querySelector('#buzon-item-template');

  const buzon = new Buzon({
    startDate: '2025-20-11',
    persons
  });

  const currentPerson = buzon.getPerson();
  const cycleStartDate = new Date(buzon.getCycleStartDate().getTime() + buzon.dayLength);

  function dateFormat(date) {
    return date.toLocaleDateString("es-ES", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).replace(/^(.)|\s+(.)/g, function (letter) {
      return letter.toUpperCase()
    }).replaceAll('De', 'de');
  }

  $mainImage.src = currentPerson.avatar;
  $mainTitle.innerText = currentPerson.name;
  $mainDate.innerText = dateFormat(cycleStartDate);

  const currentPersonIndex = persons.indexOf(currentPerson);
  const buzonList = [
      ...persons.slice(currentPersonIndex),
      ...persons.slice(0, currentPersonIndex)
    ]
    .filter((person) => person !== currentPerson)
    .map((person, index) => ({
      ...person,
      startDate: new Date(cycleStartDate.getTime() + (buzon.weekLength * (index + 1)))
    }));
  $buzonList.innerHTML = buzonList.map(getItemTemplate).join('');

  function getItemTemplate(person) {
    return $buzonItemTemplate.innerHTML
      .split('{{name}}').join(person.name)
      .split('{{date}}').join(dateFormat(person.startDate))
      .split('{{image}}').join(person.avatar);
  }

})();
