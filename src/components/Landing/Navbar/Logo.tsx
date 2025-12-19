// src/pages/LandingPage/components/Navbar/Logo.tsx
const Logo = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={scrollToTop}
    >
      <div className="text-xl font-bold">
        <span className="text-[#ffffff]">ELMO</span>
        <span className="text-[#46BEF6]">C</span>
        <span className="text-[#D7263D]">P</span>
        <span className="text-[#FFD500]">C</span>
        <span className="text-white"> 2025</span>
      </div>
    </div>
  );
};

export default Logo;
