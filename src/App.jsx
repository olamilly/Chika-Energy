import { useEffect, useState } from "react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./App.css";

const featureCards = [
	{
		title: "Integrity",
		description:
			"We act with honesty, transparency, and accountability in everything we do.",
		image: "/images/integrity.jpg",
	},
	{
		title: "Reliability",
		description:
			"We deliver consistent, high-quality energy solutions that meet your needs.",
		image: "/images/reliability.jpg",
	},
	{
		title: "Excellence",
		description:
			"We pursue the highest standards in quality, service, and performance.",
		image: "/images/excellence.jpg",
	},
	{
		title: "Innovation",
		description:
			"We continuously develop smarter and more efficient energy solutions.",
		image: "/images/innovation.jpg",
		wide: true,
	},
	{
		title: "Sustainability",
		description:
			"We prioritize clean, renewable energy solutions that are environmentally responsible.",
		image: "/images/sustainability.jpg",
	},
];

const products = [
	{
		name: "Chika Energy Nuru Pro 3.25kVA",
		image: "/images/nuru.png",
	},
	{
		name: "Chika Energy Kaya Grid 2.25kVA",
		image: "/images/kaya.png",
	},
	{
		name: "Chika Energy Zola Power 3.50kVA",
		image: "/images/zola.png",
	},
	{
		name: "Chika Energy Imani Unit 6.25kVA",
		image: "/images/imani.png",
	},
	{
		name: "Chika Energy Ayo Core 1.25kVA",
		image: "/images/ayo.png",
	},
	{
		name: "Chika Energy Nova Drive 2.50kVA",
		image: "/images/nuru2.png",
	},
];

const roadmapItems = [
	{
		key: "vision",
		title: "Vision",
		description: "To power progress and shape the future of energy.",
		image: "/images/about-image.jpg",
		alt: "Solar and wind renewable energy field",
	},
	{
		key: "mission",
		title: "Mission",
		description:
			"To deliver reliable, innovative, and sustainable energy solutions that empower people, businesses, and communities.",
		image: "/images/vision-image.jpg",
		alt: "Hydro power facility at sunset",
	},
];

function App() {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("");
	const [activeRoadmapItem, setActiveRoadmapItem] = useState("vision");
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow =
			isMobileNavOpen || isContactModalOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isContactModalOpen, isMobileNavOpen]);

	useEffect(() => {
		const closeOnEscape = (event) => {
			if (event.key === "Escape") {
				setIsMobileNavOpen(false);
				setIsContactModalOpen(false);
			}
		};

		window.addEventListener("keydown", closeOnEscape);
		return () => {
			window.removeEventListener("keydown", closeOnEscape);
		};
	}, []);

	useEffect(() => {
		const sectionIds = [
			"home",
			"about",
			"core-values",
			"products",
			// "contact",
			// "roadmap",
		];
		const sections = sectionIds
			.map((id) => document.getElementById(id))
			.filter(Boolean);

		if (!sections.length) {
			return undefined;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const inView = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

				if (inView.length > 0) {
					setActiveSection(inView[0].target.id);
				}
			},
			{
				root: null,
				rootMargin: "-30% 0px -45% 0px",
				threshold: [0.2, 0.4, 0.6, 0.8],
			},
		);

		sections.forEach((section) => observer.observe(section));

		return () => {
			sections.forEach((section) => observer.unobserve(section));
			observer.disconnect();
		};
	}, []);

	useEffect(() => {
		const easeInOut = (t) =>
			t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

		const animateScrollToHash = (targetId) => {
			const targetElement = document.getElementById(targetId);
			if (!targetElement) {
				return;
			}

			const desktopHeader = window.matchMedia("(min-width: 901px)").matches
				? document.querySelector(".top-nav")
				: null;
			const headerOffset = desktopHeader
				? desktopHeader.getBoundingClientRect().height
				: 0;

			const startY = window.scrollY;
			const maxScroll =
				document.documentElement.scrollHeight - window.innerHeight;
			const targetY = Math.max(
				0,
				Math.min(
					targetElement.getBoundingClientRect().top +
						window.scrollY -
						headerOffset,
					maxScroll,
				),
			);
			const duration = 300;
			const startTime = performance.now();

			const frame = (currentTime) => {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);
				const eased = easeInOut(progress);
				window.scrollTo(0, startY + (targetY - startY) * eased);

				if (progress < 1) {
					window.requestAnimationFrame(frame);
				}
			};

			window.requestAnimationFrame(frame);
		};

		const onHashLinkClick = (event) => {
			const hashLink = event.target.closest('a[href^="#"]');
			if (!hashLink) {
				return;
			}

			const href = hashLink.getAttribute("href");
			if (!href || href === "#") {
				return;
			}

			const targetId = href.slice(1);
			const targetElement = document.getElementById(targetId);
			if (!targetElement) {
				return;
			}

			event.preventDefault();
			animateScrollToHash(targetId);
		};

		document.addEventListener("click", onHashLinkClick);
		return () => {
			document.removeEventListener("click", onHashLinkClick);
		};
	}, []);

	const closeMobileNav = () => setIsMobileNavOpen(false);
	const openContactModal = () => setIsContactModalOpen(true);

	const selectedRoadmap =
		roadmapItems.find((item) => item.key === activeRoadmapItem) ||
		roadmapItems[0];

	return (
		<div className="landing-page">
			<section className="hero-section" id="home">
				<div className="hero-overlay" />
				<header className="top-nav">
					<div className="brand">
						{/* <div className="brand-mark" aria-hidden="true">
              CE
            </div>
            <div className="brand-copy">
              <strong>Chika Energy</strong>
              <span>Renewables</span>
            </div> */}
						<img
							src="CE_logo.svg"
							height={52}
							width={120}
							alt="Chika Energy Logo"
						/>
					</div>
					<nav className="desktop-nav">
						<a
							href="#home"
							className={activeSection === "home" ? "is-active" : ""}
						>
							Home
						</a>
						<a
							href="#about"
							className={activeSection === "about" ? "is-active" : ""}
						>
							About Us
						</a>
						<a
							href="#core-values"
							className={activeSection === "core-values" ? "is-active" : ""}
						>
							Core Values
						</a>
						{/* <a
							href="#contact"
							className={activeSection === "contact" ? "is-active" : ""}
						>
							Contact Us
						</a> */}
						<a
							href="#products"
							className={activeSection === "products" ? "is-active" : ""}
						>
							Products
						</a>
					</nav>
					<a
						href="#contact"
						onClick={() => setActiveSection("contact")}
						className="quote-btn"
					>
						Contact Us
					</a>
					<button
						className="mobile-menu-btn"
						type="button"
						aria-label="Open menu"
						aria-expanded={isMobileNavOpen}
						aria-controls="mobile-menu"
						onClick={() => setIsMobileNavOpen(true)}
					>
						<img src="/hamburger.svg" alt="" aria-hidden="true" />
					</button>
				</header>

				<div className="hero-content">
					<h1>Lorem ipsum pulvinar scelerisque</h1>
					<p>
						Reliable clean energy systems tailored for homes, enterprises, and
						communities.
					</p>
					<a
						href="#about"
						onClick={() => setActiveSection("about")}
						className="primary-btn"
					>
						Get Started
					</a>
				</div>
			</section>

			<aside
				id="mobile-menu"
				className={`mobile-nav-panel${isMobileNavOpen ? " is-open" : ""}`}
			>
				<button
					className="mobile-nav-close"
					type="button"
					aria-label="Close menu"
					onClick={closeMobileNav}
				>
					<span />
					<span />
				</button>

				<nav className="mobile-nav-links">
					<a href="#home" className="is-active" onClick={closeMobileNav}>
						Home
					</a>
					<a href="#about" onClick={closeMobileNav}>
						About Us
					</a>
					<a href="#core-values" onClick={closeMobileNav}>
						Core Values
					</a>
					<a href="#products" onClick={closeMobileNav}>
						Products
					</a>
					<a
						href="#contact"
						className="mobile-contact-btn"
						onClick={closeMobileNav}
					>
						Contact Us
					</a>
				</nav>
			</aside>

			<main className="">
				<div className="content-shell">
					<section className="section-intro" id="about">
						<span className="section-badge">About us</span>
						<h2>Lorem ipsum et aliquam</h2>
						<p>
							Chika Energy Solutions Limited is an innovative energy and
							infrastructure company committed to delivering reliable,
							efficient, and sustainable power solutions. Through advanced
							technology, strategic partnerships, and industry expertise, we
							have developed and managed energy systems that support economic
							growth and strengthen communities. With a commitment to excellence
							and long-term impact, Chika Energy Solutions provides
							forward-thinking solutions that power industries, enable
							development, and help shape the future.
						</p>
					</section>

					<section className="about-roadmap" id="roadmap">
						<div className="roadmap-desktop">
							<article className="roadmap-copy">
								<h3>Future roadmap</h3>
								<p>
									Chika Energy Solutions Limited aims to become a leading
									diversified energy company in Africa within the next decade,
									delivering reliable energy solutions that support homes,
									businesses, and communities.
								</p>
								<div className="roadmap-tabs">
									{roadmapItems.map((item) => (
										<div
											key={item.key}
											className={`roadmap-tab-item${
												activeRoadmapItem === item.key ? " is-active" : ""
											}`}
										>
											<button
												type="button"
												className={`roadmap-tab${
													activeRoadmapItem === item.key ? " is-active" : ""
												}`}
												onClick={() => setActiveRoadmapItem(item.key)}
												aria-expanded={activeRoadmapItem === item.key}
											>
												{item.title}
											</button>
											<div
												className={`roadmap-tab-panel${
													activeRoadmapItem === item.key ? " is-open" : ""
												}`}
												aria-hidden={activeRoadmapItem !== item.key}
											>
												<p>{item.description}</p>
											</div>
										</div>
									))}
								</div>
							</article>
							<div key={selectedRoadmap.key} className="roadmap-visual">
								<img src={selectedRoadmap.image} alt={selectedRoadmap.alt} />
							</div>
						</div>

						<div className="roadmap-mobile-list">
							{roadmapItems.map((item) => (
								<article key={item.key} className="roadmap-mobile-item">
									<h4>{item.title}</h4>
									<p>{item.description}</p>
									<img src={item.image} alt={item.alt} />
								</article>
							))}
						</div>
					</section>
				</div>
				<div className="content-shell core-values">
					<section className="section-intro" id="core-values">
						<span className="section-badge">Core values</span>
						<h2>Lorem ipsum et aliquam</h2>
						<p>
							Our operations are anchored on quality, trust, and sustainable
							impact across every project.
						</p>
					</section>

					<section className="features-grid">
						{featureCards.map((card) => (
							<article
								key={card.title}
								className={`feature-card${card.wide ? " is-wide" : ""}`}
							>
								<img src={card.image} alt={card.title} />
								<div className="feature-card-content">
									<h4>{card.title}</h4>
									<p>{card.description}</p>
								</div>
							</article>
						))}
					</section>
				</div>

				<div className="content-shell">
					<section className="section-intro" id="products">
						<span className="section-badge">Our products</span>
						<h2>Lorem ipsum et aliquam</h2>
						<p>
							Our operations are anchored on quality, trust, and sustainable
							impact across every project.
						</p>
					</section>

					<section className="products-grid">
						{products.map((item) => (
							<article key={item.name} className="product-card">
								<div className="product-card-media">
									<img src={item.image} alt={item.name} />
								</div>
								<div className="product-card-body">
									<h5>{item.name}</h5>
									<button
										type="button"
										className="product-quote-btn"
										onClick={openContactModal}
									>
										Get quote
									</button>
								</div>
							</article>
						))}
					</section>
				</div>
			</main>

			{isContactModalOpen && (
				<div
					className="contact-modal-overlay"
					onClick={() => setIsContactModalOpen(false)}
					role="presentation"
				>
					<section
						className="contact-modal"
						role="dialog"
						aria-modal="true"
						aria-labelledby="contact-modal-title"
						onClick={(event) => event.stopPropagation()}
					>
						<button
							type="button"
							className="contact-modal-close"
							aria-label="Close contact popup"
							onClick={() => setIsContactModalOpen(false)}
						>
							×
						</button>
						<h3 id="contact-modal-title">Get in touch with us</h3>
						<p className="contact-modal-subheading">
							Let&apos;s help you get started
						</p>
						<div className="contact-modal-lottie">
							{/* <DotLottieReact
								src="https://lottie.host/1c4a3817-3dd2-4b29-ae3a-21c0d93490c5/sK5HXZzxJD.lottie"
								loop
								autoplay
							/> */}
							<iframe src="https://lottie.host/embed/1c4a3817-3dd2-4b29-ae3a-21c0d93490c5/sK5HXZzxJD.lottie"></iframe>
						</div>

						{/* <div className="contact-modal-accent" aria-hidden="true">
							<span />
							<span />
							<span />
						</div> */}
						<div className="contact-modal-details">
							<p>
								<strong>Email:</strong>{" "}
								<a href="mailto:hello@chikaenergy.com">hello@chikaenergy.com</a>
							</p>
							<p>
								<strong>Phone:</strong>{" "}
								<a href="tel:+2349060004242">+234 906 000 4242</a>
							</p>
							<div>
								<a
									href="https://wa.me/2349060004242"
									target="_blank"
									rel="noreferrer"
									className="contact-modal-whatsapp"
								>
									<img src="/whatsapp.svg" alt="" aria-hidden="true" />
									<span>Chat on WhatsApp</span>
								</a>
							</div>
						</div>
					</section>
				</div>
			)}

			<section className="cta-panel" id="contact">
				<span className="section-badge light">Reach us</span>
				<h2>Lorem ipsum et aliquam</h2>
				<button
					className="primary-btn mb-2"
					onClick={openContactModal}
					aria-label="Contact us"
					type="button"
				>
					Contact Us
				</button>

				<div className="cta-contact-row">
					<p>
						<span className="cta-contact-icon" aria-hidden="true">
							<img src="/location.svg" alt="Location" />
						</span>
						<span>Address:</span> 3, Lorem ipsum semper ipsum semper.
					</p>
					<p>
						<span className="cta-contact-icon" aria-hidden="true">
							<img src="/call.svg" alt="Phone" />
						</span>
						<span>Phone Number:</span> +234 815 984 8374
					</p>
				</div>
				<div className="cta-image-container">
					<img src="/images/sparks.png" className="cta-image" alt="CTA Image" />
				</div>
			</section>

			<footer className="footer">
				<div className="footer-inner">
					<img src="/CE_logo.svg" className="footer-logo" alt="Chika Energy" />
					<nav className="footer-nav" aria-label="Footer">
						<a href="#home">Home</a>
						<a href="#about">About Us</a>
						<a href="#core-values">Core Values</a>
						<a href="#products">Products</a>
					</nav>
					<p className="footer-copy">© Chika Energy 2026</p>
				</div>
			</footer>
		</div>
	);
}

export default App;
