import { NavigationPresenter } from './'
import { Router } from '../routing'
import { Types } from '../core'
import { AppTestHarness, GetSuccessfulRegistrationStub } from '../test-tools'
import { BaseIOC } from '../base-ioc';
import { Container } from 'inversify';

let appTestHarness: AppTestHarness | null = null;
let navigationPresenter: NavigationPresenter | null = null;
let router = null;
let routerGateway = null;


describe('navigation', () => {
  beforeEach(async () => {
   appTestHarness = new AppTestHarness()
   appTestHarness.bootStrap(() => {})
   navigationPresenter = appTestHarness.container.get(NavigationPresenter);
   router = appTestHarness.container.get(Router)
   routerGateway = appTestHarness.container.get(Types.IRouterGateway)
  })

  describe('before login', () => {
    it('anchor default state', () => {
      expect(true).toBeTruthy()
      expect(navigationPresenter).toBeInstanceOf(NavigationPresenter);
      if(navigationPresenter !== null) {
        expect(navigationPresenter.viewModel.currentSelectedVisibleName).toBe('')
        expect(navigationPresenter.viewModel.showBack).toBe(false)
        expect(navigationPresenter.viewModel.menuItems).toEqual([])
      }
    })
  })

  describe('login', () => {
    beforeEach(async () => {
      expect(appTestHarness).toBeInstanceOf(AppTestHarness);
      if(appTestHarness !== null) {
         await appTestHarness.setupLogin(GetSuccessfulRegistrationStub, 'login')
      }
    })
  })
})
