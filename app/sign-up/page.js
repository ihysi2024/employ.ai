export default function SignUpPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>

          <form>

            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#67cec3]"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#67cec3]"
                placeholder="Create a password"
                required
              />
            </div>



            <button
              type="submit"
              className="w-full bg-[#93c7c3] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#67cec3] focus:outline-none focus:ring-2 focus:ring-[#67cec3] focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account? <a href="/sign-in" className="text-[#67cec3] hover:underline">Sign In</a>
          </p>
        </div>
      </div>
    );
  }