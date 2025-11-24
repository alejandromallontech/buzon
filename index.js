import Buzon from './buzon.js';

(function() {
  const persons = [
    { name: 'Luis', avatar: './img/pacman2.png' },
    { name: 'Gonzalo', avatar: './img/pacman2.png' },
    { name: 'Tony', avatar: './img/pacman2.png' },
    { name: 'Enzo', avatar: './img/pacman2.png' },
    { name: 'Samu', avatar: './img/pacman2.png' },
    { name: 'Miguel', avatar: './img/pacman2.png' },
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
