import * as T from "./types";
import { assertUnreachable } from "./utils";

export function layerTypeToName(type: T.LayerType): string {
  switch (type) {
    case "text":
      return "text";
    case "link":
      return "link";
    case "container":
      return "container";
  }
  assertUnreachable(type);
}

export function findLayerById(root: T.Layer, id: string): T.Layer | undefined {
  if (root.id === id) {
    return root;
  }

  if (root.type === "container") {
    for (const child of root.children) {
      const layer = findLayerById(child, id);
      if (layer) {
        return layer;
      }
    }
  }

  return;
}

export function updateLayer(
  rootLayer: T.Layer | undefined,
  newLayer: T.Layer
): T.Layer {
  if (!rootLayer) {
    return newLayer;
  }

  if (rootLayer.id === newLayer.id) {
    return newLayer;
  }

  if (rootLayer.type === "container") {
    return {
      ...rootLayer,
      children: rootLayer.children.map(child => updateLayer(child, newLayer))
    };
  }

  return rootLayer;
}

export function layerTreeToArray(root: T.Layer | undefined): T.Layer[] {
  if (!root) {
    return [];
  }
  const result = [root];
  if (root.type === "container") {
    return result.concat(root.children.map(layerTreeToArray).flat());
  }
  return result;
}

export function isLayerUsingRef(
  layer: T.Layer,
  refId: string,
  isUsingRef: (style: T.LayerStyle, refId: string) => boolean
): boolean {
  return [layer.style, ...layer.mediaQueries.map(mq => mq.style)].some(style =>
    isUsingRef(style, refId)
  );
}
