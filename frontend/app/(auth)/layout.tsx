const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full h-full min-h-screen flex flex-col items-center justify-center  ">
      {children}
    </section>
  );
};

export default AuthLayout;
