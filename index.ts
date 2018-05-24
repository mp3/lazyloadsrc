export default class LazyLoadSrc {

  private readonly DATA_ATTR = '[data-src]'

  private count = 0

  private items: NodeList
  private max: number = 0

  constructor() {
    this.items = document.querySelectorAll(this.DATA_ATTR)
    if (!this.items.length) return

    this.filterEmpty()
    this.addListener()
    this.callNext()
  }

  private unbracket(str: string) {
    const matches = str.match(/^\[|\]$/g)
    const hasBrackets = (matches) ? matches.length === 2 : false
    if (hasBrackets) str = str.replace(/^.|.$/g, '')

    return str
  }

  private filterEmpty() {
    const imgs = Array.from(this.items).filter((img) => !!(img as HTMLElement).getAttribute(this.unbracket(this.DATA_ATTR)))
    this.max = imgs.length
  }

  private addListener() {
    Array.from(this.items).forEach(item => item.addEventListener('onload', () => this.lazyLoaded()))
    Array.from(this.items).forEach(item => item.addEventListener('error', () => this.lazyLoaded()))
  }

  private lazyLoaded() {
    this.count++
    if (this.count < this.max) this.callNext()
  }

  private callNext() {
    const img = this.items[this.count] as HTMLImageElement
    img.src = img.dataset.src || ''
  }
}
