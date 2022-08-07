import {init_usdpl, target, init_embedded, call_backend} from "usdpl-front";

const USDPL_PORT: number = 25717;

// Utility

export function resolve(promise: Promise<any>, setter: any) {
    (async function () {
        let data = await promise;
        if (data != null) {
            console.debug("Got resolved", data);
            setter(data);
        } else {
            console.warn("Resolve failed:", data);
        }
    })();
}

export async function initBackend() {
    // init usdpl
    await init_embedded();
    init_usdpl(USDPL_PORT);
    console.log("USDPL started for framework: " + target());
    //setReady(true);
}

export type CAbout = {
    name: string;
    version: string;
    description: string;
    url: string | null;
    author: string | null;
    license: string | null;
}

export type CButton = {
    element: string; // "button"
    title: string;
}

export type CToggle {
    element: string; // "toggle"
    title: string;
    description: string | null;
}

export type CSlider {
    element: string; // "slider"
    title: string;
    min: number;
    max: number;
    notches: string[] | null;
}

export type CReading {
    element: string; // "reading"
    title: string;
    period_ms: number;
}

export type CElement = CButton | CToggle | CSlider | CReading;

export async function getElements(): Promise<CElement[]> {
    return await call_backend("get_items", []);
}

export async function onUpdate(index: number, value: any): Promise<any> {
    return (await call_backend("on_update", [index, value]))[0];
}

export async function getReading(index: number): Promise<string | null> {
    return (await call_backend("get_reading", [index]))[0];
}

export async function getAbout(): Promise<CAbout> {
    return (await call_backend("get_about", []))[0];
}

export async function reload(): Promise<CElement[]> {
    return await call_backend("reload", []);
}
