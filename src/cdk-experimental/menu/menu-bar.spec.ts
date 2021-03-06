import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Component} from '@angular/core';
import {CdkMenuBar} from './menu-bar';
import {CdkMenuModule} from './menu-module';
import {CdkMenuItem} from './menu-item';
import {By} from '@angular/platform-browser';

describe('MenuBar', () => {
  describe('as radio group', () => {
    let fixture: ComponentFixture<MenuBarRadioGroup>;
    let menuItems: CdkMenuItem[];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [CdkMenuModule],
        declarations: [MenuBarRadioGroup],
      }).compileComponents();

      fixture = TestBed.createComponent(MenuBarRadioGroup);
      fixture.detectChanges();

      menuItems = fixture.debugElement
        .queryAll(By.directive(CdkMenuItem))
        .map(element => element.injector.get(CdkMenuItem));
    }));

    it('should toggle menuitemradio items', () => {
      expect(menuItems[0].checked).toBeTrue();
      expect(menuItems[1].checked).toBeFalse();

      menuItems[1].trigger();

      expect(menuItems[0].checked).toBeFalse();
      expect(menuItems[1].checked).toBeTrue();
    });
  });

  describe('radiogroup change events', () => {
    let fixture: ComponentFixture<MenuBarRadioGroup>;
    let menuItems: CdkMenuItem[];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [CdkMenuModule],
        declarations: [MenuBarRadioGroup],
      }).compileComponents();

      fixture = TestBed.createComponent(MenuBarRadioGroup);

      fixture.detectChanges();

      menuItems = fixture.debugElement
        .queryAll(By.directive(CdkMenuItem))
        .map(element => element.injector.get(CdkMenuItem));
    }));

    it('should emit on click', () => {
      const spy = jasmine.createSpy('cdkMenu change spy');
      fixture.debugElement
        .query(By.directive(CdkMenuBar))
        .injector.get(CdkMenuBar)
        .change.subscribe(spy);

      menuItems[0].trigger();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(menuItems[0]);
    });
  });
});

@Component({
  template: `
    <ul cdkMenuBar>
      <li role="none">
        <button checked="true" role="menuitemradio" cdkMenuItem>
          first
        </button>
      </li>
      <li role="none">
        <button role="menuitemradio" cdkMenuItem>
          second
        </button>
      </li>
    </ul>
  `,
})
class MenuBarRadioGroup {}
