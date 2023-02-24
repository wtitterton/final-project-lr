import { Types } from '../core'
import { AppTestHarness } from '../test-tools'
import { FakeRouterGateway, Router, RouterRepository } from '../routing'

let appTestHarness: AppTestHarness;
let router: Router;
let routerRepository: RouterRepository;
let routerGateway: FakeRouterGateway;
let onRouteChange = () => {}

describe('init', () => {
  beforeEach(() => {
    appTestHarness = new AppTestHarness()
    router = appTestHarness.container.get(Types.IRouter)
    routerRepository = appTestHarness.container.get(RouterRepository)
    routerGateway = appTestHarness.container.get(Types.IRouterGateway)
    onRouteChange = () => {}
  })

  it('should be an null route', () => {
    expect(routerRepository.currentRoute.routeId).toBe(null)
  })

  describe('bootstrap', () => {
    beforeEach(() => {
      appTestHarness.bootStrap(onRouteChange)
    })

    it('should start at null route', () => {
      expect(routerRepository.currentRoute.routeId).toBe(null)
    })

    describe('routing', () => {
      it('should block wildcard *(default) routes when not logged in', () => {
        router.goToId('default')

        expect(routerGateway.goToId).toHaveBeenLastCalledWith('loginLink')
      })

      it('should block secure routes when not logged in', () => {
        router.goToId('homeLink')

        expect(routerGateway.goToId).toHaveBeenLastCalledWith('loginLink')
      })

      it('should allow public route when not logged in', () => {
        router.goToId('authorPolicyLink')

        expect(routerGateway.goToId).toHaveBeenLastCalledWith('authorPolicyLink')
      })
    })
  })
})