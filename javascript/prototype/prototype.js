function Member() {
    this.name = "홍길동";
}

console.log("Member.prototype: ", Member.prototype);

Member.prototype.id = "abc";
console.log("Member.prototype: ", Member.prototype);

const m1 = new Member();
console.log(m1);

console.log(m1.name, m1.id);

console.log(m1.__proto__);

console.log("Object: ", Object);
console.log("Object.prototype: ", Object.prototype);
console.log("Member.prototype.__proto__: ", Member.prototype.__proto__);

Object.prototype.age = 30;

console.log(m1.age);
m1.age = 50; //m1 객체의 age속성이 생김
console.log(m1.age);
delete m1.age; //m1 객체의 age 속성 삭제
console.log(m1.age);