export class OrganizationModel {
  constructor(name = '', telecom = '', type = '', active = true) {
    this.name = name;
    this.telecom = telecom;
    this.type = type;
    this.active = active;
  }
}
