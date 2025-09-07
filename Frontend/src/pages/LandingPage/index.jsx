import Navbar from "../../components/MyComponents/Navbar";
import { Link } from "react-router-dom";

export default function LandingPage() {
	return (
		<div className="w-screen min-h-screen bg-gray-50">
			{/* Navbar */}
			<Navbar />

			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white">
				<h1 className="text-4xl md:text-6xl font-bold mb-6">
					Customer Insights Made Simple
				</h1>
				<p className="text-lg md:text-xl mb-8 max-w-2xl">
					Use AI-powered segmentation and churn prediction to understand your
					customers better and grow your business with data-driven decisions.
				</p>
				<div className="flex gap-4">
					<Link
						to="/segmentation"
						className="px-6 py-3 bg-white text-blue-800 rounded-xl shadow-md hover:bg-gray-100 transition">
						Try Segmentation
					</Link>
					<Link
						to="/churn-prediction"
						className="px-6 py-3 bg-blue-600 border border-white rounded-xl shadow-md hover:bg-blue-500 transition">
						Predict Churn
					</Link>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 px-8 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
				<div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition">
					<h2 className="text-xl font-semibold mb-3 text-blue-800">
						Customer Segmentation
					</h2>
					<p className="text-gray-600">
						Group customers with similar behavior using advanced clustering
						techniques like RFM and K-Means.
					</p>
				</div>

				<div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition">
					<h2 className="text-xl font-semibold mb-3 text-blue-800">
						Churn Prediction
					</h2>
					<p className="text-gray-600">
						Identify customers at risk of leaving and take proactive measures to
						retain them.
					</p>
				</div>

				<div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition">
					<h2 className="text-xl font-semibold mb-3 text-blue-800">
						Interactive Dashboard
					</h2>
					<p className="text-gray-600">
						Visualize customer data, segment trends, and churn analytics all in
						one place.
					</p>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-6 bg-blue-800 text-white text-center">
				<p className="text-sm">
					© {new Date().getFullYear()} Customer Segmentation & Churn Prediction
					Project. All rights reserved.
				</p>
			</footer>
		</div>
	);
}
