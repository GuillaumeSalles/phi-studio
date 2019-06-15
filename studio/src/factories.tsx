import uuid from "uuid/v4";
import * as T from "./types";
import { colors } from "./styles";

function ref(id: string): T.Ref {
  return { type: "ref", id };
}

function entry<TValue>(value: TValue): [string, TValue] {
  return [uuid(), value];
}

export function px(value: number): T.Length {
  return { type: "px", value };
}

export function makeDefaultProject() {
  const defaultFontFamily: [string, string] = [
    "default",
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
  ];
  const fontFamilies: T.FontFamiliesMap = new Map([defaultFontFamily]);

  const white = entry({ name: "white", value: "#FFFFFF" });
  const black = entry({ name: "black", value: "#000000" });
  const primary = entry({ name: "primary", value: colors.primary });

  const breakpoints = new Map([
    ["small", px(544)],
    ["medium", px(768)],
    ["large", px(1012)],
    ["xlarge", px(1280)]
  ]);

  const light = entry({ name: "light", value: 300 });
  const normal = entry({ name: "normal", value: 400 });
  const bold = entry({ name: "bold", value: 700 });

  const fontSizes: [string, string][] = [14, 16, 18, 24, 26, 32].map(
    (x, index) => [`FS${index + 1}`, `${x}px`]
  );

  const helloWorldTextLayer: T.TextLayer = {
    id: uuid(),
    type: "text",
    name: "root",
    tag: "h1",
    text: "Hello world",
    textAlign: "left",
    fontSize: ref(fontSizes[5][0]),
    fontFamily: ref(defaultFontFamily[0]),
    fontWeight: ref(normal[0]),
    lineHeight: 1.2,
    color: ref(black[0])
  };

  const helloWorld = entry({
    name: "HelloWorld",
    layout: helloWorldTextLayer
  });

  const components: T.ComponentMap = new Map([helloWorld]);

  return {
    colors: new Map([black, white, primary]),
    fontFamilies: new Map(fontFamilies),
    fontSizes: new Map(fontSizes),
    fontWeight: new Map([light, normal, bold]),
    breakpoints: new Map(breakpoints),
    components
  };
}