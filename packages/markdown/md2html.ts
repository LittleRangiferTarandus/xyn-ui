import { marked } from "marked";

export async function md2html(mdStr: string) {
    let html =   marked.parse(mdStr)
    return html;
}