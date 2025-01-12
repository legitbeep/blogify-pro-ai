const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary/10 via-primary/5 to-background/10 backdrop-blur-lg border-t border-primary/10">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Pitchers. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
