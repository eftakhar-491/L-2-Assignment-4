const MobileMenu = () => {
  return (
    <div className="flex flex-col gap-4">
      <button className="px-4 py-2 text-white hover:bg-neutral-700 rounded">Home</button>
      <button className="px-4 py-2 text-white hover:bg-neutral-700 rounded">About</button>
      <button className="px-4 py-2 text-white hover:bg-neutral-700 rounded">Services</button>
      <button className="px-4 py-2 text-white hover:bg-neutral-700 rounded">Contact</button>
    </div>
  );
};

export default MobileMenu;
