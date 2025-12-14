import { useEffect, useRef } from "react";

export default function NetworkBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        let width = 0;
        let height = 0;

        const isMobile = window.innerWidth < 768;
        const PARTICLES = isMobile ? 36 : 90;
        const LINK_DIST = 140;
        const MOUSE_RADIUS = 160;

        const mouse = { x: 0, y: 0, active: false };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        const styles = () => getComputedStyle(document.documentElement);

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            r: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.r = Math.random() * 1.5 + 0.6;
            }

            update() {
                if (!isMobile && mouse.active) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < MOUSE_RADIUS) {
                        this.vx += dx * 0.00025;
                        this.vy += dy * 0.00025;
                    }
                }

                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = styles().getPropertyValue("--network-dot");
                ctx.fill();
            }
        }

        const particles = Array.from({ length: PARTICLES }, () => new Particle());

        const drawGlow = () => {
            const glowColor = styles().getPropertyValue("--network-glow");

            document
                .querySelectorAll<HTMLElement>("[data-network-glow]")
                .forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2 + window.scrollY;

                    const gradient = ctx.createRadialGradient(
                        cx,
                        cy,
                        0,
                        cx,
                        cy,
                        240
                    );

                    gradient.addColorStop(0, glowColor);
                    gradient.addColorStop(1, "transparent");

                    ctx.fillStyle = gradient;
                    ctx.fillRect(cx - 240, cy - 240, 480, 480);
                });
        };

        let raf = 0;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            drawGlow();

            particles.forEach((p, i) => {
                p.update();
                p.draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < LINK_DIST) {
                        ctx.strokeStyle =
                            styles().getPropertyValue("--network-line");
                        ctx.globalAlpha = 1 - dist / LINK_DIST;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            });

            raf = requestAnimationFrame(animate);
        };

        animate();

        const onMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        };

        const onLeave = () => {
            mouse.active = false;
        };

        if (!isMobile) {
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseleave", onLeave);
        }


        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
        };

    }, []);

    return <canvas ref={canvasRef} className="network-bg" />;
}
