import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

interface Bubble {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  opacity: number;
  color: { r: number; g: number; b: number };
}

@Directive({
  selector: '[appBubbleCancas]',
  standalone: true,
})
export class BubbleCancas implements AfterViewInit, OnDestroy {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private bubbles: Bubble[] = [];
  private animId!: number;

  private bubbleColors = [
    { r: 167, g: 139, b: 250 },
    { r: 96, g: 165, b: 250 },
    { r: 52, g: 211, b: 153 },
    { r: 251, g: 191, b: 36 },
    { r: 249, g: 115, b: 22 },
    { r: 236, g: 72, b: 153 },
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.canvas = this.el.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.init();
    this.draw();

    window.addEventListener('resize', this.handleResize);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animId);
    window.removeEventListener('resize', this.handleResize);
  }

  private handleResize = () => {
    cancelAnimationFrame(this.animId);
    this.init();
    this.draw();
  };

  private resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  private makeBubble(): Bubble {
    return {
      x: Math.random() * this.canvas.width,
      y: this.canvas.height + Math.random() * 200,
      r: 10 + Math.random() * 40,
      dx: (Math.random() - 0.5) * 0.6,
      dy: -(0.4 + Math.random() * 0.8),
      opacity: 0.08 + Math.random() * 0.15,
      color: this.bubbleColors[Math.floor(Math.random() * this.bubbleColors.length)],
    };
  }

  private init() {
    this.resize();
    this.bubbles = Array.from({ length: 18 }, () => this.makeBubble()).map((b) => ({
      ...b,
      y: Math.random() * this.canvas.height,
    }));
  }

  private draw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const b of this.bubbles) {
      const { r, g, b: bl } = b.color;

      this.ctx.beginPath();
      this.ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(${r},${g},${bl},${b.opacity * 2})`;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      const grad = this.ctx.createRadialGradient(
        b.x - b.r * 0.3,
        b.y - b.r * 0.3,
        b.r * 0.1,
        b.x,
        b.y,
        b.r,
      );

      grad.addColorStop(0, `rgba(${r},${g},${bl},${b.opacity})`);
      grad.addColorStop(1, `rgba(${r},${g},${bl},0)`);

      this.ctx.fillStyle = grad;
      this.ctx.fill();

      b.x += b.dx;
      b.y += b.dy;

      if (b.y + b.r < 0) Object.assign(b, this.makeBubble());
    }

    this.animId = requestAnimationFrame(this.draw);
  };
}
