
function Footer() {
  return (
    <footer className="bg-primary">
      <div className="container">
        <p className="py-2 text-white">
          All rights reserved
          {' '}
          {new Date().getFullYear()}
          {' '}
          &copy;
        </p>
      </div>
    </footer>
  );
}

export default Footer;
