export class Todo {
    constructor(args) {
        this.title  = args.title || '';
        this.id     = args.id || '';
        this.status = args.status || false;
    }
}
