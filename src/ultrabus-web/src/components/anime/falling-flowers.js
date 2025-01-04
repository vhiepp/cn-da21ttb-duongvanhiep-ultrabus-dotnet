import { useEffect, useRef } from "react";

const FallingFlowers = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const flowers = [];
    const numFlowers = Math.floor(window.innerWidth / 100) * 2;
    // console.log(numFlowers);

    // Hoa mai mẫu
    const createFlower = () => {
      const size = Math.random() * 10 + 5; // Kích thước hoa
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speedY: Math.random() * 1 + 0.5, // Tốc độ rơi
        speedX: (Math.random() - 0.5) * 1, // Tốc độ gió
        size,
        opacity: Math.random() * 0.5 + 0.5, // Độ trong suốt
        angle: Math.random() * Math.PI * 2, // Góc nghiêng
        rotateSpeed: Math.random() * 0.02 + 0.01, // Tốc độ xoay
        color: Math.random() > 0.5 ? "#FFD700" : "#FF69B4", // Chọn ngẫu nhiên giữa vàng (#FFD700) và hồng (#FF69B4)
      };
    };

    for (let i = 0; i < numFlowers; i++) {
      flowers.push(createFlower());
    }

    const drawFlower = (flower) => {
      ctx.save();
      ctx.globalAlpha = flower.opacity;
      ctx.translate(flower.x, flower.y);
      ctx.rotate(flower.angle);

      // Vẽ hoa mai
      ctx.fillStyle = flower.color; // Màu vàng
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.rotate((Math.PI * 2) / 5);
        ctx.moveTo(0, 0 - flower.size);
        ctx.quadraticCurveTo(
          0 + flower.size / 1.2,
          0 - flower.size / 1.2,
          0,
          0
        );
        ctx.fill();
      }

      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flowers.forEach((flower) => {
        flower.y += flower.speedY;
        flower.x += flower.speedX;
        flower.angle += flower.rotateSpeed;

        // Khi hoa rơi xuống đáy, đặt lại
        if (flower.y > canvas.height) {
          flower.y = -flower.size;
          flower.x = Math.random() * canvas.width;
        }

        drawFlower(flower);
      });

      requestAnimationFrame(update);
    };

    update();

    // Xử lý resize màn hình
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

export default FallingFlowers;
