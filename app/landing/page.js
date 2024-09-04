export default function LandingPage() {
    return (
      <div className="bg-white min-h-screen flex">
        <div className="w-3/4 flex flex-col justify-center p-16">
          <h1 className="text-6xl font-bold text-black mb-4">Welcome to __</h1>
          <p className="text-xl text-gray-500 mb-8">
            Slogan/Catchphrase...
          </p>
          <div className="flex space-x-4">
            <button className="bg-[#93c7c3] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#67cec3] transition">
              Login
            </button>
            <button className="bg-white text-gray-600 font-semibold py-3 px-6 rounded-md border border-[#93c7c3] hover:bg-gray-100 transition">
              Register
            </button>
          </div>
        </div>
  
        {/* Right side with image /}
        {/<div className="w-1/2 h-full">
          <img 
            src
            alt="Side Image"
            className="w-full h-full object-cover flex-col justify-center"
          />
        </div>*/}
      </div>
    );
  }