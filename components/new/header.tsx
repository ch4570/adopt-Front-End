import {useRouter} from 'next/router';
import styles from '@/styles/components/new/header.module.scss';

export default function Header({type}: {type: string}) {
	const router = useRouter();

	return (
		<div className={styles.container}>
			<img
				className={styles.goBack}
				src="/icon/left.svg"
				alt="go back icon"
				onClick={() => {
					router.back();
				}}
			/>
			새 {type} 작성
			<button type="submit" className={styles.writeButton}>
				작성
			</button>
		</div>
	);
}
