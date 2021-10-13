export class StatusCaseModel {
  constructor(name = '', description = '', color = '', active = true) {
    this.name = name;
    this.description = description;
    this.color = color;
    this.active = active;
  }
}
