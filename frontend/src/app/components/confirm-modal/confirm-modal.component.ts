import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {

  @Output() confirm = new EventEmitter<boolean>();
  @Input() studentName: string = '';

  onConfirm(): void {
    this.confirm.emit(true);
    console.log('Emiti True');
  };

  onCancel(): void {
    this.confirm.emit(false);
    console.log('emiti false');
  };
}
