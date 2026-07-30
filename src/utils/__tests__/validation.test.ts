import { validateEmail } from "../validation";

describe("validateEmail", () => {
  it("aceita e-mails com domínio e TLD", () => {
    expect(validateEmail("user@example.com")).toBe(true);
    expect(validateEmail("first.last@sub.example.com")).toBe(true);
  });

  it("rejeita e-mails sem domínio com TLD (mesma exigência do EmailStr do backend)", () => {
    expect(validateEmail("a@b")).toBe(false);
    expect(validateEmail("user@")).toBe(false);
    expect(validateEmail("@example.com")).toBe(false);
  });

  it("rejeita strings sem @ ou vazias", () => {
    expect(validateEmail("")).toBe(false);
    expect(validateEmail("not-an-email")).toBe(false);
  });

  it("rejeita e-mails com espaços", () => {
    expect(validateEmail("user @example.com")).toBe(false);
    expect(validateEmail("user@exa mple.com")).toBe(false);
  });
});
