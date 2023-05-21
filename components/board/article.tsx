import {useRouter} from 'next/router';
import Image from 'next/image';
import styles from '@/styles/components/board/article.module.scss';

export default function Article({article}: {article: any}) {
	const router = useRouter();

	return (
		<article
			className={styles.container}
			onClick={() => {
				if (article.id != null) router.push(`/board/${article.id}`);
			}}
		>
			{article.thumb && article.thumb === 'null' ? (
				<div className={styles.dummyThumbnails} />
			) : (
				<Image
					width={92}
					height={92}
					quality={75}
					loading="lazy"
					className={styles.thumbnail}
					src={article.thumb}
					alt={`${article.title} thumbnail`}
				/>
			)}

			<div className={styles.description}>
				<div className={styles.preview}>
					<span className={styles.title}>{article.title}</span>
					<span className={styles.context}>{article.context}</span>
				</div>
				<div className={styles.metadata}>
					<span>{`${article.author} · ${article.publishedAt}`}</span>
					<ul className={styles.dataList}>
						<li>
							<img src="/icon/view.svg" alt="view" />
							<span>{article.view}</span>
						</li>
						<li>
							<img src="/icon/comment.svg" alt="comment" />
							<span>{article.comment}</span>
						</li>
						<li>
							<img style={{padding: '2px'}} src="/icon/like.svg" alt="like" />
							<span>{article.like}</span>
						</li>
					</ul>
				</div>
			</div>
		</article>
	);
}
