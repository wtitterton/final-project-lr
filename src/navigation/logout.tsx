import { observer } from 'mobx-react'
import { useInjection } from 'inversify-react'
import { NavigationPresenter } from './navigation-presenter'
import { Router } from '../routing';

export const Logout = observer(({node}: any) => {
    const router = useInjection(Router);

  return (
    <>
      <div
        className="navigation-item"
        style={{ backgroundColor: '#2e91fc' }}
        onClick={() => {router.goToId("loginLink")}}
      >
        &larr; logout
      </div>
      
    </>
  )
})