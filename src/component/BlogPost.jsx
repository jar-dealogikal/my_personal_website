import img2 from "../img/img2.jpg";
import img6 from "../img/img6.jpg";
import img7 from "../img/img7.jpg";

const posts = [
	{
		id: 1,
		imageUrl: img2,
	},
	{
		id: 2,
		imageUrl: img6,
	},
	{
		id: 2,
		imageUrl: img7,
	},
	// More posts...
];

export default function BlogPost() {
	return (
		<section id="blog" className="py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl sm:pb-2 font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-fuchsia-400 bg-clip-text text-transparent sm:text-5xl font-serif">
						Blog Post
					</h2>
				</div>
				<div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-24 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{posts.map((post) => (
						<article
							key={post.id}
							className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-400 shadow-xl shadow-[#28dfff] px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
						>
							<img
								alt=""
								src={post.imageUrl}
								className="absolute inset-0 -z-10 h-full w-full object-cover"
							/>
							<div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/10" />
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
