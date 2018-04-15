
const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();

  request.open("GET", url);
  request.setRequestHeader("X-Auth-Token", "c757f6f534c94e23a8a5d6beb804470f");

  request.addEventListener("load", callback);

  request.send();
};

const teamHandler = function(){
if(this.status !== 200) return;
debugger;
const jsonString = this.responseText;
const teamData = JSON.parse(jsonString);

renderTeamSelect(teamData);
getTeam(teamData);
};


const leagueTableHandler = function(){
if(this.status !== 200) return;

const jsonString = this.responseText;
const leagueTableData = JSON.parse(jsonString);

renderLeagueTable(leagueTableData);

};

const playersHandler = function(){
if(this.status !== 200) return;

const jsonString = this.responseText;
const playersData = JSON.parse(jsonString);


};

const fixturesHandler = function(){
if(this.status !== 200) return;

const jsonString = this.responseText;
debugger;
const fixturesData = JSON.parse(jsonString);


};

const app = function(){
const teams_url = "http://api.football-data.org/v1/competitions/398/teams";
const league_url = "http://api.football-data.org/v1/competitions/398/leagueTable";
makeRequest(teams_url, teamHandler);
makeRequest(league_url, leagueTableHandler);
}

const renderLeagueTable = function(leagueTable){
  const div = document.getElementById('league-table');
  console.log("league data", leagueTable.leagueCaption);
  const caption = document.createElement('h1');
  caption.innerText = leagueTable.leagueCaption;
  const table = document.createElement('table');


}

const renderTeamSelect = function(teams){
  teams = teams.teams;
  const div = document.getElementById('main');
  const select = document.createElement('select');
  teams.forEach(function(team, index){
    var option = createOption(team);
    option.innerText = team.name;
    option.value = index;
    select.appendChild(option);
  });
div.appendChild(select);

}

const PlayersList = function(team){


}

const getTeam = function(teams){
  const selected = document.querySelector('select');
  selected.addEventListener('change', function(){
    debugger;
    let team = teams.teams[this.value];
    save(team);
    createImg(team);
    getPlayers(team);
    getFixtures(team);
  })
}

const getPlayers = function(team){
  debugger;
  const url = team._links.players.href;
  makeRequest(url, playersHandler);
}

const listPlayers = function(){
  const div = getElementById('players');
  const list = createElement('ul');

}

const getFixtures = function(team){
  const url = team._links.fixtures.href;
  makeRequest(url, playersHandler);
}
const clearContent = function(node){
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

const save = function(data){
  const jsonString = JSON.stringify(data);
  localStorage.setItem('data', jsonString);
}

const createOption = function (team) {
  const option = document.createElement('option');
  option.innerText = team.name;
  return option;
};

const createImg = function(team){
  const div = document.getElementById('team-crest');
  clearContent(div);
  const img = document.createElement('img');
  img.src = team.crestUrl;
  img.alt = team.name;
  div.appendChild(img);
  return img;
}
window.addEventListener('load', app);
