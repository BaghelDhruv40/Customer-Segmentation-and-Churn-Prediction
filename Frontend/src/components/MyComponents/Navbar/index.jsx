import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const links = [
		{ path: "/segmentation", label: "Segmentation" },
		{ path: "/churn-prediction", label: "Churn Prediction" },
		{ path: "/dashboard", label: "Dashboard" },
		{ path: "/about", label: "About" },
	];

	return (
		<nav className="w-full bg-blue-800 text-white shadow-md">
			<div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
				{/* Logo / Title */}
				<div className="text-xl font-bold italic">My Project</div>

				{/* Desktop Menu */}
				<ul className="hidden md:flex gap-8 font-medium">
					{links.map(({ path, label }) => (
						<NavLink
							key={path}
							to={path}
							className={({ isActive }) =>
								`transition hover:text-gray-200 ${
									isActive ? "underline underline-offset-4 text-gray-200" : ""
								}`
							}>
							{label}
						</NavLink>
					))}
				</ul>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden text-white"
					onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* Mobile Dropdown */}
			{isOpen && (
				<div className="md:hidden bg-blue-700 px-6 py-4 space-y-3">
					{links.map(({ path, label }) => (
						<NavLink
							key={path}
							to={path}
							className={({ isActive }) =>
								`block py-2 transition hover:text-gray-200 ${
									isActive ? "underline underline-offset-4 text-gray-200" : ""
								}`
							}
							onClick={() => setIsOpen(false)}>
							{label}
						</NavLink>
					))}
				</div>
			)}
		</nav>
	);
}
