import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadenaEvolutiva } from './cadena-evolutiva';

describe('CadenaEvolutiva', () => {
  let component: CadenaEvolutiva;
  let fixture: ComponentFixture<CadenaEvolutiva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadenaEvolutiva],
    }).compileComponents();

    fixture = TestBed.createComponent(CadenaEvolutiva);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
