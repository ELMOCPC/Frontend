const Logo = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a className="brand" href="#home" onClick={scrollToTop}>
      <span className="wordmark wordmark-sm">
        <span className="wm-elmo">ELMO</span>
        <span className="wm-c1">C</span>
        <span className="wm-p">P</span>
        <span className="wm-c2">C</span>
        <span className="wm-year"> 2025</span>
      </span>
    </a>
  );
};

export default Logo;
