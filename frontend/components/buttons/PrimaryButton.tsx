type PrimaryButtonProps = {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

const PrimaryButton = ({
  onClick,
  className,
  disabled = false,
  children,
}: PrimaryButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`${className} w-full h-full py-2 px-4 rounded-xl bg-indigo-500 text-white font-bold text-sm  active:bg-indigo-700 hover:bg-indigo-400`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
