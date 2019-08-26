class Charset {
  public static CHAR_WIDTH:number = 16;
  public static CHAR_HEIGHT:number = 16;
  protected static CHARS_PER_ROW:number = 27;

  chars: {} = {};
  charlist: string = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~#@!.,0123456789-';

  constructor() {}

  drawTo(buffer:ImageData, character:string, x:number, y:number) {
    // Copy character into the buffer byte-by-byte
    let char:ImageData = this.chars[character];
    if (char === undefined) return;
    for (let ox=0; ox<char.width; ox++) {
      for (let oy=0; oy<char.height; oy++) {
        let c = GetPixel(char, new Point2D(ox, oy));
        PutPixel(buffer, new Point2D(x + ox, y + oy), c);
      }
    }
  }

  extractChars(imageMap: CanvasRenderingContext2D) {
    let column: number = 0;
    let row: number = 0;

    for (let i: number = 0; i < this.charlist.length; i++) {
      let char: string = this.charlist[i];
      this.chars[char] = imageMap.getImageData(column, row, Charset.CHAR_WIDTH, Charset.CHAR_HEIGHT);

      column += Charset.CHAR_WIDTH;
      if (column > (Charset.CHARS_PER_ROW-1) * Charset.CHAR_WIDTH) {
        column = 0;
        row += Charset.CHAR_HEIGHT;
      }
    }
  }

  get(char: string):ImageData {
    if (this.chars[char] !== undefined) {
      return this.chars[char] as ImageData;
    }
    return null;
  }

  load(imagefile: string, root:HTMLElement): Promise<void> {
    let img: HTMLImageElement = new Image();
    return new Promise<void>((resolve, reject) => {
      img.onerror = (e:Event) => {
        reject();
      };
      img.onload = (e: Event) => {
        let tmpCanvas:HTMLCanvasElement = document.createElement("canvas");
        tmpCanvas.style.display = 'none';
        tmpCanvas.setAttribute("width", img.width.toString());
        tmpCanvas.setAttribute("height", img.height.toString());
        let el:HTMLCanvasElement = root.appendChild(tmpCanvas);
        let scr:CanvasRenderingContext2D = el.getContext("2d") as CanvasRenderingContext2D;
        scr.drawImage(img, 0, 0);
        this.extractChars(scr);
        root.removeChild(el);
        resolve();
      };
      img.src = imagefile;
    });
  }
}