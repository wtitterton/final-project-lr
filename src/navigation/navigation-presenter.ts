import { inject, injectable } from 'inversify'
import { computed, makeObservable } from 'mobx'
import { NavigationRepository } from './navigation-repository'

@injectable()
export class NavigationPresenter {
   constructor(  
    @inject(NavigationRepository) private navigationRepository: NavigationRepository
  ) {
    makeObservable(this, {
      viewModel: computed
    })
  }
  
  get viewModel() {
    const vm = {
      showBack: false,
      currentSelectedVisibleName: '',
      currentSelectedBackTarget: { visible: false, id: null },
      menuItems: []
    }

    let currentNode = this.navigationRepository.currentNode
    
    if (currentNode) {
       vm.currentSelectedVisibleName = this.visibleName(currentNode);
       vm.menuItems = currentNode.children.map((node: any) => {
       return {
        ...node,
        parent: currentNode
      };
      })

      if (currentNode.parent) {
        vm.currentSelectedBackTarget = {
          visible: true,
          id: currentNode.parent.model.id
        }
        vm.showBack = true
      }
    }

    return vm
  }

 

  visibleName = (node: any) => {
    return node.model.text + ' > ' + node.model.id
  }

  back = () => {
    this.navigationRepository.back()
  }
}
