/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let flag = false;
let fastStack = undefined;
let arkPritvate = globalThis["ArkPrivate"] || undefined;
if (arkPritvate !== undefined) {
  fastStack = arkPritvate.Load(arkPritvate.Stack);
} else {
  flag = true;
}
if (flag || fastStack == undefined) {
  class HandlerStack<T> {
    private isOutBounds(obj: Stack<T>, prop: any) {
      let index = Number.parseInt(prop);
      if (Number.isInteger(index)) {
        if (index < 0 || index >= obj.length) {
          throw new RangeError("the index is out-of-bounds");
        }
      }
    }
    get(obj: Stack<T>, prop: any) {
      if (typeof prop === "symbol") {
        return obj[prop];
      }
      this.isOutBounds(obj, prop);
      return obj[prop];
    }
    set(obj: Stack<T>, prop: any, value: T) {
      if (prop === "elementNum" || prop === "capacity") {
        obj[prop] = value;
        return true;
      }
      this.isOutBounds(obj, prop);
      let index = Number.parseInt(prop);
      if (index >= 0 && index < obj.length && Number.isInteger(index)) {
        obj[index] = value;
        return true;
      }
      return false;
    }
    ownKeys(obj: Stack<T>) {
      let keys = [];
      let length = obj.length;
      for (let i = 0; i < length; i++) {
        keys.push(i.toString());
      }
      return keys;
    }
    defineProperty(obj: Stack<T>, prop: any, desc: any) {
      return true;
    }
    getOwnPropertyDescriptor(obj: Stack<T>, prop: any) {
      this.isOutBounds(obj, prop);
      let index = Number.parseInt(prop);
      if (index >= 0 && index < obj.length && Number.isInteger(index)) {
        return Object.getOwnPropertyDescriptor(obj, prop);
      }
      return
    }
    setPrototypeOf(obj: any, prop: any): any {
      throw new RangeError("Can setPrototype on Stack Object");  
    }
  }
  interface IterableIterator<T> {
    next: () => {
      value: T;
      done: boolean;
    };
  }
  class Stack<T> {
    private elementNum: number = 0;
    private capacity: number = 10;
    constructor() {
      return new Proxy(this, new HandlerStack());
    }
    get length() {
      return this.elementNum;
    }
    push(item: T): T {
      if (this.isFull()) {
        this.increaseCapacity();
      }
      this[this.elementNum++] = item;
      return item;
    }
    pop(): T {
      if (this.isEmpty()) {
        return undefined;
      }
      let result = this[this.length - 1];
      this.elementNum--;
      return result;
    }
    peek(): T {
      if (this.isEmpty()) {
        return undefined;
      }
      return this[this.length - 1];
    }
    locate(element: T): number {
      for (let i = 0; i < this.length; i++) {
        if (this[i] === element) {
          return i;
        }
      }
      return -1;
    }
    isEmpty(): boolean {
      return this.elementNum == 0;
    }
    forEach(callbackfn: (value: T, index?: number, stack?: Stack<T>) => void,
      thisArg?: Object): void {
      for (let i = 0; i < this.length; i++) {
        callbackfn.call(thisArg, this[i], i, this);
      }
    }
    private isFull(): boolean {
      return this.elementNum === this.capacity;
    }
    private increaseCapacity(): void {
      this.capacity = 1.5 * this.capacity;
    }
    [Symbol.iterator](): IterableIterator<T> {
      let count = 0;
      let stack = this;
      return {
        next: function () {
          let done = count >= stack.elementNum;
          let value = !done ? stack[count++] : undefined;
          return {
            done: done,
            value: value,
          };
        },
      };
    }
  }
  Object.freeze(Stack);
  fastStack = Stack;
}
export default fastStack;
