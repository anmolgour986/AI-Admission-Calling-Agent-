const Navbar = () => {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      <h2 className="text-white text-xl font-semibold">
        Dashboard
      </h2>

      <div className="text-slate-300">
        Admin
      </div>
    </header>
  );
};

export default Navbar;