import React from "react";

const PageNotFound = () => {
  return (
    <div
      id="oopss"
      className="fixed left-0 top-0 w-full h-full bg-gradient-to-br z-50 flex justify-center items-center"
    >
      <div
        id="error-text"
        className="text-2xl font-bold text-center text-black rtl"
      >
        <img
          src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
          alt="404"
          className="mb-5 h-80 ml-[70px]"
        />
        <span className="text-4xl font-extrabold mb-12 block">404 PAGE</span>
        <p className="text-xl mb-6">
          The page you were looking for could not be found.
        </p>
        <a
          href="https://auth-fln.apie.in/login"
          className="mt-5 inline-block bg-[#C8EE44] text-black text-2xl py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 font-extrabold hover:bg-orange-300 "
        >
          ... Back to previous page
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
