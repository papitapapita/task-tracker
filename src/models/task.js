export class Task {
  static currentId = 0;
  #id;
  #updatedAt;
  #status;
  #description;
  #createdAt;

  constructor(description, id) {
    this.#id = id || Task.currentId++;
    this.#description = this.verifyDescription(description);
    this.#status = 'todo';
    this.#createdAt = new Date();
    this.#updatedAt = this.#createdAt;
  }

  verifyDescription(description) {
    if (typeof description !== 'string') {
      throw new TypeError('Description must be a string');
    }

    if (description === '') {
      throw new Error('Description cannot be empty');
    }

    return description;
  }

  set status(status) {
    this.#status = status;
    this.#updatedAt = new Date();
  }

  get status(){
    return this.#status;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = id;
    this.#updatedAt = new Date();
  }

  get createdAt() {
    return this.#createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  set description(description) {
    this.#description = this.verifyDescription(description);
    this.#updatedAt = new Date();
  }

  get description() {
    return this.#description;
  }

  toJSON() {
    return {
      currentId: this.currentId,
      id: this.#id,
      updatedAt: this.#updatedAt,
      status: this.#status,
      description: this.#description,
      createdAt: this.#createdAt,
    };
  }
}
