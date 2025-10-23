import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Online Presidential Voting System
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          A secure and transparent platform for conducting student government elections
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/elections"
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            View Elections
          </Link>
          <Link
            href="/auth/login"
            className="px-8 py-3 bg-transparent border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
