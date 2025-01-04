import { useEffect, useRef } from "react";

const Fireworks = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const particles = [];

    // Hàm tạo pháo hoa
    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.5; // Vị trí bắn lên
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Màu ngẫu nhiên
      fireworks.push({ x, y, color, size: 3, lifespan: 50 });
    };

    // Hàm tạo các hạt sau khi pháo hoa nổ
    const createParticles = (firework) => {
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particles.push({
          x: firework.x,
          y: firework.y,
          color: firework.color,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 1,
          lifespan: 100,
        });
      }
    };

    // Cập nhật và vẽ pháo hoa
    const updateFireworks = () => {
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];
        firework.lifespan--;
        firework.size += 0.5;

        if (firework.lifespan <= 0) {
          createParticles(firework); // Tạo các hạt khi pháo hoa hết tuổi thọ
          fireworks.splice(i, 1); // Xóa pháo hoa khỏi mảng
        }
      }
    };

    const drawFireworks = () => {
      fireworks.forEach((firework) => {
        ctx.beginPath();
        ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
        ctx.fillStyle = firework.color;
        ctx.fill();
      });
    };

    // Cập nhật và vẽ các hạt
    const updateParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.lifespan--;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.02; // Trọng lực
        particle.size *= 0.96; // Giảm kích thước dần

        if (particle.lifespan <= 0 || particle.size < 0.1) {
          particles.splice(i, 1); // Xóa hạt khi hết tuổi thọ
        }
      }
    };

    const drawParticles = () => {
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
    };

    // Vòng lặp hoạt hình
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa khung hình trước
      if (Math.random() < 0.022) createFirework(); // Tạo pháo hoa ngẫu nhiên
      updateFireworks();
      drawFireworks();
      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    };

    animate();

    // Xử lý khi resize màn hình
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default Fireworks;
