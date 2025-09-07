export default function UploadForm({ handleLoading, handleResults }) {
	const handleSubmit = (e) => {
		e.preventDefault();
		handleLoading(true);

		const formData = new FormData(e.target);

		const call = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_URL}/api/upload`, {
					method: "POST",
					body: formData,
				});

				const result = await response.json();
				if (result) handleResults(result);
			} catch (error) {
				console.error("Upload failed:", error);
			} finally {
				handleLoading(false);
			}
		};
		call();
	};

	return (
		<div className="w-full max-w-lg">
			<form
				onSubmit={handleSubmit}
				className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8 flex flex-col items-center gap-6">
				<label
					htmlFor="file"
					className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
					<span className="text-gray-600 font-medium">
						Drag & drop your CSV file here
					</span>
					<span className="text-sm text-gray-400 mt-1">or click to browse</span>
					<input type="file" name="File" id="file" className="hidden" />
				</label>

				<button
					type="submit"
					className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors">
					🚀 Upload & Analyze
				</button>
			</form>
		</div>
	);
}
