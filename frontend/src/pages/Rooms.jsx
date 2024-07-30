import React from "react";
import { useState, useEffect } from "react";

const Rooms = () => {
	const [rooms, setRooms] = useState([]);
  
  const [postData, setPostData] = useState([]);
	useEffect(() => {
		fetchData();
	}, [postData]);

	const fetchData = async () => {
		try {
			const response = await fetch("http://localhost:4000/room");
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const result = await response.json();
			setRooms(result);
		} catch (error) {
			console.error("Error fetching data:", error.message);
		}
	};


	const [formData, setFormData] = useState({
		roomnumber: "",
		bedtype: "",
		price: "",
		image: "",
	});


	const handleChange = (e) => {
    
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:4000/room", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
      setPostData(await response.json())
      setFormData({
        roomnumber: "",
        bedtype: "",
        price: "",
        image: "",
      })
		} catch (error) {
      console.log(error)
    }
	};

	return (
		<div className="container flex text-center mt-4 gap-10 items-center justify-center">
			{/* <div className="flex flex-col items-center justify-center h-screen bg-gray-100"> */}
				<form
					className="bg-white p-6 rounded shadow-md w-full max-w-sm mb-6"
					onSubmit={handleSubmit}
				>
					<h2 className="text-2xl font-bold mb-4">New Room</h2>

					<div className="mb-4">
						<label
							className="block text-gray-700 mb-2"
							htmlFor="roomNumber"
						>
							Room Number
						</label>
						<input
							type="number"
							id="roomnumber"
							name="roomnumber"
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
							value={formData.roomnumber}
							onChange={handleChange}
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="email">
							Bed Type
						</label>
						<input
							type="number"
							id="bedtype"
							name="bedtype"
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
							value={formData.bedtype}
							onChange={handleChange}
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="price">
							Price
						</label>
						<input
							id="price"
							name="price"
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
							value={formData.price}
							onChange={handleChange}
						></input>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="price">
							Image
						</label>
						<input
							id="image"
							name="image"
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
							value={formData.image}
							onChange={handleChange}
						></input>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
					>
						Submit
					</button>
				</form>

				{rooms.length > 0 ? (
					<div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
						<h2 className="text-2xl font-bold mb-4">Rooms</h2>
						<table className="min-w-full bg-white">
							<thead>
								<tr>
									<th className="py-2 px-4 border-b border-gray-200">
										Room Number
									</th>
									<th className="py-2 px-4 border-b border-gray-200">
										Bed Type
									</th>
									<th className="py-2 px-4 border-b border-gray-200">
										Price
									</th>
									<th className="py-2 px-4 border-b border-gray-200">
										Image
									</th>
								</tr>
							</thead>
							<tbody>
								{rooms.map((data, index) => (
									<tr key={index}>
										<td className="py-2 px-4 border-b border-gray-200">
											{data.roomnumber}
										</td>
										<td className="py-2 px-4 border-b border-gray-200">
											{data.bedtype}
										</td>
										<td className="py-2 px-4 border-b border-gray-200">
											{data.price}
										</td>
										<td className="py-2 px-4 border-b border-gray-200">
											<img src={data.image} width={200} height={200} alt="" />
									
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<p>Loading...</p>
				)}
			{/* </div> */}
		</div>
	);

	// return (
	//   <div className="container text-center mt-4">
	//     <h1>Room List</h1>
	//     <div className="row justify-content-center g-3">
	//       {rooms?.map((room) => {
	//         const { id, roomnumber, image, bedtype,price } = room
	//         return (
	//           <div
	//             key={id}
	//             className=" col-sm-12 col-md-6 col-lg-4"
	//             type="button"
	//             //? Absolute adressing
	//             // onClick={() => navigate(`/people/${id}`)}
	//             //? Relative
	//             onClick={() => navigate(`${id}`)}
	//           >
	//             <img className="rounded" src={image} alt="img" />
	//             <h6>
	//               {roomnumber} {bedtype}  {price}
	//             </h6>
	//           </div>
	//         )
	//       })}
	//     </div>
	//   </div>
	// )
};

export default Rooms;
