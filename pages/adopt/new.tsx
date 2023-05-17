import {BaseSyntheticEvent, ReactElement, useState} from 'react';
import Header from '@/components/new/header';
import Layout from '@/components/layout/layout';
import ImageUploader from '@/components/imageUploader';
import styles from '@/styles/pages/adopt/new.module.scss';
import {GetServerSideProps} from 'next';
import AnimalInput from '@/components/adopt/animalInput';

export default function New({query}: {query: {type: string}}) {
	const [serverImageList, setServerImageList] = useState<
		(string | undefined)[]
	>([]);

	function onSubmit(e: BaseSyntheticEvent) {
		e.preventDefault();

		// 게시글 작성 로직
		console.log(e.target.title.value);
		console.log(e.target.context.value);
		console.log(serverImageList);
	}

	return (
		<section className="body">
			<form className={styles.form} onSubmit={onSubmit} method="POST">
				<Header type="분양글" />
				<ImageUploader
					serverImageList={serverImageList}
					setServerImageList={setServerImageList}
				/>
				<AnimalInput />
				<input
					className={styles.title}
					type="text"
					name="title"
					placeholder="제목을 입력하세요."
				/>
				<textarea
					name="context"
					className={styles.context}
					placeholder="본문을 입력하세요."
				/>
			</form>
		</section>
	);
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	return {
		props: {query},
	};
};

New.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};