import { injectable, inject } from "inversify";
import TreeModel from "tree-model";
import { Router } from "../routing";
import { makeObservable, computed, action } from "mobx";
import { Types } from "../core";

@injectable()
export class NavigationRepository {
  constructor(@inject(Types.IRouter) private router: Router) {
    makeObservable(this, {
      currentNode: computed,
      back: action,
    });
  }

  get currentNode() {
    var self = this;
    return this.getTree().all(function (node) {
      return node.model.id === self.router.currentRoute.routeId;
    })[0];
  }

  getTree() {
    let tree = new TreeModel();

    let root = tree.parse({
      id: "homeLink",
      type: "root",
      text: "Home",
      children: [
        {
          id: "booksLink",
          type: "link",
          text: "Books",
        },
        {
          id: "authorsLink",
          type: "link",
          text: "Authors",
        },
      ],
    });

    return root;
  }

  back = () => {
    let currentNode = this.currentNode;
    // if (currentNode.hasChildren()) {
    //   this.router.goToId(currentNode.parent.parent.model.id);
    // }

    this.router.goToId(currentNode.parent.model.id);
  };
}
