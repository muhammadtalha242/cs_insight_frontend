export function getCurrentColor(node: Element | null) {
  return node && window?.getComputedStyle(node).color;
}
