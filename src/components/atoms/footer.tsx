const Footer = () => {
  return (
    <footer className="bg-transparent backdrop-blur-lg border-t border-primary/10 mt-auto ">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Pitchers. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
