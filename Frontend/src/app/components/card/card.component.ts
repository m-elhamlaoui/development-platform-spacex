import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {SearchReplyDto} from "../../DTO/searchReply.dto";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() result!:SearchReplyDto;
  @Input() ISreserver:boolean=false;
  @Input() ISdelete:boolean=false;
  @Output() reserver = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onReserverClick(): void {
    this.reserver.emit();
  }

  onDeleteClick():void{
    this.delete.emit()
  }
}