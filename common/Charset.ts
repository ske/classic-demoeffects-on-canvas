class Charset {
  public static CHAR_WIDTH:number = 16;
  public static CHAR_HEIGHT:number = 16;
  protected static CHARS_PER_ROW:number = 27;

  chars: {} = {};
  charlist: string = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~#@!.,0123456789-';

  constructor() {}

  draw(buffer:CanvasRenderingContext2D, character:string, x:number, y:number) {
    let char:HTMLCanvasElement = this.chars[character];
    if (char === undefined) return;
    buffer.drawImage(char, x, y);
  }

  protected extract(imageMap:CanvasRenderingContext2D) {
    let column: number = 0;
    let row: number = 0;

    for (let i: number = 0; i < this.charlist.length; i++) {
      let char: string = this.charlist[i];
      let c:HTMLCanvasElement = document.createElement("canvas");
      c.width = Charset.CHAR_WIDTH;
      c.height = Charset.CHAR_HEIGHT;

      let id:ImageData = imageMap.getImageData(column, row, Charset.CHAR_WIDTH, Charset.CHAR_HEIGHT);
      let ctx:CanvasRenderingContext2D = c.getContext("2d");
      ctx.putImageData(id, 0, 0);
      this.chars[char] = c;

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
      img.onerror = () => {
        reject();
      }
      img.onload = (e: Event) => {
        let tmpCanvas:HTMLCanvasElement = document.createElement("canvas");
        tmpCanvas.style.display = 'none';
        tmpCanvas.setAttribute("width", img.width.toString());
        tmpCanvas.setAttribute("height", img.height.toString());
        let el:HTMLCanvasElement = root.appendChild(tmpCanvas);
        let scr:CanvasRenderingContext2D = el.getContext("2d") as CanvasRenderingContext2D;
        scr.drawImage(img, 0, 0);
        this.extract(scr);
        root.removeChild(el);
        resolve();
      };
      img.src = imagefile;
    });
  }
}