declare module webscripten {
       export function compile(string:code):Promise<string>;
       export function link(string:code):Promise<string>;
       export function run(string:code):Promise<string>  ;
       export function compileLinkRun(string:code):Promise<string>;
};
