function clearMessList(list) {
    while(list.children.length > 0) {
        list.children[0].remove();
    }
}

export {
    clearMessList
}