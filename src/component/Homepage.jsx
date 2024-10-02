import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, useInView } from "framer-motion";
import { FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";

import img3 from "../img/Untitled.jpeg";

import logo from "../img/logo.png";
import About from "./About";
import BlogPost from "./BlogPost";
import Photos from "./Photos";
import Footer from "./Footer";
const navigation = [
	{ name: "About Me", href: "#about" },
	{ name: "Blogs", href: "#blog" },
	{ name: "Photos", href: "#photos" },
	{ name: "Contact", href: "#footer" },
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
			className="mt-24 text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-fuchsia-400 bg-clip-text text-transparent text-center font-serif sm:mt-10 sm:text-6xl"
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

	const scrollToSection = (id) => {
		const section = document.querySelector(id);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
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
		<div className="bg-black">
			<header className="absolute inset-x-0 top-0 z-50">
				<motion.nav
					aria-label="Global"
					className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-4"
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
					<div className="hidden lg:flex lg:gap-x-8">
						{navigation.map((item) => (
							<a
								key={item.name}
								href="/#"
								onClick={() => scrollToSection(item.href)}
								className="text-sm font-semibold text-white bg-[#1AE8FF] py-2 px-4 rounded-lg cursor-pointer hover:bg-transparent hover:border-[#1AE8FF] hover:border hover:text-[#1AE8FF]"
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
							<div className="-my-6 divide-y divide-white-500/10">
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
			{/* bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-fuchsia-400 */}
			<ParallaxSection>
				<div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
					<div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
						<div className="mx-auto max-w-2xl lg:mx-0">
							<TypingEffect text="Welcome To My Personal Website" speed={100} />
							{/* <h1 className="mt-24 text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-fuchsia-400 bg-clip-text text-transparent text-center font-serif sm:mt-10 sm:text-6xl">
							Welcome To My Personal Blog
						</h1> */}
							<p className="mt-6 text-lg leading-8 text-gray-100">
								Hi I'm, Janm Arch Rubio I'm an adventure enthusiast who loves
								diving into the vibrant worlds of anime and costume cosplay.
								When I’m not riding my motorcycle or exploring new places, you
								can find me strumming my guitar, singing, or dancing to my
								favorite tunes!
							</p>
							<div className="mt-10 flex items-center gap-x-7">
								<a
									href="https://jar-dealogikal.github.io/janmaaku_portfolio/"
									className="rounded-md bg-[#28dfff] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-transparent hover:border-[#1AE8FF] hover:border hover:text-[#1AE8FF]"
								>
									Visit My Portfolio
								</a>
								<div className="flex items-center gap-x-2 ml-10">
									<a
										href="https://www.facebook.com/janmaaku/"
										target="_blank"
										rel="noopener noreferrer"
										className="cursor-pointer"
									>
										<FaFacebook className="h-7 w-7 text-[#1AE8FF] hover:text-pink-500" />
									</a>
									<a
										href="https://www.instagram.com/janmaaku14/"
										target="_blank"
										rel="noopener noreferrer"
										className="cursor-pointer "
									>
										<FaInstagram className="h-7 w-7 text-[#1AE8FF] hover:text-pink-400" />
									</a>
									<a
										href="mailto:janmaakurubio14@gmail.com"
										className="cursor-pointer"
									>
										<FaEnvelope className="h-7 w-7 text-[#1AE8FF] hover:text-pink-500" />
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
						<img
							alt=""
							src={img3}
							className="aspect-[3/2] w-full bg-transparent object-fit lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
						/>
					</div>
				</div>
			</ParallaxSection>

			{/* <ParallaxSection> */}
				<About />
			{/* </ParallaxSection> */}
			{/* <ParallaxSection> */}
				<BlogPost />
			{/* </ParallaxSection> */}
			{/* <ParallaxSection> */}
				<Photos />
			{/* </ParallaxSection> */}
			<Footer />
		</div>
	);
}
