export interface TreeStoreItem{
    id:number,
    parent:number|string,
    type?:string|null
    }
    
    
    export class TreeStore {
      items: TreeStoreItem[];
      constructor(items: TreeStoreItem[]) {
        this.items = items;
      }
      getAll():TreeStoreItem[] {
        return this.items;
      }
      getItem(id:number|string):TreeStoreItem|undefined{
       return this.items.find(item=>item.id===id)
      }
      getChildren(id:number|string):TreeStoreItem[]|[]{
    return this.items.filter(item=>item.parent===id)
      }


      getAllChildren(id: number|string): TreeStoreItem[] {
        const getAllDescendants = (parentId: number|string, descendants: TreeStoreItem[]): TreeStoreItem[] => {
          const children = this.getChildren(parentId);
          descendants.push(...children);
          children.forEach(child => getAllDescendants(child.id, descendants));
          return descendants;
        };
        return getAllDescendants(id, []);
      }
    
      getAllParents(id: number): TreeStoreItem[] {
        const getAllAncestors = (childId: number, ancestors: TreeStoreItem[]): TreeStoreItem[] => {
          const item = this.getItem(childId);
          if (item && item.parent !== null) {
            if (item.id===id){
                ancestors.push(item);
              }
            const parent = this.getItem(item.parent);
            if (parent) {
              ancestors.push(parent);
              getAllAncestors(parent.id, ancestors);
            }
          }
          return ancestors;
        };
        return getAllAncestors(id, []);
      }
    
    }
    
    
  
  
    
    
    
    
    
    
    
    
    
    
    
   /*  //Примеры использования:
     ts.getAll() // [{"id":1,"parent":"root"},{"id":2,"parent":1,"type":"test"},{"id":3,"parent":1,"type":"test"},{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]
     ts.getItem(7) // {"id":7,"parent":4,"type":nu
     ts.getChildren(4) // [{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]
     ts.getChildren(5) // []
     ts.getChildren(2) // [{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"}]
     ts.getAllChildren(2) // [{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":nul
 */