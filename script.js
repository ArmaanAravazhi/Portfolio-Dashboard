const root = document.documentElement;
const body = document.body;
const themeToggle = document.querySelector('[data-theme-toggle]');
const lightbox = document.querySelector('[data-lightbox-dialog]');
const lightboxImage = document.querySelector('[data-lightbox-image]');
const lightboxTitle = document.querySelector('[data-lightbox-title]');
const closeButtons = document.querySelectorAll('[data-lightbox-close]');
const photoTriggers = document.querySelectorAll('[data-lightbox="true"]');
const gallerySections = document.querySelectorAll('.gallery-section');
const savedTheme = localStorage.getItem('portfolio-theme');

const setTheme = (theme) => {
	const isDark = theme === 'dark';
	body.classList.toggle('dark-theme', isDark);
	root.dataset.theme = isDark ? 'dark' : 'light';
	themeToggle.setAttribute('aria-pressed', String(isDark));
	themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
	themeToggle.querySelector('.theme-toggle__label').textContent = isDark ? 'Dark mode' : 'Light mode';
	localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
};

setTheme(savedTheme === 'dark' ? 'dark' : 'light');

themeToggle.addEventListener('click', () => {
	setTheme(body.classList.contains('dark-theme') ? 'light' : 'dark');
});

const closeLightbox = () => {
	lightbox.hidden = true;
	document.body.style.overflow = '';
	lightboxImage.removeAttribute('src');
};

photoTriggers.forEach((trigger) => {
	trigger.addEventListener('click', () => {
		const image = trigger.querySelector('img');
		lightboxImage.src = image.src;
		lightboxImage.alt = image.alt;
		lightboxTitle.textContent = trigger.dataset.title;
		lightbox.hidden = false;
		document.body.style.overflow = 'hidden';
		lightbox.querySelector('.lightbox__close').focus();
	});
});

closeButtons.forEach((button) => button.addEventListener('click', closeLightbox));

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

body.classList.add('reveal-ready');

if ('IntersectionObserver' in window) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		});
	}, { threshold: 0.16 });

	gallerySections.forEach((section) => revealObserver.observe(section));
} else {
	gallerySections.forEach((section) => section.classList.add('is-visible'));
}
