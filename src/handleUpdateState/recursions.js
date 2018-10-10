export function updateState(oldNodes, data, id) {
    let newNodes = oldNodes.map((node) => {
        if (node.id === id) return updateTreeState(node, data);
        if(node.children && node.children.length > 0) {
            let children = updateState(node.children, data, id);
            return updateTreeState(node, children);
        }
        return node;
    });
    //newNodes.splice( index, 1,  )
    return newNodes;
}

function updateTreeState(node, data) {
   // Vue.set(node, children, data);
  //  console.log(node);
    node = {...node, children: data, count_child: data.length};
   // node.children = data;
   // node.count_child = data.length;
    return node;
}