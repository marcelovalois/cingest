interface OSInterface {
    list(): any,
    insert(): any,
    singleView(id: string): any,
    edit(id: string): any,
    delete(id: string): any
}

export default OSInterface;