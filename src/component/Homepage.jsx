import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, useInView } from "framer-motion";
import emailjs from "emailjs-com";
import { Play } from "lucide-react";
import img1 from "../img/img1.jpg";
import img3 from "../img/img3.jpg";
import img6 from "../img/img6.jpg";
import img7 from "../img/img7.jpg";
import img4 from "../img/img4.jpg";
import img9 from "../img/img9.jpg";
import img11 from "../img/img11.jpg";
import img12 from "../img/img12.jpg";
import img14 from "../img/img14.jpg";
import logo from "../img/logo.png";
import ved1 from "../videos/video1.mp4";
import ved2 from "../videos/video2.mp4";
import ved3 from "../videos/video3.mp4";

const navigation = [
	{ name: "Home", href: "/#" },
	{ name: "About Me", href: "#about" },
	{ name: "Tiktok Video", href: "#tiktok" },
	{ name: "Photos", href: "#photos" },
	{ name: "Contact", href: "#contact" },
];

const videos = [
	{ id: 1, src: ved1 },
	{ id: 2, src: ved2 },
	{ id: 3, src: ved3 },
];

function TypingEffect({ text, speed = 100 }) {
	const [displayedText, setDisplayedText] = useState("");
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (index < text.length) {
			const timeout = setTimeout(() => {
				setDisplayedText((prev) => prev + text[index]);
				setIndex(index + 1);
			}, speed);
			return () => clearTimeout(timeout);
		}
	}, [index, text, speed]);

	return (
		<motion.h1
			className="text-8xl font-bold tracking-tight text-black sm:text-10xl"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 2, ease: "easeIn" }}
		>
			{displayedText}
		</motion.h1>
	);
}

export default function Example() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [playingVideoId, setPlayingVideoId] = useState(null);
	const videoRefs = useRef({});

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		message: "",
	});
	const [messageSent, setMessageSent] = useState(false);

	const togglePlay = (id) => {
		const videoElement = videoRefs.current[id];
		if (videoElement) {
			if (videoElement.paused) {
				videoElement.play();
				setPlayingVideoId(id);
			} else {
				videoElement.pause();
				setPlayingVideoId(null);
			}
		}
	};

	const scrollToSection = (id) => {
		const section = document.querySelector(id);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const sendEmail = (e) => {
		e.preventDefault();

		const templateParams = {
			from_name: `${formData.firstName} ${formData.lastName}`,
			reply_to: formData.email,
			message: formData.message,
		};

		emailjs
			.send(
				"service_o7f6ia9",
				"template_rpiw6ho",
				templateParams,
				"RcSEBGwp0wEWWsF3-"
			)
			.then((response) => {
				console.log("SUCCESS!", response.status, response.text);
				setMessageSent(true);
			})
			.catch((err) => {
				console.log("FAILED...", err);
			});
	};

	const ParallaxSection = ({ children, className }) => {
		const ref = React.useRef(null);
		const isInView = useInView(ref, { once: false, amount: 0.3 });

		return (
			<motion.section
				ref={ref}
				initial={{ opacity: 0, y: 50 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
				transition={{ duration: 0.8 }}
				className={className}
			>
				{children}
			</motion.section>
		);
	};

	return (
		<div className="bg-white">
			<header className="absolute inset-x-0 top-0 z-50">
				<motion.nav
					aria-label="Global"
					className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
					initial={{ y: "-100%" }} // Start above the viewport
					animate={{ y: 0 }} // Animate to its position
					transition={{ duration: 1, ease: "easeOut" }} // Duration of animation
				>
					<div className="flex lg:flex-1">
						<a href="/#" className="-m-1.5 p-1.5">
							<span className="sr-only">Your Company</span>
							<img alt="" src={logo} className="h-28 w-auto" />
						</a>
					</div>
					<div className="flex lg:hidden">
						<button
							type="button"
							onClick={() => setMobileMenuOpen(true)}
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Open main menu</span>
							<Bars3Icon aria-hidden="true" className="h-6 w-6" />
						</button>
					</div>
					<div className="hidden lg:flex lg:gap-x-12">
						{navigation.map((item) => (
							<a
								key={item.name}
								href="/#"
								onClick={() => scrollToSection(item.href)}
								className="text-sm font-semibold leading-6 text-gray-900"
							>
								{item.name}
							</a>
						))}
					</div>
				</motion.nav>
				<Dialog
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}
					className="lg:hidden"
				>
					<div className="fixed inset-0 z-50" />
					<DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div className="flex items-center justify-between">
							<a href="#/" className="-m-1.5 p-1.5">
								<span className="sr-only">Your Company</span>
								<img alt="" src={logo} className="h-28 w-auto" />
							</a>
							<button
								type="button"
								onClick={() => setMobileMenuOpen(false)}
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
							>
								<span className="sr-only">Close menu</span>
								<XMarkIcon aria-hidden="true" className="h-6 w-6" />
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="space-y-2 py-6">
									{navigation.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
										>
											{item.name}
										</a>
									))}
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</header>
			<main>
				<div className="relative isolate">
					<svg
						aria-hidden="true"
						className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
					>
						<defs>
							<pattern
								x="50%"
								y={-1}
								id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
								width={200}
								height={200}
								patternUnits="userSpaceOnUse"
							>
								<path d="M.5 200V.5H200" fill="none" />
							</pattern>
						</defs>
						<svg x="50%" y={-1} className="overflow-visible fill-gray-50">
							<path
								d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
								strokeWidth={0}
							/>
						</svg>
						<rect
							fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
							width="100%"
							height="100%"
							strokeWidth={0}
						/>
					</svg>
					<div
						aria-hidden="true"
						className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
					>
						<div
							style={{
								clipPath:
									"polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
							}}
							className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
						/>
					</div>
					<div className="overflow-hidden">
						<ParallaxSection>
							<div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
								<div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
									<div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
										<span className="text-2xl">Hi, I'm</span>
										<TypingEffect
											text="Janm Arch Rubio"
											speed={100} // Adjust speed as needed
										/>
										<motion.p
											className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none"
											initial={{ x: "-100%" }}
											animate={{ x: 0 }}
											transition={{ duration: 0.5, ease: "easeOut" }}
										>
											A{" "}
											<strong className="text-[#28dfff]">Web Developer</strong>{" "}
											,<strong className="text-[#28dfff]"> Cyclist </strong>,
											and <strong className="text-[#28dfff]">Traveler</strong>
										</motion.p>
										<div className="mt-10 flex items-center gap-x-6">
											<a
												href="https://jar-dealogikal.github.io/janmaaku_portfolio/"
												className="rounded-md bg-[#28dfff] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:text-black  hover:bg-[#35c1db]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35c1db]"
											>
												View My Portfolio
											</a>
										</div>
									</div>
									<div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
										<div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
											<div className="relative">
												<img
													alt=""
													src={img1}
													className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
												/>
												<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
											</div>
										</div>
										<div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
											<div className="relative">
												<img
													alt=""
													src={img3}
													className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
												/>
												<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
											</div>
											<div className="relative">
												<img
													alt=""
													src={img4}
													className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
												/>
												<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
											</div>
										</div>
										<div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
											<div className="relative">
												<img
													alt=""
													src={img6}
													className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
												/>
												<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
											</div>
											<div className="relative">
												<img
													alt=""
													src={img7}
													className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
												/>
												<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</ParallaxSection>
						<ParallaxSection>
							<div
								id="about"
								className="my-20 py-36 bg-gray-100 w-full text-center"
							>
								<h1 className="text-center text-7xl font-bold">About Me</h1>
								<p className="mt-6 text-lg leading-8 text-gray-500  lg:max-w-none text-center px-5 md:px-12">
									I love crafting beautiful and functional websites while
									exploring new destinations in Cebu. When I’m not immersed in
									code, you can find me riding my motorcycle around the south,
									taking in the stunning landscapes, or climbing mountains for
									breathtaking views. I enjoy lounging on serene beaches and
									discovering hidden waterfalls that add a touch of adventure to
									my days. My weekends often include attending church services,
									where I find inspiration and connection, and I cherish quiet
									moments spent reading the Bible. Each of these experiences
									enriches my life and fuels my passion for both personal and
									professional growth.
								</p>
							</div>
						</ParallaxSection>

						<ParallaxSection>
							<div id="tiktok" className="mx-auto md:px-32 py-10 mt-10">
								<h1 className="text-center text-7xl font-bold">Tiktok Video</h1>
								<div className="grid md:grid-cols-2 lg:grid-cols-3 grid-flow-col-1 md:gap-10">
									{videos.map((video) => (
										<div
											key={video.id}
											className="relative w-full h-auto py-10 mt-16"
										>
											<video
												ref={(el) => (videoRefs.current[video.id] = el)}
												className="w-full h-[35rem] object-fit rounded-lg"
												src={video.src}
												type="video/mp4"
												onClick={() => togglePlay(video.id)}
											/>
											{playingVideoId !== video.id && (
												<div className="absolute inset-0 flex items-center justify-center">
													<button
														onClick={() => togglePlay(video.id)}
														className="text-white flex items-center space-x-2 bg-transparent hover:bg-white hover:bg-opacity-20 rounded-full p-4 transition-all duration-300"
													>
														<Play size={24} />
														<span className="text-lg font-semibold">
															Play Video
														</span>
													</button>
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						</ParallaxSection>

						<ParallaxSection>
							<div
								id="photos"
								className="w-full bg-gray-400/20 px-32 py-10 my-10"
							>
								<h1 className="text-center text-7xl font-bold">Photos</h1>

								<div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
									<div className="relative lg:col-span-3">
										<div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
										<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
											<img
												alt=""
												src={img6}
												className="h-auto object-cover object-left"
											/>
										</div>
										<div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
									</div>
									<div className="relative lg:col-span-3">
										<div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
										<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
											<img
												alt=""
												src={img12}
												className="h-auto object-cover object-left lg:object-right"
											/>
											<div className="p-10 pt-4">
												<h3 className="text-sm/4 font-semibold text-indigo-600">
													Church
												</h3>
												<p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950">
													Fellowship Time
												</p>
												<p className="mt-2 max-w-lg text-sm/6 text-gray-600">
													This is our bonding together with my fellow christian
													after sunday service have a fellowship then group pic
													to have a memories.
												</p>
											</div>
										</div>
										<div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
									</div>
									<div className="relative lg:col-span-2">
										<div className="relative flex h-auto flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
											<img
												alt=""
												src={img14}
												className="h-auto object-cover object-left"
											/>
										</div>
									</div>
									<div className="relative lg:col-span-2">
										<div className="relative flex h-auto flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
											<img
												alt=""
												src={img9}
												className="h-auto object-cover object-left"
											/>
										</div>
									</div>
									<div className="relative lg:col-span-2">
										<div className="relative flex h-auto flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
											<img
												alt=""
												src={img3}
												className="h-auto object-cover object-left"
											/>
										</div>
									</div>
								</div>
							</div>
						</ParallaxSection>
						<div id="contact" className="relative py-10 my-10">
							<div className="lg:absolute lg:inset-0 lg:left-1/2">
								<img
									alt=""
									src={img11}
									className="h-64 w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full"
								/>
							</div>
							<div className="pb-24 pt-16 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
								<div className="px-6 lg:px-8">
									<div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
										<h2 className="text-3xl font-bold tracking-tight text-gray-900">
											Contact Me
										</h2>
										{messageSent && (
											<p className="text-green-500 mt-4">
												Message sent successfully!
											</p>
										)}
										<form onSubmit={sendEmail} className="mt-16">
											<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
												<div>
													<label
														htmlFor="first-name"
														className="block text-sm font-semibold leading-6 text-gray-900"
													>
														First name
													</label>
													<div className="mt-2.5">
														<input
															id="first-name"
															name="firstName"
															type="text"
															value={formData.firstName}
															onChange={handleChange}
															autoComplete="given-name"
															className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>
												<div>
													<label
														htmlFor="last-name"
														className="block text-sm font-semibold leading-6 text-gray-900"
													>
														Last name
													</label>
													<div className="mt-2.5">
														<input
															id="last-name"
															name="lastName"
															type="text"
															value={formData.lastName}
															onChange={handleChange}
															autoComplete="family-name"
															className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>
												<div className="sm:col-span-2">
													<label
														htmlFor="email"
														className="block text-sm font-semibold leading-6 text-gray-900"
													>
														Email
													</label>
													<div className="mt-2.5">
														<input
															id="email"
															name="email"
															type="email"
															value={formData.email}
															onChange={handleChange}
															autoComplete="email"
															className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>
												<div className="sm:col-span-2">
													<label
														htmlFor="message"
														className="block text-sm font-semibold leading-6 text-gray-900"
													>
														Message
													</label>
													<div className="mt-2.5">
														<textarea
															id="message"
															name="message"
															value={formData.message}
															onChange={handleChange}
															rows="4"
															className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>
											</div>
											<div className="mt-10 flex justify-end border-t border-gray-900/10 pt-8">
												<button
													type="submit"
													className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
												>
													Send message
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="text-center pb-10 ">
						<span className="text-center text-gray-400">
							@ 2024 by Janm Arch Rubio
						</span>
					</div>
				</div>
			</main>
		</div>
	);
}
