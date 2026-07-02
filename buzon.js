export default class Buzon {

  set persons(val) {
    if (val instanceof Array) {
      this._persons = val;
    }
  }

  get persons() {
    return this._persons ?? [
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
  }

  /**
   * Index of the last week day the person is in charge, the next day it will
   * change to the next one. It's a 0 based index value and it starts on Sunday.
   */
  set changeDayIndex(val) {
    if (val instanceof Number && val >= 0 && val <= 6) {
      this._changeDayIndex = val;
    }
  }

  get changeDayIndex() {
    return this._changeDayIndex || 3;
  }

  set startDate(val) {
    try {
      const newDate = new Date(val);
      if (!isNaN(newDate.getTime())) {
        this._startDate = newDate;
      }
    } catch(e) {
      console.warn('Unable to instantiate Date from provided value');
    }
  }

  get startDate() {
    const today = this._getTodayDate();
    return this._startDate || new Date(`${today.getFullYear()}-01-1`);
  }

  get dayLength() {
    return 24 * 60 * 60 * 1000;
  }

  get weekLength() {
    return this.dayLength * 7;
  }

  get _maxWeeksInAYear() {
    return 999999;
  }

  constructor({ persons, changeDayIndex, startDate } = {}) {
    this.persons = persons;
    this.changeDayIndex = changeDayIndex;
    this.startDate = startDate;
  }

  getPerson() {
    const { weeksSinceStartDate } = this._getCycleStartDate();
    let index = weeksSinceStartDate % this.persons.length;
    while (!this.persons[index] && index < this.persons.length + 1) {
      index++;
    }
    return this.persons[index];
  }

  getCycleStartDate() {
    const { startDate } = this._getCycleStartDate();
    return startDate;
  }

  _getCycleStartDate() {
    const today = this._getTodayDate();
    let weeksSinceStartDate = 0;
    let startDate = this._getStartDate();
    while(!this._isInWeekRange(startDate, today) && weeksSinceStartDate < this._maxWeeksInAYear) {
      startDate = new Date(startDate.getTime() + this.weekLength);
      weeksSinceStartDate++;
    }
    return { weeksSinceStartDate, startDate };
  }

  _getTodayDate() {
    const now = new Date();
    return new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);
  }

  _getStartDate() {
    let startDate = this.startDate;
    let failSafe = 0;
    while(startDate.getDay() !== this.changeDayIndex && failSafe < 8) {
      startDate = new Date(startDate.getTime() + this.dayLength);
      failSafe++;
    }
    return startDate;
  }

  _isInWeekRange(dateA, dateB) {
    const endRangeDay = new Date(dateA.getTime() + this.weekLength);
    return (dateA.getTime() < dateB.getTime()) && (dateB.getTime() < endRangeDay.getTime());
  }

}
