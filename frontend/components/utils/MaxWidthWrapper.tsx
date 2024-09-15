
type MaxWidthWrapperProps = {
    children: React.ReactNode,
    className?: string,
    outerClassName?: string,
}

const MaxWidthWrapper = ({ children, className, outerClassName }:MaxWidthWrapperProps) => {
    return (
      <div className={`w-full flex justify-center ${outerClassName}  `}>
        <div className={`max-w-[800px] w-full ${className}`}>{children}</div>
      </div>
    );
  };
  
  export default MaxWidthWrapper;