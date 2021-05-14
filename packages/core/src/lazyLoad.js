export default function lazyLoad(element, renderer, options) {
  if (!element.dataset.loaded) {
    renderer.lazyLoad(element, options);
    element.dataset.loaded = 'true';
    element.style.opacity = '1';
  }
}
