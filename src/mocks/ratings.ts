import type { Rating } from "../types";
import { MOCK_MATCHES } from "./matches";
import { MOCK_USERS } from "./users";

const [guilherme, ana, rafael, , thiago, beatriz] = MOCK_USERS;
// Única partida encerrada do mock — as avaliações pós-partida só fazem sentido
// referenciando um jogo que já aconteceu (ver .status/progress.md, sessão 17).
const closedMatch = MOCK_MATCHES.find((m) => m.id === "match-13")!;

export const MOCK_RATINGS: Rating[] = [
  {
    id: "rating-1",
    ratedUser: guilherme,
    raterUser: thiago,
    match: closedMatch,
    criteria: { punctuality: 5, respect: 5, behavior: 5, presence: 4, overall: 5 },
    comment:
      "Guilherme é pontual demais, sempre aparece antes de todo mundo. Ótimo de jogar junto!",
    createdAt: "2026-05-10T14:00:00Z",
  },
  {
    id: "rating-2",
    ratedUser: guilherme,
    raterUser: beatriz,
    match: closedMatch,
    criteria: { punctuality: 4, respect: 5, behavior: 5, presence: 5, overall: 5 },
    comment: "Joga limpo e anima o time. Recomendo!",
    createdAt: "2026-05-10T15:30:00Z",
  },
  {
    id: "rating-3",
    ratedUser: ana,
    raterUser: guilherme,
    match: closedMatch,
    criteria: { punctuality: 5, respect: 5, behavior: 5, presence: 5, overall: 5 },
    comment: "Ana organiza tudo com muita competência. Pelada fluiu muito bem.",
    createdAt: "2026-05-10T16:00:00Z",
  },
  {
    id: "rating-4",
    ratedUser: ana,
    raterUser: beatriz,
    match: closedMatch,
    criteria: { punctuality: 5, respect: 5, behavior: 4, presence: 5, overall: 5 },
    createdAt: "2026-05-11T09:00:00Z",
  },
  {
    id: "rating-5",
    ratedUser: rafael,
    raterUser: guilherme,
    match: closedMatch,
    criteria: { punctuality: 4, respect: 4, behavior: 5, presence: 4, overall: 4 },
    comment: "Bom jogador, mas às vezes chega no limite do horário. No geral, ótimo companheiro.",
    createdAt: "2026-05-10T14:30:00Z",
  },
  {
    id: "rating-6",
    ratedUser: beatriz,
    raterUser: ana,
    match: closedMatch,
    criteria: { punctuality: 5, respect: 5, behavior: 5, presence: 5, overall: 5 },
    comment: "Beatriz é incrível! Organiza, motiva e ainda joga muito bem.",
    createdAt: "2026-05-11T10:00:00Z",
  },
  {
    id: "rating-7",
    ratedUser: thiago,
    raterUser: rafael,
    match: closedMatch,
    criteria: { punctuality: 5, respect: 5, behavior: 5, presence: 4, overall: 5 },
    comment: "Thiago joga muito e ainda anima todo mundo. Vale chamar sempre.",
    createdAt: "2026-05-11T11:00:00Z",
  },
];
