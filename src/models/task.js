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
    this.#status = 'in-progress';
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

  switchStatus() {
    if (this.#status === 'in-progress') {
      this.#status = 'completed';
    } else {
      this.#status = 'in-progress';
    }
    this.#updatedAt = new Date();
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = id;
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

  get status() {
    return this.#status;
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
