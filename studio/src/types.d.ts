export type ComponentMap = Map<string, Component>;

export type Component = {
  name: string;
  layout?: Layer;
  props: ComponentProp[];
};

export type ComponentProp = {
  id: string;
  name: string;
  type: ComponentPropType;
};

export type ComponentPropType = "text" | "layer";

export interface ILayer {
  id: string;
  name: string;
  style: LayerStyle;
  mediaQueries: Array<MediaQuery>;
  overrides: Override[];
}

export type Override = {
  id: string;
  propId: string;
  layerProp: string;
};

export type Layer = ContainerLayer | TextLayer | LinkLayer;

export type LayerType = "container" | "text" | "link";

export interface ContainerLayer extends ILayer {
  type: "container";
  tag: "div";
  children: Layer[];
}

export interface TextLayer extends ILayer {
  type: "text";
  tag: TextLayerTag;
  text: string;
}

export interface LinkLayer extends ILayer {
  type: "link";
  tag: "a";
  text: string;
  href: string;
}

type StyleOverride = {
  id: string;
  pseudoClass: string;
  style: LayerStyleWithoutOverrides;
};

type LayerStyle = Typography &
  Display &
  Background &
  Dimensions &
  Margin &
  Padding &
  TextDecoration & {
    overrides?: StyleOverride[];
  };

export type Display = {
  display?: DisplayProperty;
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
};

export type DisplayProperty = "none" | "block" | "inline" | "flex";

export type MediaQuery = {
  id: string;
  minWidth: Ref;
  style: LayerStyle;
};

export type Typography = {
  letterSpacing?: Length;
  lineHeight?: number;
  color?: Color;
  fontSize?: Ref;
  fontFamily?: Ref;
  fontWeight?: Ref;
  textAlign?: TextAlignProperty;
};

export type TextDecoration = {
  isUnderlined?: boolean;
  isStrikedThrough?: boolean;
};

export type FlexDirection = "column" | "row" | "column-reverse" | "row-reverse";

export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

export type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

export type AlignItems =
  | "stretch"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline";

export type AlignContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "stretch";

export type TextLayerTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span";

export type TextAlignProperty = "left" | "center" | "right" | "justify";

export type Dimensions = {
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
};

export type Margin = {
  marginTop?: Length;
  marginRight?: Length;
  marginBottom?: Length;
  marginLeft?: Length;
};

export type Padding = {
  paddingTop?: Length;
  paddingRight?: Length;
  paddingBottom?: Length;
  paddingLeft?: Length;
};

export type Background = {
  backgroundColor?: Color;
};

export type Length = {
  type: "px";
  value: number;
};

export type Color = Ref | HexColor;

export type Ref = {
  type: "ref";
  id: string;
};

export type HexColor = {
  type: "hex";
  value: string;
};

export type ColorsMap = Map<string, ColorDefinition>;
export type ColorDefinition = {
  name: string;
  value: string;
};

export type FontSizesMap = Map<string, FontSizeDefinition>;
export type FontSizeDefinition = { name: string; value: string };

export type FontFamiliesMap = Map<string, FontFamilyDefinition>;
export type FontFamilyDefinition = { name: string; value: string };

export type FontWeightsMap = Map<string, FontWeightDefinition>;
export type FontWeightDefinition = {
  name: string;
  value: number;
};

export type LineHeightMap = Map<string, LineHeightDefinition>;
export type LineHeightDefinition = {
  name: string;
  value: number;
};

export type BreakpointsMap = Map<string, BreakpointDefinition>;
export type BreakpointDefinition = { name: string; value: Length };

export type Refs = {
  isSaved: boolean;
  fileName: string | undefined;
  colors: ColorsMap;
  fontSizes: FontSizesMap;
  fontFamilies: FontFamiliesMap;
  fontWeights: FontWeightsMap;
  lineHeights: LineHeightMap;
  breakpoints: BreakpointsMap;
  components: ComponentMap;
};
