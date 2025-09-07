const SegResult = ({ results }) => {
	if (!results) {
		return (
			<div className="text-center text-gray-500 mt-10">
				Upload a CSV file to see segmentation results.
			</div>
		);
	}

	const { plots, cluster_summary } = results;

	return (
		<div className="space-y-12">
			{/* Cluster Summary */}
			<div className="bg-white shadow-lg rounded-2xl overflow-hidden">
				<h3 className="text-2xl font-semibold text-gray-800 p-6 border-b flex items-center gap-2">
					📊 Cluster Summary
				</h3>
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm text-gray-700">
						<thead className="bg-gray-100 text-gray-900">
							<tr>
								<th className="px-6 py-3 text-left">Cluster</th>
								{Object.keys(cluster_summary[0] || {}).map((col, idx) => (
									<th key={idx} className="px-6 py-3 text-left capitalize">
										{col.replace("_", " ")}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{Object.entries(cluster_summary).map(([clusterId, stats], i) => (
								<tr
									key={clusterId}
									className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
									<td className="px-6 py-3 font-bold text-indigo-600">
										{clusterId}
									</td>
									{Object.values(stats).map((val, idx) => (
										<td key={idx} className="px-6 py-3">
											{val}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Visualizations */}
			<div>
				<h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
					📈 Visualizations
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{Object.entries(plots).map(([name, path]) => (
						<div
							key={name}
							className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
							<h4 className="text-lg font-medium text-gray-700 mb-4 capitalize">
								{name.replace("_", " ")}
							</h4>
							<img
								src={`${import.meta.env.VITE_URL}${path}`}
								alt={name}
								className="rounded-lg border shadow max-h-96 object-contain"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SegResult;
