"use client";

type DialogBox = {
  isOpen: boolean;
  children: React.ReactNode;
};

const DialogBox = ({
  isOpen,
  children,
}: DialogBox) => {
  return (
    <section
      className={`fixed top-0 left-0 z-50 w-full h-full bg-black/30 items-center justify-center ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      {children}
    </section>
  );
};

export default DialogBox;