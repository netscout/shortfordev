using System;

Console.WriteLine("Hello World!");

var hero1 = new Hero("홍길동", 29);

var hero2 = new Hero("아이언맨", 49);

Console.WriteLine(hero1.IsHero());
Console.WriteLine(hero2.IsHero());
Console.WriteLine(hero1.GetPower());
Console.WriteLine(hero2.GetPower());