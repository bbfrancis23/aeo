import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Milieu } from '../milieu/milieu';
import { FilterVueComponent } from '../milieu/filter-vue.component';
import { Utilities } from '../utilities';
import { MilieuService } from '../milieu/milieu.service';
import { Property } from './property';
import { REAL_ESTATE_AGENT_CONFIG} from './real-estate.config';
import { RealEstateAgentService } from './real-estate-agent.service';
import { AgentVueComponent } from './agent-vue.component';


'use strict';

@Component({
  selector: 'real-estate-agent-vue',
  templateUrl: './real-estate-agent-milieu.component.html',
  styles: [`


  `],
  providers: [MilieuService]
})
export class RealEstateAgentMilieuComponent  {


}
/* Copyright AEO all rights reserved */
