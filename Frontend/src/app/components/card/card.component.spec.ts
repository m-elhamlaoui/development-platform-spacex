import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CardComponent,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        NoopAnimationsModule // Important for Material animations
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input values', () => {
    component.origin = 'TRR';
    component.destination = 'MRS';
    component.price = 'prix $$';
    component.departureDate = 'date de départ';
    component.arrivalDate = 'date d\'arrivée';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.origin').textContent).toContain('TRR');
    expect(compiled.querySelector('.destination').textContent).toContain('MRS');
    expect(compiled.querySelector('.price').textContent).toContain('prix $$');
    expect(compiled.querySelector('.departure-date').textContent).toContain('date de départ');
    expect(compiled.querySelector('.arrival-date').textContent).toContain('date d\'arrivée');
  });

  it('should emit button click events', () => {
    component.actionButtons = [{ icon: 'delete', action: 'delete', tooltip: 'Delete' }];
    fixture.detectChanges();

    const buttonClickSpy = spyOn(component.buttonClick, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(buttonClickSpy).toHaveBeenCalledWith('delete');
  });

  it('should render action buttons', () => {
    component.actionButtons = [
      { icon: 'edit', action: 'edit', tooltip: 'Edit' },
      { icon: 'delete', action: 'delete', tooltip: 'Delete' }
    ];
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(2);

    const icons = fixture.nativeElement.querySelectorAll('mat-icon');
    expect(icons[0].textContent).toContain('edit');
    expect(icons[1].textContent).toContain('delete');
  });
});