class DoubleBuffer {

  protected buffer1:ImageData;
  protected buffer2:ImageData;
  protected visibleIndex:number = 0;
  protected activeIndex:number = 0;
  protected w:number;
  protected h:number;

  setVisible(idx: number) {
    this.visibleIndex = idx;
  }

  setActive(idx: number) {
    this.activeIndex = idx;
  }

  constructor(w:number, h:number) {
    this.w = w;
    this.h = h;
    this.buffer1 = new ImageData(w, h);
    this.buffer2 = new ImageData(w, h);
  }

  SwapBuffers() {
    let idx:number = this.visibleIndex;
    this.visibleIndex = this.activeIndex;
    this.activeIndex = idx;
  }

  clearBuffer() {
    if (this.activeIndex == 0) {
      this.buffer1 = new ImageData(this.w, this.h);
    } else {
      this.buffer2 = new ImageData(this.w, this.h);
    }
    // let b:ImageData = this.activeIndex == 0 ? this.buffer1 : this.buffer2;
    // ClearBuffer(b, new Color(0,0,0));
  }

  getActive():ImageData {
    if (this.activeIndex == 0) {
      return this.buffer1;
    } else {
      return this.buffer2;
    }
  }

  getVisible():ImageData {
    if (this.visibleIndex == 0) {
      return this.buffer1;
    } else {
      return this.buffer2;
    }
  }

}