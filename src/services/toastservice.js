import { h, render } from "vue";

export function removeElement(el) {
  console.log(el.remove);
  if (typeof el.remove !== "undefined") {
    el.remove();
  } else {
    el.parentNode?.removeChild(el);
  }
}

export function createComponent(component, props, parent, slots = {}) {
  const vNode = h(component, props, slots);
  const container = document.createElement("div");
  parent.appendChild(container);
  console.log(container);
  render(vNode, container);

  return vNode.component;
}
