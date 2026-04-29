import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserDisplay, UserModel } from '../user-display/user-display';

interface Bubble {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  opacity: number;
  color: { r: number; g: number; b: number };
}

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule, UserDisplay],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements AfterViewInit {
  submitted = false;
  showDisplay = false;
  users: UserModel[] = [];

  model: UserModel = {
    name: '',
    address: '',
    contact: '',
    gender: '',
    email: '',
  };

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.users.push({ ...this.model });
      this.showDisplay = true;
      this.submitted = false;
      form.resetForm();
      this.model = { name: '', address: '', contact: '', gender: '', email: '' };
    }
  }

  goBack() {
    this.showDisplay = false;
  }

  ngAfterViewInit(): void {
    const canvas = document.querySelector('.bubble-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let bubbles: Bubble[] = [];
    let animId: number;

    const bubbleColors = [
      { r: 167, g: 139, b: 250 },
      { r: 96, g: 165, b: 250 },
      { r: 52, g: 211, b: 153 },
      { r: 251, g: 191, b: 36 },
      { r: 249, g: 115, b: 22 },
      { r: 236, g: 72, b: 153 },
    ];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const makeBubble = (): Bubble => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      r: 10 + Math.random() * 40,
      dx: (Math.random() - 0.5) * 0.6,
      dy: -(0.4 + Math.random() * 0.8),
      opacity: 0.08 + Math.random() * 0.15,
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
    });

    const init = () => {
      resize();
      bubbles = Array.from({ length: 18 }, makeBubble).map((b) => ({
        ...b,
        y: Math.random() * canvas.height,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const b of bubbles) {
        const { r, g, b: bl } = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r},${g},${bl},${b.opacity * 2})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        const grad = ctx.createRadialGradient(
          b.x - b.r * 0.3,
          b.y - b.r * 0.3,
          b.r * 0.1,
          b.x,
          b.y,
          b.r,
        );
        grad.addColorStop(0, `rgba(${r},${g},${bl},${b.opacity})`);
        grad.addColorStop(1, `rgba(${r},${g},${bl},0)`);
        ctx.fillStyle = grad;
        ctx.fill();
        b.x += b.dx;
        b.y += b.dy;
        if (b.y + b.r < 0) Object.assign(b, makeBubble());
      }
      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', () => {
      cancelAnimationFrame(animId);
      init();
      draw();
    });
  }
}
