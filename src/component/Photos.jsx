import img4 from "../img/img4.jpg";
import img5 from "../img/img5.jpg";
import img6 from "../img/img6.jpg";
import img7 from "../img/img7.jpg";
import img8 from "../img/img8.jpg";
import img9 from "../img/img9.jpg";
import img10 from "../img/img10.jpg";
import img11 from "../img/img11.jpg";
import img12 from "../img/img12.jpg";
import img13 from "../img/img13.jpg";

export default function Photos() {
	const images = [
		img4,
		img5,
		img6,
		img8,
		img7,
		img9,
		img12,
		img10,
		img11,
		img13,
	];

	return (
		<div id="photos" className="py-24 sm:py-32">
			<h1 className="text-3xl text-center sm:pb-5 font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-fuchsia-400 bg-clip-text text-transparent sm:text-5xl font-serif mb-10">
				Photos
			</h1>
			<div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8">
				{images.map((src, index) => (
					<img key={index} src={src} alt={`Photo ${index + 1}`} />
				))}
			</div>
		</div>
	);
}
