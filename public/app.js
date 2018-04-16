
const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();

  request.open("GET", url);
  request.setRequestHeader("X-Auth-Token", "c757f6f534c94e23a8a5d6beb804470f");

  request.addEventListener("load", callback);

  request.send();
};

const teamHandler = function(){
if(this.status !== 200) return;
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

selectPlayer(playersData);
getPlayer(playersData);
};

const fixturesHandler = function(){
if(this.status !== 200) return;

const jsonString = this.responseText;
const fixturesData = JSON.parse(jsonString);

renderFixtureSelect(fixturesData);

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


const getTeam = function(teams){
  const selected = document.querySelector('select');
  selected.addEventListener('change', function(){
    let team = teams.teams[this.value];
    save(team);
    createImg(team);
    getPlayers(team);
    getFixtures(team);
  })
}

const getPlayer = function(players){
  const selected = document.querySelector('.player-select');
  selected.addEventListener('change', function(){
    let player = players.players[this.value];
    save(player);
    playerBio(player);
  })
}

const playerBio = function(player){
  const div = document. getElementById('bio');
  clearContent(div);
  const list = document.createElement('ul');
  const nameLi = document.createElement('li');
  nameLi.innerText = player.name;
  const positionLi = document.createElement('li');
  positionLi.innerText = player.position;
  const nationLi = document.createElement('li');
  nationLi.innerText = player.nationality;
  list.appendChild(nameLi);
  list.appendChild(positionLi);
  list.appendChild(nationLi);
  div.appendChild(list);
}

const getPlayers = function(team){
  const url = team._links.players.href;
  makeRequest(url, playersHandler);
}

const renderFixtureSelect = function(fixtures){
  const fixtures = fixtures.fixtures;
  const div = document.getElementById('fixtures');
  const select = document.createElement('select');
  fixtures.forEach(function(fixture, index){
    var option = document.createElement('option');
    option.innerText = "Matchday " + fixture.matchday;
    option.value = index;
    select.appendChild(option);
  });
div.appendChild(select);
}

const selectPlayer = function(players){
  players = players.players;
  debugger;
  const div = document.getElementById('players');
  clearContent(div);
  const select = document.createElement('select');
  select.classList.add('player-select');
  players.forEach(function(player, index){
    const option = createPlayerInfo(player);
    option.value = index;
    select.appendChild(option);
  })
  div.appendChild(select);

}

const createPlayerInfo = function(player){
  const option = document.createElement('option');
  option.innerText = player.name;
  return option;
}

const getFixtures = function(team){
  const url = team._links.fixtures.href;
  makeRequest(url, fixturesHandler);
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
