export class Task {
    static currentId = 0;
    #id;
    #updatedAt;
    #status;
    #description;
    #createdAt;

    constructor(description) {
        this.#id = Task.currentId++;
        this.#description = description;
        this.#status = false;
        this.#createdAt = new Date();
        this.#updatedAt = this.#createdAt;
    }

    verifyDescription(description) {
        if (typeof description !== 'string') {
            throw new TypeError('Description must be a string');
        }

        if (description === "") {
            throw new Error('Description cannot be empty');
        }

        return description;
    }

    switchStatus() {
        this.#status = !this.#status;
        this.#updatedAt = new Date();
    }

    get id() {
        return this.#id;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get updatedAt() {
        return this.#updatedAt;
    }

    set description(description) {
        this.#description = this.verifyDescription(description);
    }

    get description() {
        return this.#description;
    }
}