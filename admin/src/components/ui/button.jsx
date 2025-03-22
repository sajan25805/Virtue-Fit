// // // // import React from "react";

// // // // const Button = React.forwardRef(({ variant = "default", size = "default", ...props }, ref) => {
// // // //   const baseStyles =
// // // //     "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A8FF] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

// // // //   const variantStyles = {
// // // //     default: "bg-[#00A8FF] text-white hover:bg-[#0096E6]",
// // // //     destructive: "bg-red-500 text-white hover:bg-red-600",
// // // //     outline: "border border-[#ECECEE] bg-transparent hover:bg-[#F7F7FD]",
// // // //     secondary: "bg-[#F7F7FD] text-[#0E0E2C] hover:bg-[#ECECEE]",
// // // //     ghost: "bg-transparent hover:bg-[#F7F7FD] hover:text-[#0E0E2C]",
// // // //     link: "bg-transparent underline-offset-4 hover:underline text-[#00A8FF]",
// // // //   };

// // // //   const sizeStyles = {
// // // //     default: "h-10 py-2 px-4",
// // // //     sm: "h-9 px-3 rounded-md",
// // // //     lg: "h-11 px-8 rounded-md",
// // // //     icon: "h-10 w-10",
// // // //   };

// // // //   return (
// // // //     <button
// // // //       className={`${baseStyles} ${variantStyles[variant] || ""} ${sizeStyles[size] || ""}`}
// // // //       ref={ref}
// // // //       {...props}
// // // //     />
// // // //   );
// // // // });

// // // // Button.displayName = "Button";

// // // // export { Button };


// // // import React from "react";

// // // const Button = React.forwardRef(({ variant = "default", size = "default", ...props }, ref) => {
// // //   const baseStyles =
// // //     "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A8FF] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

// // //   const variantStyles = {
// // //     default: "bg-[#FF9800] hover:bg-[#FF5722] text-white rounded-full px-4 py-2 flex items-center justify-center space-x-2", // Updated default variant
// // //     destructive: "bg-red-500 text-white hover:bg-red-600",
// // //     outline: "border border-[#ECECEE] bg-transparent hover:bg-[#F7F7FD]",
// // //     secondary: "bg-[#F7F7FD] text-[#0E0E2C] hover:bg-[#ECECEE]",
// // //     ghost: "bg-transparent hover:bg-[#F7F7FD] hover:text-[#0E0E2C]",
// // //     link: "bg-transparent underline-offset-4 hover:underline text-[#00A8FF]",
// // //   };

// // //   const sizeStyles = {
// // //     default: "h-10 py-2 px-4",
// // //     sm: "h-9 px-3 rounded-md",
// // //     lg: "h-11 px-8 rounded-md",
// // //     icon: "h-10 w-10",
// // //   };

// // //   return (
// // //     <button
// // //       className={`${baseStyles} ${variantStyles[variant] || ""} ${sizeStyles[size] || ""}`}
// // //       ref={ref}
// // //       {...props}
// // //     />
// // //   );
// // // });

// // // Button.displayName = "Button";

// // // export { Button };




// // import React from "react";
// // import { Plus } from "react-icons/fa"; // You can use any icon from a library you prefer, like react-icons

// // const Button = ({ onClick, children, className, ...props }) => {
// //   const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A8FF] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

// //   return (
// //     <button
// //       onClick={onClick}
// //       className={`bg-[#FF9800] hover:bg-[#FF5722] text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 ${className}`}
// //       {...props}
// //     >
// //       <Plus className="inline-block mr-2" /> {children}
// //     </button>
// //   );
// // };

// // export { Button };
// import React from "react";

// const Button = ({ onClick, children, className, ...props }) => {
//   const baseStyles =
//     "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A8FF] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

//   return (
//     <button
//       onClick={onClick}
//       className={`bg-[#FF9800] hover:bg-[#FF5722] text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// export { Button };



import React from "react";

const Button = ({ onClick, children, className, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
