import { Post } from "./post";

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    posts: Post[];
}
