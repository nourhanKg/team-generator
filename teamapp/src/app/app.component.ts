import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // team members
  title = 'teamapp';
  newMember = "";
  noMemberName = false;
  members: string[] = [];
  teams: string[][] = [];
  //teams number
  errMessage = "";
  numOfTeams: "" | number = 0;
  notEnoughMembers = false;
  addNewMember() {
    if(this.newMember) {
      this.members.push(this.newMember)
      this.newMember = "";
      this.noMemberName = false;
    }
    else
    this.noMemberName = true;
  }
  onInputMember(member: string) {
    this.newMember = member;
  }
  generateTeams() {
    const members = [...this.members];
    if(members.length === 0) {
      this.errMessage = "You need to enter team members first!";
      this.notEnoughMembers = true;
      return;
    }
    if(this.numOfTeams == 0 || this.numOfTeams < 0) {
      this.errMessage = "You need to enter a valid number for teams!";
      this.notEnoughMembers = true;
      return;
    }
    if(this.numOfTeams > members.length ) {
      this.errMessage = `You need at least ${this.numOfTeams} team-members!`;
      this.notEnoughMembers = true;
      return;
    }
    this.notEnoughMembers = false;
    //Create teams
    for(let i = 0; i < this.numOfTeams; i++) {
      this.teams.push([]);
    }
    //Fill teams 
    let currTeam = 0;
    while(members.length !== 0) {
      if(currTeam === this.numOfTeams) currTeam = 0; 
      const randIndex = Math.floor(Math.random() * members.length);
      const member = members.splice(randIndex, 1)[0];
      this.teams[currTeam].push(member);
      currTeam++;
    }
    this.members = [];
    this.numOfTeams = "";
  }
  onInputNumTeams(numTeams: string) {
    this.numOfTeams = +numTeams;
  }
}
