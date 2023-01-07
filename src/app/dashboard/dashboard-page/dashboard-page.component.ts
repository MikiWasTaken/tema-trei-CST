import { GamesService } from './../../_core/services/games.service';
import { GameDataService } from './../../_core/services/game-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {

  gameList = [
  ];
  myEvent: any;

  filteredGameList = [];
  constructor(private router: Router, private gameDataService: GameDataService, private gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesService.getGames().subscribe({
      next: (response) => {
        this.gameList = response;
        this.filteredGameList = response;
      }
    })
  }

  navigateToGamePage(gameData: any) {
    this.gameDataService.selectedCard = gameData;
    this.router.navigate(['/game-page'],{queryParams:{gameId:gameData.id}});
  }

  inputEvent($event)
  {
    this.myEvent = $event;
  }
  
  filterData(arg: any)
  {
      console.log(this.gameList);
      this.filteredGameList = this.gameList.filter(game => {
        return game.title.toUpperCase().includes(arg.target.value.toUpperCase());
      })
      console.log(this.gameList);
  }

  sortData()
  {
      this.filteredGameList.sort((a, b) => {
        const aTitle = a.title.toUpperCase();
        const bTitle = b.title.toUpperCase();
        if (aTitle > bTitle)
          return 1;
        if (aTitle < bTitle)
          return -1;
        return 0;
      })
  }

}
