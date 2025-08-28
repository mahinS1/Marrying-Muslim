import React, { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Use React Router's navigation instead of window.location
import { useNavigate } from "react-router-dom";
import { auth, realtimeDb } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get, set } from "firebase/database";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password");
      return;
    }
    setSigningIn(true);
    try {
      console.log("Attempting login...");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Login successful, user:", user.uid);
      // Fetch user data from Realtime Database
      const userRef = ref(realtimeDb, "users/" + user.uid);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log("User data from Realtime DB:", userData);
        // Store user data in localStorage for app use
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
        // Save basic user info to profile in Realtime Database
        const profileData = {
          username: userData.username || "",
          email: userData.email || "",
          phone: userData.phone || "",
          lastLogin: new Date().toISOString(),
          loginCount: (userData.loginCount || 0) + 1,
        };
        // Update user data with profile info
        await set(ref(realtimeDb, "users/" + user.uid), {
          ...userData,
          ...profileData,
        });
        console.log("Profile data saved:", profileData);
      } else {
        console.log("No user data found in Realtime DB");
      }
      toast.success("Login Successful!");
      console.log("Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      // Show a user-friendly error for all invalid credential errors
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        toast.error("Invalid email or password");
      } else {
        toast.error(error.message);
      }
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF3F3] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pb-16">
      {/* Back to Home Link (top) */}
      <div className="w-full max-w-md mx-auto mt-2 mb-4">
        <Link
          to="/"
          className="flex items-center text-gray-600 hover:text-gray-800 text-sm transition-colors w-fit"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back To Home
        </Link>
      </div>
      {/* Logo and Header */}
      <div className="mb-8 w-full max-w-md mx-auto">
        <div className="flex flex-row items-center gap-2 mb-4 justify-center">
          <div className="rounded-full p-2 overflow-hidden">
            <img
              src={logo}
              alt="Heart MM Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="text-left">
            <h1 className="lg:text-4xl text-2xl font-bold text-[#DC2626]">
              Marrying Muslims
            </h1>
            <p className="text-sm text-gray-600">Marriage The Halal Way</p>
          </div>
        </div>

        <h2 className="w-full text-center mt-3 text-3xl font-bold text-gray-900">
          Welcome Back
        </h2>
        <p className="w-full text-center text-gray-600 text-lg">
          Sign in to your account to continue
        </p>
      </div>

      {/* Sign In Form */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h3>
            <p className="text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-red-600 hover:text-red-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 shadow-sm disabled:opacity-60"
                disabled={signingIn}
              >
                {signingIn ? "Signing in..." : "Sign In"}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-red-600 hover:text-red-500 transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <Link
              to={"/termsandconditions"}
              className="text-red-600 hover:text-red-500 transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to={"/privacy-policy"}
              className="text-red-600 hover:text-red-500 transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
        {/* Extra bottom space for mobile usability */}
        <div className="h-8 sm:h-12" />
      </div>
    </div>
  );
};

export default Login;
