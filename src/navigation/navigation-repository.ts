import { injectable, inject } from 'inversify'
import TreeModel from 'tree-model'
import { Router } from '../routing'
import { makeObservable, computed, action } from 'mobx'

@injectable()
export class NavigationRepository {
//   @inject(AuthenticationRepository)
//   authenticationRepository

constructor(@inject(Router) private router: Router) {
    makeObservable(this, {
      currentNode: computed,
      back: action
    })
  }

  get currentNode() {
    var self = this
    return this.getTree().all(function (node) {
      return node.model.id === self.router.currentRoute.routeId
    })[0]
  }

  getTree() {
    let tree = new TreeModel()

    let root = tree.parse({
      id: 'homeLink',
      type: 'root',
      text: 'Home',
      children: [
        {
          id: 'booksExpand',
          type: 'expand',
          text: 'Books',
          children: [
            {
              id: 'booksLink',
              type: 'link',
              text: 'Books',
              children: [
                {
                  id: 'addBooksLink',
                  type: 'link',
                  text: 'Add Book',
                   children: [
                    {
                      id: 'booksLink',
                      type: 'link',
                      text: 'Books',
                    }
                  ]
                }
              ]
            },
            {
              id: 'addBooksLink',
              type: 'link',
              text: 'Add Book',
            }
          ]
        },
        {
          id: 'authorsExpand',
          type: 'expand',
          text: 'Authors',
          children: [
            {
              id: 'authorsLink',
              type: 'link',
              text: 'Authors',
              children: [
                {
                  id: 'addAuthorsLink',
                  type: 'link',
                  text: 'Add Author',
                  children: [
                    {
                       id: 'authorsLink',
                       type: 'link',
                       text: 'Authors',
                    }
                  ]
                },
                {
                  id: 'authorsPolicyLink',
                  type: 'link',
                  text: 'Author Policy',
                  children:[]
                },
                {
                  id: 'authorsMapLink',
                  type: 'link',
                  text: 'View Map',
                  children: []
                }
              ]
            },
            {
              id: 'addAuthorsLink',
              type: 'link',
              text: 'Add Author',
              children: [
                {
                  id: 'authorsMapLink',
                  type: 'link',
                  text: 'View Map'
                },
                {
                  id: 'authorsPolicyLink',
                  type: 'link',
                  text: 'Author Policy'
                }
              ]
            },  
            {
              id: 'authorsMapLink',
              type: 'link',
              text: 'Authors Map'
            }
          ]
        }
      ]
    })

    return root
  }

  back = () => {
    let currentNode = this.currentNode
    console.log(currentNode.parent);
    this.router.goToId(currentNode.parent.model.id)
  }
}
