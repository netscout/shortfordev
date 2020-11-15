record Hero(string Name, int Age);

static class HeroExt
{
    public static string IsHero(this Hero h) => h.Name switch
    {
        "임꺽정" or "홍길동" => "한국 영웅",
        "아이언맨" or "캡틴" => "미국 영웅",
        _ => "영웅 아님"
    };

    public static string GetPower(this Hero h) => h.Age switch
    {
        < 15 => "약함",
        >= 16 and <= 29 => "강함",
        >= 30 and <= 49 => "아직은 강함",
        >= 50 and <= 69 => "무리 하지 말자",
        _ => "조용히 있자"
    };
}