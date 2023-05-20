import {useRef, useState} from 'react';
import styles from '@/styles/components/adopt/carousel.module.scss';

export default function Carousel({images}: {images: ImageUploadResponse[]}) {
	const [page, setPage] = useState<number>(1);

	const preventScroll = useRef<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const imagesRef = useRef<HTMLDivElement>(null);

	const carouselImages = [
		images[images.length - 1].imageUrl,
		...images.map((img: ImageUploadResponse) => img.imageUrl),
		images[0].imageUrl,
	];

	function onClickLeft() {
		if (!preventScroll.current && imagesRef.current) {
			setPage(page - 1);
			preventScroll.current = true;
			imagesRef.current.ontransitionend = () => {
				if (page === 1 && imagesRef.current) {
					setPage(carouselImages.length - 2);
					imagesRef.current.style.transition = 'none';
					setTimeout(() => {
						if (imagesRef.current)
							imagesRef.current.style.transition = 'var(--transition)';
						preventScroll.current = false;
					}, 50);
				} else {
					preventScroll.current = false;
				}
			};
		}
	}
	function onClickRight() {
		if (!preventScroll.current && imagesRef.current) {
			setPage(page + 1);
			preventScroll.current = true;
			imagesRef.current.ontransitionend = () => {
				if (page === carouselImages.length - 2 && imagesRef.current) {
					setPage(1);
					imagesRef.current.style.transition = 'none';
					setTimeout(() => {
						if (imagesRef.current)
							imagesRef.current.style.transition = 'var(--transition)';
						preventScroll.current = false;
					}, 50);
				} else {
					preventScroll.current = false;
				}
			};
		}
	}

	return (
		<div className={styles.container} ref={containerRef}>
			<div
				className={styles.images}
				ref={imagesRef}
				style={{transform: `translateX(${-1 * page}00%)`}}
			>
				{carouselImages.map((image: any) => {
					return <img key={image} className={styles.image} src={image} />;
				})}
			</div>

			<div className={styles.control}>
				<div className={styles.left} onClick={onClickLeft}>
					<img src="/icon/left.svg" alt="left button" />
				</div>
				<div className={styles.right} onClick={onClickRight}>
					<img src="/icon/left.svg" alt="left button" />
				</div>
			</div>
		</div>
	);
}
