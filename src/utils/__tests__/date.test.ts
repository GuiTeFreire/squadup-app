import { calculateAge, parseBirthDate } from "../date";

describe("parseBirthDate", () => {
  it("converte DD/MM/AAAA válido em Date", () => {
    const date = parseBirthDate("15/03/1990");
    expect(date).toEqual(new Date(1990, 2, 15));
  });

  it("aceita espaços nas bordas", () => {
    expect(parseBirthDate("  15/03/1990  ")).toEqual(new Date(1990, 2, 15));
  });

  it("rejeita formato fora do padrão DD/MM/AAAA", () => {
    expect(parseBirthDate("1990-03-15")).toBeNull();
    expect(parseBirthDate("15/3/1990")).toBeNull();
    expect(parseBirthDate("")).toBeNull();
  });

  it("rejeita datas que não existem no calendário (ex.: 31 de fevereiro)", () => {
    expect(parseBirthDate("31/02/1990")).toBeNull();
  });

  it("rejeita 29 de fevereiro em ano não bissexto", () => {
    expect(parseBirthDate("29/02/1999")).toBeNull();
  });

  it("aceita 29 de fevereiro em ano bissexto", () => {
    expect(parseBirthDate("29/02/2000")).toEqual(new Date(2000, 1, 29));
  });
});

describe("calculateAge", () => {
  it("calcula a idade quando o aniversário já passou no ano de referência", () => {
    const birthDate = new Date(1990, 2, 15); // 15/03/1990
    const referenceDate = new Date(2026, 6, 8); // 08/07/2026
    expect(calculateAge(birthDate, referenceDate)).toBe(36);
  });

  it("ainda não soma o ano quando o aniversário cai depois da data de referência", () => {
    const birthDate = new Date(1990, 11, 25); // 25/12/1990
    const referenceDate = new Date(2026, 6, 8); // 08/07/2026
    expect(calculateAge(birthDate, referenceDate)).toBe(35);
  });

  it("soma o ano no próprio dia do aniversário", () => {
    const birthDate = new Date(1990, 6, 8); // 08/07/1990
    const referenceDate = new Date(2026, 6, 8); // 08/07/2026
    expect(calculateAge(birthDate, referenceDate)).toBe(36);
  });

  it("usa a data atual como referência por padrão", () => {
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    expect(calculateAge(eighteenYearsAgo)).toBe(18);
  });
});
