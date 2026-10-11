// @deno-types="npm:@types/jsdom@30.0.0"
import { JSDOM } from "npm:jsdom@30.1.2";
const dom = new JSDOM(await Deno.readTextFile("./map.xml"), { contentType: "text/xml" });
for (const kit of dom.window.document.querySelector("unless[min-server-version]:has(> kit)")?.querySelectorAll("kit[filter]") || []) {
    const repl = kit.getAttribute("filter")?.replace(/next_kit=(\d+)/, (match, p1) => {
        return `next_kit=${p1 - 1}`;
    });
    repl && kit.setAttribute("filter", repl);
}

console.log(dom.serialize());
