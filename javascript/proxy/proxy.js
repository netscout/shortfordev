//https://medium.com/dailyjs/how-to-use-javascript-proxies-for-fun-and-profit-365579d4a9f8

let user = {
    firstName: "john",
    lastName: "doe"
};

user = new Proxy(user, {
    get(target, prop) {        
        console.log(`calling ${prop}`);

        if(prop in target) {
            return target[prop];
        }
        else if(prop == "sayFullName") {
            return () => {
                console.log(`${target.firstName} ${target.lastName}`);
            }
        }
    }
});

console.log(user.firstName);
user.sayFullName();


const db = require("./db");

//메서드와 sql쿼리 명령어 매핑
const commands = {
    "get": "select"
}

//프록시 선언
const api = new Proxy({},
    {
        //프로퍼티에 접근할 때 명령을 가로챔
        //target은 api객체, prop은 메서드 이름
        get(target, prop) {
            //메서드에 대한 sql 쿼리 명령어 검색
            const method = Object.getOwnPropertyNames(commands)
                .find(c => prop.startsWith(c));

            if (!method) {
                return;
            }
            
            const command = commands[method];
            //메서드 명(ex: get)만큼 잘라내고
            const _prop = prop.substring(method.length);
            //대문자로 시작하는 영문자를 모두 찾음
            const matchs = _prop.match(/([A-Z])([a-z])*/g);
            //첫 번째 요소는 테이블 명
            const table = matchs.shift();
            //테이블 명에서 테이블 별칭 생성
            const tableAlias = table.toLowerCase().substring(0, 1);

            let query = `${command} * from ${table} ${tableAlias}`;

            //파라미터의 값에 따른 표현방식
            const getParamString = (param) => {
                if (typeof param == "string") {
                    return `'${param}'`;
                }
                else {
                    return param;
                }
            }

            //메서드의 파라미터를 args로 접근
            return (...args) => {
                while (matchs.length > 0) {
                    //하나씩 꺼내서 확인
                    const m = matchs.shift();
                    switch (m) {
                        case "By":
                            const byField = matchs.shift();
                            query += ` where ${tableAlias}.${byField} = ${getParamString(args.shift())}`
                            break;
                        case "And":
                            const andField = matchs.shift();
                            query += ` and ${tableAlias}.${andField} = ${getParamString(args.shift())}`
                            break;
                    }
                }

                console.log(`query : ${query}`);

                db.query(query, (err, rows, fields) => {
                    if (err) {
                        throw err;
                    }

                    console.log(rows);
                })
            };
        }
    });

api.getUsersByEmailAndName("abc@abc.com", "홍길동");
api.getUsersById(3);