import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import  {GeneralService} from '../../../services/general.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  groupId : string = ''; 
  statistics : any ;
  constructor(private general : GeneralService, private route: ActivatedRoute, private router : Router) {
  		
  }

  ngOnInit() {
  	this.route.queryParams.subscribe(params => {
	        this.groupId = params['id'];
	        this.general.getStatistics(this.groupId).subscribe((response)=>{
	        	this.statistics = (response);	
	        })
	    });
  }

}
