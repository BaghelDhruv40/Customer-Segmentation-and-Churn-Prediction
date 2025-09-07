import React, { useState } from "react";
import UploadForm from "../../components/MyComponents/UploadForm";
import SegResult from "./SegResult";

export default function Segmentation() {
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState(null);

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
			<h1 className="text-4xl font-bold text-gray-800 mb-6 tracking-tight">
				Customer Segmentation Dashboard
			</h1>

			<UploadForm handleLoading={setLoading} handleResults={setResults} />

			<div id="results" className="w-full max-w-6xl mt-12">
				{loading && (
					<div className="text-lg text-blue-600 font-medium animate-pulse text-center">
						Processing your file, please wait...
					</div>
				)}
				{!loading && results && <SegResult results={results} />}
			</div>
		</div>
	);
}
